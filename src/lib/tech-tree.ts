import type { Tech, TechCategory } from "@/config/tech";

/**
 * Grows the tech tree with the space colonisation algorithm (Runions et al.,
 * 2007), which is how a lot of procedural trees get their natural look:
 *
 * 1. Scatter the leaves (one per tech) and some bare "twig" points through a
 *    lumpy, rounded crown.
 * 2. Grow a trunk from the ground and give each category one limb off it —
 *    the sideways categories low down, the upright ones near the top.
 * 3. Repeatedly, every point pulls the nearest tip of its own category's limb
 *    towards it; tips pulled in several directions fork. Points that a
 *    branch reaches are done. Keeping categories apart means every category
 *    hangs off its own limb, the way a real tree groups its foliage.
 * 4. Thicken the wood from the twigs down (the "pipe model": a branch is as
 *    thick as all the branches it carries), so limbs taper into twigs.
 *
 * A seeded random generator keeps it deterministic: the same config always
 * grows the same tree, on the server and in the static build alike.
 * Coordinates are SVG user units, y pointing down, the ground at y = 0.
 */

export type TreeConfig = {
  /** Width of the drawing; the tree is centred in it. */
  width: number;
  /** Leaf diameter. */
  leaf: number;
  /** Crown radii; the crown sits on top of the trunk. */
  crownX: number;
  crownY: number;
  /** Height of bare trunk below the crown. */
  trunkHeight: number;
  /** Trunk radius at the base, before the root flare. */
  trunkRadius: number;
  /** Length of one growth step. */
  step: number;
  /** How far a point can pull a branch from. */
  influence: number;
  /** How close a branch has to come to a point to reach it. */
  reach: number;
  /** Bare points that grow extra twigs between the leaves. */
  twigs: number;
  /** How far in from the crown's edge leaves may sit (0 = centre, 1 = edge). */
  leafShell: number;
  seed: number;
};

// Seeds picked by eye from a batch for the most balanced fork at each size.
export const treeConfigs = {
  small: { width: 340, leaf: 36, crownX: 152, crownY: 255, trunkHeight: 115, trunkRadius: 9, step: 4, influence: 75, reach: 6, twigs: 260, leafShell: 0.3, seed: 11 },
  medium: { width: 560, leaf: 40, crownX: 250, crownY: 215, trunkHeight: 125, trunkRadius: 12, step: 5, influence: 90, reach: 7, twigs: 340, leafShell: 0.45, seed: 7 },
  large: { width: 800, leaf: 46, crownX: 350, crownY: 225, trunkHeight: 140, trunkRadius: 16, step: 6, influence: 110, reach: 8, twigs: 420, leafShell: 0.5, seed: 11 },
} as const satisfies Record<string, TreeConfig>;

export type TreeLeaf = {
  tech: Tech;
  category: string;
  /** Index of the category, for the legend highlight. */
  categoryIndex: number;
  /** Leaf centre. */
  x: number;
  y: number;
  /** Rotation that turns the leaf's pointed corner towards its twig, in degrees. */
  angle: number;
  /** Grow-in delay in ms: leaves near the trunk first, the outer ones last. */
  delay: number;
};

export type TreeLayout = {
  config: TreeConfig;
  /** viewBox, as [minX, minY, width, height]. */
  viewBox: [number, number, number, number];
  /** The wood, as stroked paths grouped by width (round caps make smooth joints). */
  wood: { width: number; d: string }[];
  /** Soft shadow under the tree. */
  shadow: { cx: number; cy: number; rx: number; ry: number };
  /** The wood is clipped below this, so the trunk's round end doesn't poke out under the ground. */
  groundClip: number;
  leaves: TreeLeaf[];
};

type Point = { x: number; y: number };
/** `group` is the category index of the limb a node belongs to; -1 for the trunk. */
type Node = Point & { parent: number; children: number[]; depth: number; group: number };

/** Small, fast seeded PRNG (mulberry32). */
function random(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const r1 = (n: number) => Math.round(n * 10) / 10;

export function layoutTree(categories: readonly TechCategory[], config: TreeConfig): TreeLayout {
  const { width, leaf, crownX, crownY, trunkHeight, trunkRadius, step, influence, reach, twigs, leafShell, seed } = config;
  const rand = random(seed);
  const cx = width / 2;
  const cy = -(trunkHeight + crownY);

  // A lumpy ellipse, so the crown outline isn't geometric.
  // Foliage grows on the outside of a crown, not in its middle — keeping the
  // points in an outer shell makes the trunk fork into limbs instead of
  // running up the centre like a pole.
  const crownRadius = (p: Point) => {
    const dx = (p.x - cx) / crownX;
    const dy = (p.y - cy) / crownY;
    const theta = Math.atan2(dy, dx);
    const lumps = 1 + 0.07 * Math.sin(3 * theta + 1.3) + 0.05 * Math.sin(5 * theta + 0.4);
    return Math.hypot(dx, dy) / lumps;
  };
  const randomInCrown = (outer: number, inner = 0.5): Point => {
    for (;;) {
      const p = { x: cx + (rand() * 2 - 1) * crownX * 1.15, y: cy + (rand() * 2 - 1) * crownY * 1.15 };
      const radius = crownRadius(p);
      if (radius <= outer && radius >= inner) return p;
    }
  };
  // Leaves also stay out of the low middle of the crown, just above the fork:
  // little grows there, and a leaf there would sit apart from its category.
  const randomLeafSpot = (outer: number): Point => {
    for (;;) {
      const p = randomInCrown(outer, leafShell);
      if (!(p.y > cy + crownY * 0.3 && Math.abs(p.x - cx) < crownX * 0.4)) return p;
    }
  };

  // ---- 1. Leaves: evenly spread (best-candidate sampling), then grouped ----
  const techs = categories.flatMap((category, categoryIndex) =>
    category.techs.map((tech) => ({ tech, category: category.name, categoryIndex })),
  );
  const inset = 1 - (leaf * 0.6) / Math.min(crownX, crownY);
  const spots: Point[] = [];
  while (spots.length < techs.length) {
    let best = randomLeafSpot(inset);
    let bestScore = -1;
    for (let c = 0; c < 40; c++) {
      const candidate = c === 0 ? best : randomLeafSpot(inset);
      const score = Math.min(Infinity, ...spots.map((s) => dist(s, candidate)));
      if (score > bestScore) [best, bestScore] = [candidate, score];
    }
    spots.push(best);
  }
  // Sweep left to right around the top of the trunk, so each category gets
  // its own wedge of the crown and the branches holding it share a limb.
  // Measured from well below the crown, so leaves low in the crown fall clearly into one wedge.
  const pivot = { x: cx, y: cy + crownY * 1.7 };
  const sweep = (p: Point) => Math.atan2(p.y - pivot.y, p.x - pivot.x);
  spots.sort((a, b) => sweep(a) - sweep(b));

  // ---- 2–3. Grow the wood ----
  type Attractor = Point & { group: number; node: number; d: number; alive: boolean };
  const leafAttractors: Attractor[] = spots.map((p, i) => ({
    ...p,
    group: techs[i].categoryIndex,
    node: -1,
    d: Infinity,
    alive: true,
  }));
  // A bare twig point belongs to the category of the leaf nearest to it.
  const twigAttractors: Attractor[] = Array.from({ length: twigs }, () => {
    const p = randomInCrown(1, 0.25);
    const nearest = leafAttractors.reduce((a, b) => (dist(a, p) <= dist(b, p) ? a : b));
    return { ...p, group: nearest.group, node: -1, d: Infinity, alive: true };
  });
  const attractors = [...leafAttractors, ...twigAttractors];

  const nodes: Node[] = [{ x: cx, y: 0, parent: -1, children: [], depth: 0, group: -1 }];
  const addNode = (parent: number, p: Point, group = nodes[parent].group) => {
    const index = nodes.length;
    nodes.push({ ...p, parent, children: [], depth: nodes[parent].depth + 1, group });
    nodes[parent].children.push(index);
    return index;
  };
  // Each point remembers the closest node of its own limb; only new nodes need checking.
  const track = (from: number) => {
    for (const a of attractors) {
      if (!a.alive) continue;
      for (let n = from; n < nodes.length; n++) {
        if (nodes[n].group !== a.group) continue;
        const d = dist(a, nodes[n]);
        if (d < a.d) [a.d, a.node] = [d, n];
      }
    }
  };

  // Where each category's limb leaves the trunk: by the direction of its
  // wedge, sideways wedges low on the trunk, upright ones high.
  const limbs = categories.map((_, group) => {
    const own = leafAttractors.filter((a) => a.group === group);
    const centre = {
      x: own.reduce((sum, a) => sum + a.x, 0) / own.length,
      y: own.reduce((sum, a) => sum + a.y, 0) / own.length,
    };
    const sideways = Math.abs(Math.cos(sweep(centre)));
    return { group, centre, attachY: cy + crownY * (0.3 + 0.5 * sideways) };
  });

  // The trunk: straight up with a slight sway, to the highest limb.
  const trunkTop = Math.min(...limbs.map((l) => l.attachY));
  let tip = 0;
  while (nodes[tip].y - step > trunkTop) {
    const sway = Math.sin(nodes.length * 0.15) * step * 0.12;
    tip = addNode(tip, { x: nodes[tip].x + sway, y: nodes[tip].y - step });
  }
  const trunk = nodes.map((_, i) => i);

  // Each limb heads out from the trunk towards the middle of its leaves until they can pull it.
  for (const limb of limbs) {
    let at = trunk.reduce((a, b) => (Math.abs(nodes[b].y - limb.attachY) < Math.abs(nodes[a].y - limb.attachY) ? b : a));
    const own = attractors.filter((a) => a.group === limb.group);
    for (let guard = 0; guard < 200; guard++) {
      const here = nodes[at];
      const target = limb.centre;
      const d = dist(target, here) || 1;
      const next = { x: here.x + ((target.x - here.x) / d) * step, y: here.y + ((target.y - here.y) / d) * step };
      at = addNode(at, next, limb.group);
      if (own.some((a) => dist(a, next) < influence)) break;
    }
  }
  track(0);

  const upward = 0.18; // phototropism: growth leans slightly up
  for (let iteration = 0; iteration < 600; iteration++) {
    const pulls = new Map<number, Point>();
    for (const a of attractors) {
      if (!a.alive || a.d > influence) continue;
      const n = nodes[a.node];
      const len = a.d || 1;
      const pull = pulls.get(a.node) ?? { x: 0, y: 0 };
      pull.x += (a.x - n.x) / len;
      pull.y += (a.y - n.y) / len;
      pulls.set(a.node, pull);
    }
    if (pulls.size === 0) break;

    const before = nodes.length;
    for (const [index, pull] of pulls) {
      let x = pull.x;
      let y = pull.y - upward;
      // Pulled evenly both ways: nudge sideways instead of stalling.
      if (Math.hypot(x, y) < 0.05) [x, y] = [rand() - 0.5, -0.5];
      const norm = Math.hypot(x, y);
      const next = { x: nodes[index].x + (x / norm) * step, y: nodes[index].y + (y / norm) * step };
      // A tip pulled from behind would sprout the same twig again and again,
      // piling up thickness into a stubby limb; skip one that already exists.
      if (nodes[index].children.some((c) => dist(nodes[c], next) < step * 0.6)) continue;
      addNode(index, next);
    }
    if (nodes.length === before) break;
    track(before);
    for (const a of attractors) if (a.alive && a.d < reach) a.alive = false;
  }

  // Every leaf ends on its own twig, even one the growth only came near.
  const leafNodes = spots.map((spot, i) => addNode(attractors[i].node, spot));
  const isLeafNode = new Set(leafNodes);

  // Ease the zig-zag of single growth steps into smooth curves.
  for (let pass = 0; pass < 3; pass++) {
    const next = nodes.map((n, i) => {
      if (n.parent < 0 || n.children.length === 0 || isLeafNode.has(i)) return n;
      const p = nodes[n.parent];
      const kx = n.children.reduce((s, c) => s + nodes[c].x, 0) / n.children.length;
      const ky = n.children.reduce((s, c) => s + nodes[c].y, 0) / n.children.length;
      return { x: (p.x + 2 * n.x + kx) / 4, y: (p.y + 2 * n.y + ky) / 4 };
    });
    next.forEach((n, i) => Object.assign(nodes[i], { x: n.x, y: n.y }));
  }

  // ---- 4. Thickness: pipe model, from the twigs down ----
  // Children are always added after their parent, so one reverse pass is enough.
  const exponent = 2.2;
  const radius = new Array<number>(nodes.length).fill(0);
  for (let i = nodes.length - 1; i >= 0; i--) {
    const kids = nodes[i].children;
    radius[i] =
      kids.length === 0 ? 1 : Math.pow(kids.reduce((s, c) => s + Math.pow(radius[c], exponent), 0), 1 / exponent);
  }
  const scale = trunkRadius / radius[0];
  const widthAt = (i: number) => {
    // Root flare: the trunk widens just above the ground.
    const flare = 1 + 0.5 * Math.exp(nodes[i].y / (trunkRadius * 1.2));
    return Math.max(0.8, 2 * radius[i] * scale * flare);
  };

  // ---- Draw: one segment per node, bucketed by width ----
  const buckets = new Map<number, string[]>();
  const segment = (a: Point, b: Point, w: number) => {
    const key = w < 4 ? Math.round(w * 2) / 2 : Math.round(w);
    const list = buckets.get(key) ?? [];
    list.push(`M${r1(a.x)} ${r1(a.y)}L${r1(b.x)} ${r1(b.y)}`);
    buckets.set(key, list);
  };
  for (let i = 1; i < nodes.length; i++) segment(nodes[nodes[i].parent], nodes[i], widthAt(i));

  // Surface roots: a few short flares along the ground.
  for (const [angle, length] of [[-170, 3.6], [-12, 3.2], [168, 2.4], [8, 2.6]] as const) {
    const rad = (angle * Math.PI) / 180;
    let prev: Point = { x: cx, y: -trunkRadius * 0.4 };
    const steps = 6;
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const point = {
        x: cx + Math.cos(rad) * trunkRadius * length * t,
        y: -trunkRadius * 0.4 * (1 - t) - Math.sin(rad) * trunkRadius * length * t + trunkRadius * 0.25 * t * t,
      };
      segment(prev, point, Math.max(1, trunkRadius * 1.3 * (1 - t * 0.85)));
      prev = point;
    }
  }

  const maxDepth = Math.max(...leafNodes.map((i) => nodes[i].depth));
  const leaves: TreeLeaf[] = spots.map((spot, i) => {
    const attach = nodes[nodes[leafNodes[i]].parent];
    const towardsTwig = (Math.atan2(attach.y - spot.y, attach.x - spot.x) * 180) / Math.PI;
    return {
      ...techs[i],
      x: r1(spot.x),
      y: r1(spot.y),
      // The leaf's sharp corner is its top-right one (-45°); turn it to face the twig.
      angle: r1(towardsTwig + 45),
      delay: Math.round(150 + (nodes[leafNodes[i]].depth / maxDepth) * 650),
    };
  });

  // Fit the viewBox around everything, full width so the tree stays centred.
  const top = Math.min(...nodes.map((n) => n.y)) - leaf * 0.6 - 6;
  const bottom = trunkRadius * 1.6;
  return {
    config,
    viewBox: [0, r1(top), width, r1(bottom - top)],
    wood: [...buckets].sort(([a], [b]) => b - a).map(([w, list]) => ({ width: w, d: list.join("") })),
    shadow: { cx, cy: trunkRadius * 0.3, rx: crownX * 0.55, ry: trunkRadius * 0.7 },
    groundClip: r1(trunkRadius * 0.4),
    leaves,
  };
}

/**
 * Tiny in-browser synths for the Hobbies instruments: no audio files.
 *
 * Browsers only allow sound after a user gesture, so the AudioContext is
 * created on the first note (always inside a click, tap or key press).
 */
let context: AudioContext | undefined;
let master: GainNode | undefined;

function audio() {
  if (!context) {
    context = new AudioContext();
    master = context.createGain();
    master.gain.value = 0.6;
    master.connect(context.destination);
  }
  if (context.state === "suspended") void context.resume();
  return { ctx: context, out: master! };
}

/** Frequency of a note `semitones` away from A4 (440 Hz). */
export const frequency = (semitonesFromA4: number) => 440 * 2 ** (semitonesFromA4 / 12);

/**
 * A soft electric-piano tone: a sine with a quieter octave above, a fast
 * attack and a long exponential ring-out.
 */
export function playPiano(freq: number) {
  const { ctx, out } = audio();
  const now = ctx.currentTime;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.5, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
  gain.connect(out);
  for (const [mult, level, type] of [
    [1, 1, "sine"],
    [2, 0.25, "sine"],
    [3, 0.08, "triangle"],
  ] as const) {
    const osc = ctx.createOscillator();
    const partial = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq * mult;
    partial.gain.value = level;
    osc.connect(partial).connect(gain);
    osc.start(now);
    osc.stop(now + 1.9);
  }
}

/**
 * A plucked nylon string by Karplus-Strong: a burst of noise loops through a
 * delay one period long, averaged each pass, so it starts bright and mellows
 * as it fades, like a real string.
 */
export function playString(freq: number) {
  const { ctx, out } = audio();
  const seconds = 1.6;
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  const period = Math.round(ctx.sampleRate / freq);
  const ring = new Float32Array(period);
  for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
  let prev = 0;
  for (let i = 0; i < data.length; i++) {
    const j = i % period;
    // Averaging with the previous sample is the low-pass that makes it mellow; 0.996 is the decay.
    const sample = (ring[j] + prev) * 0.5 * 0.996;
    prev = ring[j];
    ring[j] = sample;
    data[i] = sample;
  }
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  gain.gain.value = 0.7;
  source.buffer = buffer;
  source.connect(gain).connect(out);
  source.start();
}

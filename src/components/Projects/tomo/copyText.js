/**
 * Copy text to the clipboard, returning whether it actually worked.
 *
 * The async Clipboard API is the happy path, but it is denied outright in some
 * embedded contexts (preview panes, some in-app browsers), so fall back to a
 * hidden textarea and execCommand. Callers should only show a "copied"
 * confirmation when this resolves true.
 */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fall through to the legacy path
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

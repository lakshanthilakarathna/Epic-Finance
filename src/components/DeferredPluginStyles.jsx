import { useEffect } from "react";

const DEFERRED_STYLES = [
  "/css/plugins/font-awesome.min.css",
  "/css/plugins/fa-font-display-swap.css",
];

/**
 * Font Awesome is large and mostly below the fold; load after first paint.
 * fa-font-display-swap.css overrides FA @font-face to use font-display: swap.
 */
export default function DeferredPluginStyles() {
  useEffect(() => {
    const links = [];
    for (const href of DEFERRED_STYLES) {
      if (document.querySelector(`link[href="${href}"]`)) continue;
      const el = document.createElement("link");
      el.rel = "stylesheet";
      el.href = href;
      document.head.appendChild(el);
      links.push(el);
    }
    return () => {
      for (const el of links) {
        el.remove();
      }
    };
  }, []);
  return null;
}

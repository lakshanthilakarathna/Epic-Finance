import { useEffect } from "react";

const DEFERRED_STYLES = ["/css/plugins/font-awesome.min.css"];

/**
 * Font Awesome is large and mostly below the fold; load after first paint.
 * Swiper CSS stays in _document.js (hero layout).
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

export function countUp(node: HTMLElement, params: { target: number; suffix?: string }) {
  const obs = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const duration = 1400;
      let start: number | null = null;
      const frame = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(params.target * eased) + (params.suffix ?? '');
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
      obs.unobserve(node);
    }
  }, { threshold: 0.6 });
  obs.observe(node);
  return { destroy: () => obs.disconnect() };
}
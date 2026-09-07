export function reveal(node: HTMLElement, delay = 0) {
  if (delay) node.style.setProperty('--d', `${delay}s`);
  const obs = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        node.classList.add('in');
        obs.unobserve(node);
      }
    }
  }, { threshold: 0.15 });
  obs.observe(node);
  return { destroy: () => obs.disconnect() };
}
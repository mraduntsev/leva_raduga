export function reveal(node: HTMLElement, delay: number = 0) {
  node.classList.add('reveal');
  node.style.setProperty('--d', `${delay}s`);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add('in');
          observer.disconnect();
        }
      }
    },
    { threshold: 0.15 }
  );
  observer.observe(node);

  return {
    update(nextDelay: number) {
      node.style.setProperty('--d', `${nextDelay}s`);
    },
    destroy() {
      observer.disconnect();
    }
  };
}
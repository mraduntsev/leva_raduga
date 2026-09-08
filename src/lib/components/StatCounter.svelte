<script lang="ts">
  let { value, suffix = '' }: { value: number; suffix?: string } = $props();

  let counterEl = $state<HTMLSpanElement | undefined>(undefined);
  let shown = $state(0);

  $effect(() => {
    const node = counterEl;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          const duration = 1400;
          let startTime: number | null = null;
          const step = (ts: number) => {
            if (startTime === null) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            shown = Math.round(value * (1 - Math.pow(1 - progress, 3)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  });
</script>

<span bind:this={counterEl}>{shown}{suffix}</span>
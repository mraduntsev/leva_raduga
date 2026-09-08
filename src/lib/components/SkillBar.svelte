<script lang="ts">
  let { label, level, c1, c2 }: { label: string; level: number; c1: string; c2: string } = $props();

  let barEl = $state<HTMLDivElement | undefined>(undefined);
  let width = $state(0);

  $effect(() => {
    const node = barEl;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            width = level;
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  });
</script>

<div>
  <div class="flex justify-between items-center mb-2">
    <span class="font-display text-sm uppercase">{label}</span>
    <span class="pixel-tag" style="color:{c2}">LVL {level}</span>
  </div>
  <div class="bar" bind:this={barEl}>
    <span class="bar-fill" style="--c1:{c1};--c2:{c2};width:{width}%"></span>
  </div>
</div>
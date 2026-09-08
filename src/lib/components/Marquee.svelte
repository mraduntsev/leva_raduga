<script lang="ts">
  import { marqueeItems } from '$lib/content';
</script>

<div class="marquee relative z-10">
  <div class="marquee-track">
    {#each [0, 1] as copy (copy)}
      <div class="flex items-center gap-8 pr-8" aria-hidden={copy === 1}>
        {#each marqueeItems as item (item)}
          <span class="font-display uppercase tracking-wider text-dim">{item}</span>
          <span class="rainbow-text font-display">★</span>
        {/each}
      </div>
    {/each}
  </div>
</div>
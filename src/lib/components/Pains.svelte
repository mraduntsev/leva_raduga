<script lang="ts">
  import { reveal } from '$lib/actions';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import { pains } from '$lib/content';
</script>

<section id="pains" class="py-24 scroll-mt-24">
  <div class="max-w-6xl mx-auto px-4">
    <SectionHead tag="BOSS LEVEL" color="var(--r1)" title="Знакомо?" />

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each pains as pain, i (pain.tag)}
        <article use:reveal={i * 0.1} class="card p-6" style="--glow:{pain.glow}">
          <span class="pixel-tag absolute top-4 right-4" style="color:{pain.accent}">{pain.tag}</span>
          <div class="text-5xl mb-5">{pain.emoji}</div>
          <h3 class="font-display text-xl mb-3 leading-snug">{pain.title}</h3>
          <p class="text-dim text-sm font-medium leading-relaxed">{pain.text}</p>
        </article>
      {/each}
    </div>
  </div>
</section>
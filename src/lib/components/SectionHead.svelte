<script lang="ts">
  import { reveal } from '$lib/actions';

  let { tag, color, title }: { tag: string; color: string; title: string } = $props();
</script>

<div use:reveal class="mb-12 md:mb-16">
  <span class="pixel-tag" style="color:{color}">{tag}</span>
  <h2 class="font-display text-3xl md:text-5xl uppercase mt-3">{title}</h2>
  <div class="rainbow-bar mt-5"></div>
</div>
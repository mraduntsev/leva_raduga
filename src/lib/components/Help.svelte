<script lang="ts">
  import { reveal } from '$lib/actions';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import { quests } from '$lib/content';
  import { formPrefill } from '$lib/form.svelte';

  function takeQuest(id: string) {
    formPrefill.subject = id;
    formPrefill.flashTick += 1;
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section id="help" class="py-24 scroll-mt-24">
  <div class="max-w-6xl mx-auto px-4">
    <SectionHead tag="SIDE QUESTS" color="var(--r4)" title="Квесты, с которыми я помогу" />

    <div class="grid md:grid-cols-2 gap-6">
      {#each quests as quest, i (quest.id)}
        <article use:reveal={i * 0.08} class="card p-7 md:p-8 flex flex-col" style="--glow:{quest.glow}">
          <div class="flex items-center gap-4 mb-5">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border border-line" style="background:{quest.iconBg}">
              {quest.emoji}
            </div>
            <h3 class="font-display text-2xl uppercase">{quest.title}</h3>
          </div>
          <p class="text-dim font-medium leading-relaxed">{quest.text}</p>
          <div class="flex flex-wrap gap-2 mt-5">
            {#each quest.chips as chip (chip)}
              <span class="chip">{chip}</span>
            {/each}
          </div>
          <button onclick={() => takeQuest(quest.id)} class="btn-game btn-ghost mt-6 self-start text-sm">
            ⚔️ Взять квест
          </button>
        </article>
      {/each}
    </div>
  </div>
</section>
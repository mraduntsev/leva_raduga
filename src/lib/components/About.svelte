<script lang="ts">
  import { reveal } from '$lib/actions';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import SkillBar from '$lib/components/SkillBar.svelte';
  import { facts, setupUrl, skills } from '$lib/content';
</script>

<section id="about" class="py-24 scroll-mt-24">
  <div class="max-w-6xl mx-auto px-4">
    <SectionHead tag="PLAYER CARD" color="var(--r6)" title="Обо мне" />

    <div class="grid lg:grid-cols-2 gap-10 items-start">
      <div use:reveal class="card overflow-hidden" style="--glow:#8a5cff">
        <div class="relative">
          <img loading="lazy" src={setupUrl} alt="Мой сетап" class="w-full object-cover" />
          <span class="pixel-tag absolute top-4 left-4 bg-black/60 text-white rounded-md px-3 py-2">MY SETUP • 24/7</span>
        </div>
        <div class="p-6 flex flex-wrap gap-2">
          {#each facts as fact (fact)}
            <span class="chip">{fact}</span>
          {/each}
        </div>
      </div>

      <div use:reveal={0.15}>
        <h3 class="font-display text-2xl md:text-3xl uppercase mb-5">Привет, я Лёва! <span class="rainbow-text">👋</span></h3>
        <p class="text-dim font-medium leading-relaxed mb-4">
          Учусь в 7 классе. Днём — школа, вечером — шортсы, код на Rust и этот сайт на SvelteKit + Tailwind (Svelte 5, руны!).
          Я не «репетитор в пиджаке», а такой же школьник, поэтому объясняю так, как объяснил бы другу перед контрольной.
        </p>
        <p class="text-dim font-medium leading-relaxed mb-8">
          Моя цель — чтобы учёба и контент перестали быть боссом и стали сайд-квестом, который можно пройти с кайфом.
        </p>

        <div class="space-y-5">
          {#each skills as skill (skill.label)}
            <SkillBar label={skill.label} level={skill.level} c1={skill.c1} c2={skill.c2} />
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
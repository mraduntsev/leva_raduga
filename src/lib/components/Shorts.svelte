<script lang="ts">
  import { reveal } from '$lib/actions';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import { shorts } from '$lib/content';
</script>

<section id="shorts" class="py-24 scroll-mt-24">
  <div class="max-w-6xl mx-auto px-4">
    <SectionHead tag="VIDEO DROP" color="var(--r5)" title="Мои шортсы" />

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each shorts as short, i (short.title)}
        <article use:reveal={i * 0.1} class="card overflow-hidden group" style="--glow:{short.glow}">
          <div class="relative aspect-[9/16] overflow-hidden">
            <img
              loading="lazy"
              src={short.img}
              alt={short.alt}
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
            <span class="pixel-tag absolute top-3 right-3 bg-black/60 text-white rounded-md px-2 py-1">{short.duration}</span>
            <div class="play absolute inset-0 m-auto">
              <svg width="22" height="24" viewBox="0 0 22 24" fill="white"><path d="M0 0 L22 12 L0 24 Z" /></svg>
            </div>
            <span class="absolute bottom-3 left-3 text-white text-xs font-black bg-black/60 rounded-md px-2 py-1">
              👁 {short.views} • ❤️ {short.likes}
            </span>
          </div>
          <div class="p-5">
            <h3 class="font-display text-base leading-snug">{short.title}</h3>
            <div class="flex gap-2 mt-3 flex-wrap">
              {#each short.tags as tag (tag)}
                <span class="chip">{tag}</span>
              {/each}
            </div>
          </div>
        </article>
      {/each}

      <article use:reveal={0.3} class="card card-dashed p-6 flex flex-col items-center justify-center text-center gap-5">
        <span class="pixel-tag" style="color:var(--r3)">NEW DROP EVERY WEEK</span>
        <div class="text-6xl floaty">📺</div>
        <p class="font-display text-xl leading-snug">Ещё 200+ видосов уже на канале</p>
        <a href="#contact" class="btn-game btn-red text-sm">▶ Подпишись на YouTube</a>
      </article>
    </div>
  </div>
</section>
<script lang="ts">
  import { reveal } from '$lib/actions';
  import StatCounter from '$lib/components/StatCounter.svelte';
  import { avatarUrl, stats } from '$lib/content';

  let spotEl = $state<HTMLDivElement | undefined>(undefined);

  const stickers = [
    { emoji: '👑', pos: 'top:-6%;right:14%', delay: '0s' },
    { emoji: '💀', pos: 'top:4%;left:10%', delay: '1.2s' },
    { emoji: '🏆', pos: 'bottom:6%;right:8%', delay: '0.6s' },
    { emoji: '💎', pos: 'bottom:-4%;left:16%', delay: '1.8s' }
  ];

  function handleMove(event: MouseEvent) {
    const host = spotEl?.parentElement;
    if (!spotEl || !host) return;
    const rect = host.getBoundingClientRect();
    spotEl.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    spotEl.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
</script>

<section
  id="home"
  role="presentation"
  onmousemove={handleMove}
  class="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden scroll-mt-24"
>
  <div bind:this={spotEl} id="spot"></div>

  <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center relative">
    <div use:reveal>
      <span class="pixel-tag inline-block bg-card2 border border-line rounded-lg px-3 py-2" style="color:var(--r3)">
        LVL 7 • 7 КЛАСС • ЮТУБЕР
      </span>
      <h1 class="font-display uppercase leading-none mt-6 text-5xl sm:text-6xl lg:text-7xl">
        <span class="block">Лёва</span>
        <span class="rainbow-text block">Радуга</span>
      </h1>
      <p class="text-dim text-lg md:text-xl mt-6 max-w-md font-medium">
        Геймер, ютубер и твой тиммейт по учёбе. Снимаю шортсы про Brawl Stars, пишу на Rust и объясняю математику на языке игр.
      </p>
      <div class="flex flex-wrap gap-4 mt-8">
        <a href="#help" class="btn-game btn-primary">🚀 Получить помощь</a>
        <a href="#shorts" class="btn-game btn-ghost">▶ Мои шортсы</a>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
        {#each stats as stat (stat.label)}
          <div class="bg-card border border-line rounded-2xl p-4 text-center">
            <div class="font-display text-2xl md:text-3xl rainbow-text">
              <StatCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div class="text-dim text-xs mt-1 font-bold">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>

    <div use:reveal={0.15} class="relative">
      <div class="avatar-ring mx-auto w-[270px] h-[270px] md:w-[360px] md:h-[360px]">
        <img
          src={avatarUrl}
          alt="Лёва Радуга"
          class="relative z-10 w-full h-full object-cover rounded-full border-[6px] border-[#05060a]"
        />
      </div>
      {#each stickers as sticker (sticker.emoji)}
        <span class="floaty absolute text-4xl md:text-5xl" style="{sticker.pos};animation-delay:{sticker.delay}">
          {sticker.emoji}
        </span>
      {/each}
    </div>
  </div>

  <a href="#pains" class="absolute bottom-5 left-1/2 -translate-x-1/2 text-dim animate-bounce text-xl" aria-label="Вниз">▼</a>
</section>
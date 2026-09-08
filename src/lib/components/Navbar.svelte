<script lang="ts">
  import { navLinks } from '$lib/content';
  import { theme } from '$lib/theme.svelte';

  let active = $state('home');
  let menuOpen = $state(false);

  $effect(() => {
    const nodes = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active = entry.target.id;
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  });
</script>

<header class="fixed top-0 inset-x-0 z-50 nav-blur">
  <nav class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
    <a href="#home" class="flex items-center gap-2 font-display text-lg tracking-wide">
      <span class="text-2xl">🎮</span><span class="rainbow-text font-black">ЛЕВА РАДУГА</span>
    </a>

    <ul class="hidden lg:flex items-center gap-7 text-sm">
      {#each navLinks as link (link.id)}
        <li>
          <a href="#{link.id}" class="navlink" class:active={active === link.id}>{link.label}</a>
        </li>
      {/each}
    </ul>

    <div class="flex items-center gap-3">
      <button
        onclick={() => theme.toggle()}
        title="Сменить тему"
        class="w-10 h-10 rounded-xl bg-card2 border border-line text-lg hover:scale-110 transition"
      >
        {theme.light ? '🌙' : '☀️'}
      </button>
      <a href="#contact" class="btn-game btn-primary hidden sm:inline-flex text-sm !py-2.5 !px-5">Помощь</a>
      <button
        onclick={() => (menuOpen = !menuOpen)}
        class="lg:hidden w-10 h-10 rounded-xl bg-card2 border border-line text-xl"
        aria-label="Меню"
      >
        ☰
      </button>
    </div>
  </nav>

  {#if menuOpen}
    <div class="lg:hidden border-t border-line bg-app px-6 py-4">
      <ul class="flex flex-col gap-4 text-base font-bold">
        {#each navLinks as link (link.id)}
          <li>
            <a href="#{link.id}" onclick={() => (menuOpen = false)} class="navlink" class:active={active === link.id}>
              {link.emoji} {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</header>
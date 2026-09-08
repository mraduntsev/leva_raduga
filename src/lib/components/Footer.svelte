<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="relative z-10">
  <div class="footer-line"></div>
  <div class="bg-card py-8">
    <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <a href="#home" class="flex items-center gap-2 font-display">
        <span class="text-xl">🎮</span><span class="rainbow-text font-black">ЛЁВА РАДУГА</span>
      </a>
      <p class="text-dim text-sm font-bold text-center">© { year } • 7 класс • SvelteKit • 🤖</p>
      <p class="font-display text-sm uppercase tracking-wider text-dim">GG WP ❤️</p>
    </div>
  </div>
</footer>
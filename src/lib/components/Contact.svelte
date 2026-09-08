<script lang="ts">
  import { fly } from 'svelte/transition';
  import { PUBLIC_WEB3FORMS_KEY } from '$env/static/public';
  import { reveal } from '$lib/actions';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import { socials, subjectOptions } from '$lib/content';
  import { formPrefill } from '$lib/form.svelte';

  let name = $state('');
  let telegram = $state('');
  let message = $state('');
  let honeypot = $state('');
  let sending = $state(false);
  let flashing = $state(false);
  let toast = $state<{ text: string; ok: boolean } | null>(null);
  let toastTimer: ReturnType<typeof setTimeout> | undefined = undefined;

  $effect(() => {
    const tick = formPrefill.flashTick;
    if (tick === 0) return;
    flashing = true;
    const timer = setTimeout(() => (flashing = false), 1200);
    return () => clearTimeout(timer);
  });

  function showToast(text: string, ok: boolean) {
    toast = { text, ok };
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast = null), 3500);
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (sending) return;
    if (honeypot !== '') return;

    sending = true;
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: PUBLIC_WEB3FORMS_KEY,
          from_name: 'Лендинг «Лева Радуга»',
          subject: 'Новая заявка с лендинга',
          honeypot,
          'Имя': name,
          'Телеграм': telegram,
          'Направление': formPrefill.subject,
          'Сообщение': message || '—'
        })
      });
      const data = await response.json();
      if (data.success) {
        showToast('Заявка отправлена! Отвечу после уроков 😄', true);
        name = '';
        telegram = '';
        message = '';
      } else {
        showToast('Что-то сломалось... Попробуй ещё раз 🙏', false);
      }
    } catch {
      showToast('Нет сети... Попробуй ещё раз 🙏', false);
    } finally {
      sending = false;
    }
  }
</script>

<section id="contact" class="py-24 scroll-mt-24">
  <div class="max-w-6xl mx-auto px-4">
    <SectionHead tag="CO-OP MODE" color="var(--r4)" title="Пиши мне" />

    <div class="grid lg:grid-cols-[1.2fr_.8fr] gap-8 items-start">
      <form
        use:reveal
        onsubmit={handleSubmit}
        class="card p-6 md:p-8"
        class:quest-flash={flashing}
        style="--glow:#4dff7c"
      >
        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label for="name" class="block text-xs font-black uppercase tracking-wider text-dim mb-2">Как тебя зовут?</label>
            <input id="name" type="text" required placeholder="Твоё имя" class="input" bind:value={name} />
          </div>
          <div>
            <label for="tg" class="block text-xs font-black uppercase tracking-wider text-dim mb-2">Телеграм</label>
            <input id="tg" type="text" required placeholder="@nickname" class="input" bind:value={telegram} />
          </div>
        </div>

        <div class="mt-5">
          <label for="subject" class="block text-xs font-black uppercase tracking-wider text-dim mb-2">С чем помочь?</label>
          <select id="subject" class="input" bind:value={formPrefill.subject}>
            {#each subjectOptions as opt (opt.value)}
              <option value={opt.value}>{opt.label}</option>
            {/each}
          </select>
        </div>

        <div class="mt-5">
          <label for="msg" class="block text-xs font-black uppercase tracking-wider text-dim mb-2">Сообщение</label>
          <textarea id="msg" rows="4" placeholder="Опиши свой квест…" class="input resize-none" bind:value={message}></textarea>
        </div>

        <input type="text" name="honeypot" class="hidden" tabindex="-1" autocomplete="off" bind:value={honeypot} />

        <button type="submit" disabled={sending} class="btn-game btn-primary w-full sm:w-auto mt-7">
          {sending ? '⏳ Отправляю…' : '📨 Отправить'}
        </button>
      </form>

      <div use:reveal={0.15} class="space-y-6">
        <div class="card p-6" style="--glow:#ff4040">
          <span class="pixel-tag" style="color:var(--r1)">WHERE TO FIND ME</span>
          <div class="mt-5 space-y-3">
            {#each socials as social (social.title)}
              <a
                href={social.href}
                class="social-link flex items-center gap-3 p-3 rounded-xl bg-card2 border border-line"
                style="--glow:{social.glow}"
              >
                <span class="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style="background:{social.bg}">{social.emoji}</span>
                <span>
                  <span class="block font-display text-sm">{social.title}</span>
                  <span class="block text-dim text-xs font-bold">{social.note}</span>
                </span>
              </a>
            {/each}
          </div>
        </div>

        <div class="card p-6" style="--glow:#ffee33">
          <span class="pixel-tag" style="color:var(--r3)">RESPAWN TIME</span>
          <p class="text-dim text-sm font-medium leading-relaxed mt-4">
            Отвечаю обычно после школы — примерно в 15:00. Если я в ранкеде по Brawl Stars — чуть позже 😄 Но всегда отвечаю!
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{#if toast}
  <div class="fixed inset-x-0 bottom-6 z-[80] flex justify-center pointer-events-none">
    <div
      transition:fly={{ y: 16, duration: 250 }}
      class="card px-6 py-4 flex items-center gap-3 font-bold pointer-events-auto"
      style="--glow:{toast.ok ? '#4dff7c' : '#ff4040'}"
    >
      <span class="text-2xl">{toast.ok ? '✅' : '⚠️'}</span>
      <span>{toast.text}</span>
    </div>
  </div>
{/if}
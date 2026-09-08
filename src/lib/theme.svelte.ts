const STORAGE_KEY = 'lr-theme';

class ThemeStore {
  light = $state(false);

  init() {
    if (typeof document === 'undefined') return;
    this.light = document.documentElement.classList.contains('light');
  }

  toggle() {
    this.light = !this.light;
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('light', this.light);
    try {
      localStorage.setItem(STORAGE_KEY, this.light ? 'light' : 'dark');
    } catch {
      /* приватный режим — ок */
    }
  }
}

export const theme = new ThemeStore();
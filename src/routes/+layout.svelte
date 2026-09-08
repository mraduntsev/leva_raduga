<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { theme } from '$lib/theme.svelte';

  let { children } = $props();

  onMount(() => theme.init());
</script>

<div id="stars" class="fixed inset-0 pointer-events-none z-0"></div>
<div id="glows" class="fixed inset-0 pointer-events-none z-0"></div>

<Navbar />
{@render children()}
<Footer />
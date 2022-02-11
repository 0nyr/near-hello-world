<script lang="ts">
  import logo from './assets/svelte.png'
  import Counter from './lib/Counter.svelte'

  import * as nearAPI from 'near-api-js'
  import type { ConnectConfig, Near } from 'near-api-js'
  import { WalletConnection } from 'near-api-js';

  import { onMount } from 'svelte';

  const { keyStores } = nearAPI
  const keyStore = new keyStores.BrowserLocalStorageKeyStore()

  const { connect } = nearAPI

  const config: ConnectConfig = {
    networkId: "testnet",
    keyStore, // optional if not signing transactions
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    headers: {}
  };

  let near: Near
  let wallet: WalletConnection

  onMount(async () => {
    near = await connect(config)
    wallet = new WalletConnection(near, '')
  })


  const signIn = () => {
    wallet.requestSignIn(
      "helloworld.onyr.testnet", // contract requesting access
      "Helloworld app", // optional
    )
  }
</script>

<main>
  <img src={logo} alt="Svelte Logo" />
  <h1>Hello Typescript!</h1>
  <button on:click={signIn}>Sign in</button>

  <p>
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
    the officially supported framework, also powered by Vite!
  </p>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>

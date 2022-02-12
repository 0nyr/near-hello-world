<script lang="ts">
  import * as nearAPI from 'near-api-js'
  import { ConnectConfig, Contract, Near } from 'near-api-js'
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
  let accountId
  let contract

  let loggedin = false

  let givenName: string = "Bobby"
  let fullText: string = ""

  let logs = []

  onMount(async () => {
    initContract()

    await initContract()
      .catch(console.error);
    
    loggedin = wallet.isSignedIn()

    console.log = function(){
      logs.push(Array.from(arguments));
      console.info.apply(console, arguments);
    }
  })

  const CONTRACT_NAME = "helloworld.onyr.testnet";

  // Initializing contract
  async function initContract() {
    // Initializing connection to the NEAR node.
    near = await connect(config)

    // Initializing Wallet based Account. It can work with NEAR TestNet wallet that
    // is hosted at https://wallet.testnet.near.org
    wallet = new WalletConnection(near, '')

    // Getting the Account ID. If unauthorized yet, it's just empty string.
    accountId = wallet.getAccountId();

    // Initializing our contract APIs by contract name and configuration.
    contract = await new Contract(wallet.account(), CONTRACT_NAME, {
      // NOTE: This configuration only needed while NEAR is still in development
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: [],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["hello"]
    });
  }

  const signin = async () => {
    await wallet.requestSignIn(
      // The contract name that would be authorized to be called by the user's account.
      CONTRACT_NAME,
      // This is the app name. It can be anything.
      'Hello World',
      // We can also provide URLs to redirect on success and failure.
      // The current URL is used by default.
    );
    loggedin = wallet.isSignedIn()
  }

  const signout = () => {
    wallet.signOut();
    loggedin = wallet.isSignedIn()
  }

  // Function to update who said hi
  async function callContract() {
    // response is empty since it is a changeMethods
    const response = await contract.hello(
      {name: givenName}, // argument name and value - pass empty object if no args required
      300000000000000, // attached GAS (optional)
      0 // attached deposit in yoctoNEAR (optional)
    );
    console.log(response)
    console.log(logs)
    // This is the callback function that is called when the promise is resolved.
    fullText = logs[1]
  }
</script>

<main>
  <h1>Hello World Contract</h1>

  {#if loggedin}
    <button id="contract" on:click={callContract} class="signed-in">
        Call Hello World contract
    </button>
    <input type="Your name" id="name" bind:value={givenName}><br>
    <p id="result">{fullText}</p>
  {:else}
    <button id="sign-in" on:click={signin} class="signed-out">
      Sign in with NEAR wallet
    </button>
  {/if}

  <footer>
  {#if loggedin}
    <p class="signed-in">
      <!-- svelte-ignore a11y-missing-content -->
      Signed in as <a id="account-id" href="https://wallet.testnet.near.org/profile" target="_blank">{accountId}</a>
      • <a on:click={signout} href="#signout" id="sign-out">sign out</a>
    </p>
  {/if}
  <p>Author: Onyr (Florian Rascoussier) - florian.rascoussier@insa-lyon.fr </p>
  <p>Project repo: https://github.com/0nyr/near-hello-world</p>
  </footer>
</main>

<style>
</style>

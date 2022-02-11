import { Buffer } from 'buffer'
globalThis.Buffer = Buffer;

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app

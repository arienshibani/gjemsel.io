import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  intro: true
})

console.log(`%cTampen brenner! 🔥 `, '🐦;background: pink; color: #444; padding: 3px; border-radius: 5px;');
console.log(`%cÅpen for PRs 🥰  → https://github.com/arienshibani/gjemsel.io`, '🐦;background: lightblue; color: #444; padding: 3px; border-radius: 5px;');

export default app

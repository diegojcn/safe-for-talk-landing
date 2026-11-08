// Variante do qa/os576-foco.mjs para a OS #578: porta por argumento, mede Tab (critério 4) e clique (critério 5).
import { createRequire } from 'node:module';
const require = createRequire('/Users/diegoneves/github/bd-ia-company/qa/package.json');
const { chromium } = require('@playwright/test');
const [porta, rotulo] = process.argv.slice(2);
const b = await chromium.launch();
const p = await (await b.newContext({locale:'pt-BR',viewport:{width:600,height:200}})).newPage();
const ler = () => p.evaluate(()=>{const e=document.activeElement;const c=getComputedStyle(e);return `active=${e.tagName} "${e.textContent.trim()}" | focus-visible=${e.matches(':focus-visible')} | boxShadow=${c.boxShadow}`});
await p.goto(`http://localhost:${porta}/unsubscribe`,{waitUntil:'networkidle'});
await p.keyboard.press('Tab'); await p.waitForTimeout(600);
console.log(`[${rotulo}] Tab   -> ${await ler()}`);
await p.screenshot({path:`/tmp/os-578-qa/shots/${rotulo}-tab.png`});
// critério 5: clique de mouse, com a navegação do botão bloqueada para dar tempo de ler
await p.goto(`http://localhost:${porta}/unsubscribe`,{waitUntil:'networkidle'});
const btn = p.getByRole('button', { name: /Home/ }).first();
await btn.evaluate(e => e.addEventListener('click', ev => { ev.preventDefault(); ev.stopImmediatePropagation(); }, { capture: true }));
const box = await btn.boundingBox();
await p.mouse.click(box.x + box.width/2, box.y + box.height/2); await p.waitForTimeout(600);
console.log(`[${rotulo}] click -> ${await ler()}`);
await p.screenshot({path:`/tmp/os-578-qa/shots/${rotulo}-click.png`});
await b.close();

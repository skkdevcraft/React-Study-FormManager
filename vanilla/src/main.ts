import { openForm } from './openForm';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Hello Champion!</h1>
    <div class="card">
      <button id="counter" type="button">
        Start...
      </button>
    </div>
    <p class="read-the-docs">
    </p>
  </div>
`

function show(msg: string) {
  document.querySelector(".read-the-docs")!
    .innerHTML = msg;
}

document.querySelector('#counter')!
  .addEventListener("click", async () => {
    const name = await openForm("What is thy hero name?");
    if (!name) return;

    const occupation = await openForm(`What is ${name.result} occupation?`);
    if (!occupation) return;

    show(`${name.result}! A mighty ${occupation.result}!`);
  });

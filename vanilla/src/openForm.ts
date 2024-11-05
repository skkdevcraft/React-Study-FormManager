export function openForm(title: string): Promise<{ result: string}>
{
    const dialog = document.createElement("dialog");
    dialog.className = "custom-dialog";
    dialog.innerHTML = `
      <form method="dialog">
        <h2>Enter Information:</h2>
        <input type="text' autocomplete="off" />
        <div class="button-container">
          <button type="submit" value="done">
            Done
          </button>
        </div>
      </form>
    `

    dialog.querySelector("h2")!
      .innerText = title;

    document.body.appendChild(dialog);

    dialog.show();

    return new Promise((resolve, reject) => {
      dialog.addEventListener("close", () => {
        if (dialog.returnValue === "done") {
          const result = dialog
            .querySelector("input")!
            .value;
          dialog.remove();
          resolve({ result });
        } else {
          dialog.remove();
          reject(dialog.returnValue);
        }
      });
    })
}
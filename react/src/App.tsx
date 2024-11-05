import { useCallback, useState } from 'react'
import './App.css'
import { useFormManager } from './FormManager';
import { SimpleForm } from './SimpleForm';

function App() {
  const [output, setOutput] = useState("");

  const { openForm } = useFormManager();

  console.log("relaod App", { output });

  const onClick = useCallback(async ()=> {
    // const name = await openForm("What is thy hero name?");
    const name = await openForm<{ result: string} | undefined>((_key, resolve) => (
      <SimpleForm
        title='What is thy hero name?'
        closeCallback={(data) => resolve(data)}
        />
    ));
    if (!name) return;

    // const occupation = await openForm(`What is ${name.result} occupation?`);
    const occupation = await openForm<{ result: string } | undefined>((_key, resolve) => (
      <SimpleForm
        title={`What is ${name.result} occupation?`}
        closeCallback={(data) => resolve(data)}
        />
    ));
    if (!occupation) return;

    setOutput(`${name.result}! A mighty ${occupation.result}!`);
  }, [openForm]);

  return (
    <>
      <h2>Hello, React Champion!</h2>
      <div className="card">
        <button onClick={onClick}>
          Start ...
        </button>
      </div>
      <p className="read-the-docs">
        {output}
      </p>
    </>
  )
}

export default App

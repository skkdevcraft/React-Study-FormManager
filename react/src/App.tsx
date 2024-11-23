import { useCallback, useState } from 'react'
import './App.css'
import { useFormManager } from './FormManager';
import { SimpleForm } from './SimpleForm';

function App() {
  // State to hold the output message
  const [output, setOutput] = useState("");

  // Destructure the openSimpleForm function from the custom hook
  const { openSimpleForm } = useSimpleFormManager();

  console.log("relaod App", { output });

  // Callback function to handle button click
  const onClick = useCallback(async ()=> {
    // Open a simple form to get the hero's name
    const name = await openSimpleForm('What is thy hero name?');
    if (!name) return; // Exit if no name is provided

    // Open a simple form to get the hero's occupation
    const occupation = await openSimpleForm(`What is ${name.result} occupation?`);
    if (!occupation) return; // Exit if no occupation is provided

    // Set the output message with the hero's name and occupation
    setOutput(`${name.result}! A mighty ${occupation.result}!`);
  }, [openSimpleForm]);

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

// Custom hook to manage simple forms
function useSimpleFormManager() {
  // Destructure the openForm function from the form manager
  const { openForm } = useFormManager();

  return {
    // Function to open a simple form with a title
    openSimpleForm: (title: string) => openForm<{ result: string} | undefined>((_key, resolve) => (
      <SimpleForm
        title={title} // Title of the form
        closeCallback={(data) => resolve(data)} // Callback to resolve the form data
        />
    ))
  }
}

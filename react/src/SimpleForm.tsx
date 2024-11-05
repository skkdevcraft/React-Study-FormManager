import { useCallback, useEffect, useRef, useState } from "react"
import { makeDraggable } from "./draggable";

interface SimpleFormProps {
  title: string;
  closeCallback: (data: { result: string } | undefined) => void;
}

export function SimpleForm({ title, closeCallback }: SimpleFormProps) {

  const [text, setText] = useState("");

  const dialogRef = useRef(null);

  console.log("reload SimpleForm", { title });

  const onChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClose = useCallback((e) => {
    if (e.target.returnValue === 'done') {
      closeCallback({ result: text });
    } else {
      closeCallback(undefined);
    }
  }, [text, closeCallback]);

  useEffect(() => {
    if (dialogRef.current) {
      console.log("make draggable ...");
      makeDraggable(dialogRef.current);
    }
  }, []);

  return (
    <dialog className="custom-dialog" 
      onClose={onClose} open={true}
      ref={dialogRef}>
      <form method="dialog">
        <h2>{title || "Enter Information:"}</h2>
        <input type="text" autoComplete="off" autoFocus={true}
          value={text}
          onChange={onChange}/>
        <div className="button-container">
          <button type="submit" value="done">
            Done
          </button>
        </div>
      </form>

    </dialog>
  )
}
import React, { createContext, ReactElement, ReactNode, useContext, useMemo, useState } from "react";

type CreateChildType<T> = (key: string, resolve: (data: T) => void) => ReactElement;

interface FormManagerContextType {
  openForm: <T>(createChild: CreateChildType<T>) => Promise<T>;
}

const FormManagerContext = createContext<FormManagerContextType | undefined>(undefined);

function useFormManager() {
  const result = useContext(FormManagerContext);
  if (!result) {
    throw new Error("Use useFormManager from within FormManager...");
  }
  return result;
}

interface FormManagerProps {
  children: ReactNode
}

let formCount = 0;
function newKey() {
  return `key${formCount++}`;
}

export function FormManager({ children }: FormManagerProps) {

  const [forms, setForms] = useState<Record<string, ReactElement>>({});

  console.log("reload FormManager", { cnt: Object.keys(forms).length });

  const context = useMemo<FormManagerContextType>(() => ({
    openForm: (createChild) => {
      return new Promise((resolve, _reject) => {

        const key = newKey();

        const child = React.cloneElement(
          createChild(key, (data) => {
            setForms((prevForms) => {
              const newForms = { ...prevForms };
              delete newForms[key];
              return newForms;
            });
            resolve(data);
          }),
          { key });

        setForms((prevForms) => {
          return {
            ...prevForms,
            [key]: child
          }
        });
      })
    }
  }), []);

  return (
    <FormManagerContext.Provider value={context}>
      {children}
      {Object.values(forms)}
    </FormManagerContext.Provider>
  );

}

// eslint-disable-next-line react-refresh/only-export-components
export { useFormManager };
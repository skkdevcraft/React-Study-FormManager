# React Study - A Form Manager

This is one possible implementation of a form manager in React. A "form manager" component is responsible for the life cycle of a form - creating and destroying it. While the content of the particular forms managed is not important, this study uses a single-text-field form as an example.

This study explores a possible implementation of the functionality, and the code provided is not intended for production use. It serves as an educational resource to demonstrate concepts and practices in React.

## Vanilla vs. React

This repo provides a comparison between "vanilla" JavaScript and React. The ```vanilla``` folder shows how the functionality would look if no framework is used. The logic illustrated with this code can be found in (```/vanilla/src/main.ts```):

```js
    ...
    const name = await openForm("What is thy hero name?");
    if (!name) return;

    const occupation = await openForm(`What is ${name.result} occupation?`);
    if (!occupation) return;

    show(`${name.result}! A mighty ${occupation.result}!`);
    ...
```

The ```react``` folder contains the equivalent React implementation with an additional feature - its ```openForm``` method takes the form component to be shown, whereas the vanilla implementation always opens the same form. (```/react/src/App.tsx```)

```tsx
    ...
    // const name = await openForm("What is thy hero name?");
    const name = await openForm<{ result: string} | undefined>((key, resolve) => (
      <SimpleForm
        title='What is thy hero name?'
        closeCallback={(data) => resolve(data)}
        />
    ));
    if (!name) return;

    // const occupation = await openForm(`What is ${name.result} occupation?`);
    const occupation = await openForm<{ result: string } | undefined>((key, resolve) => (
      <SimpleForm
        title={`What is ${name.result} occupation?`}
        closeCallback={(data) => resolve(data)}
        />
    ));
    if (!occupation) return;

    setOutput(`${name.result}! A mighty ${occupation.result}!`);
    ...
```

# How to Start

Both the ```vanilla``` and the ```react``` folders contain a Vite app. You need to run ```npm install``` and then start with ```npm run dev```:

```
cd react
npm install
npm run dev
```


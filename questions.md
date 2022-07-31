## Answers

1.  What is the difference between Component and PureComponent? give an
    example where it might break my app.

        Frankly, I don't have much experience with using the class components and shouldComponentUpdate(). As far as I understand PureComponent automatically implements the shouldComponentUpdate() lifecycle method
        To create Pure from a regular component we can add shouldComponentUpdate() since it compares previous state in orderd to render. As far as bugs go there is a chance if you pass a function that compare fails. Bugs seams to be difficult to find.

2.  Context + ShouldComponentUpdate might be dangerous. Can think of why is
    that?

        Context has one provider and many consumers. If for example one of the consumers(parent) is a Pure component that implements shouldComponentUpdate() by default. It can short circuit the re-rendering for all of it's children by blocking the context propagation.

3.  Describe 3 ways to pass information from a component to its PARENT.

        What I use the most is useState hook and I share a callback handler as a prop to the Child component. We can also use some third-party
        packages like mobx or redux to update state. Thats honestly all the ways I know how :smile:

4.  Give 2 ways to prevent components from re-rendering.

        useMemo() and UseCallback() Hooks are great for just that thing. When using these hooks component will re-render only on props change.

5.  What is a fragment and why do we need it? Give an example where it might break my app.

        Fragments allow us to add multiple elements to a React component without wrapping them in an extra DOM node.
        They can also increase render speed. Since it does not add a node just a virtual DOM container.
        It can break some styles if not careful.

6.  Give 3 examples of the HOC pattern.

        HOC are used to share commonly used functionality. Redux has a connect function, used for sharing data from the store, mobx has observable function for the same purpose. Most UI libraries I used have some withStyles function to share a theme throught out the app.

7.  What's the difference in handling exceptions in promises, callbacks and async...await.

        Async...await is basically syntactic sugar for Promises. In Promises exceptions are handled with then and catch block. Async...await eliminates callbacks so you must use try catch blok to catch errors. For callbacks its kinda tricky and I don't use them to resolve async code, but what we can do is something called error-first callback. Thats a javascript pattern and it basically means we pass an errro as an argument in a callback. The first argument of the callback is usually named error, so if something goes wrong in the asynchronous function, then the callback gets called with the first argument which specifies what error has happened.

8.  How many arguments does setState take and why is it async.

        Two arguments for the setState, state and a callback function. This is because setState alters the state and causes rerendering. This can be an expensive operation and making it synchronous might leave the browser unresponsive.

9.  List the steps needed to migrate a Class to Function Component.

        - Change the class to a function
        - Remove the render method
        - Convert all methods to functions
        - Remove references to this
        - Remove constructor
        - Remove event handler bindings
        - Replace lifecycle methods with hooks

10. List a few ways styles can be used with components.

        I personally like styled-components, but you can import style sheet in a component and use className as well. There is always inline css.

11. How to render an HTML string coming from the server.

        dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM. It will stop attackers from injecting
        client-side scripts.

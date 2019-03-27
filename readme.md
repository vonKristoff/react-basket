# React-basket readme



A simple app that acts as a shopping-basket with some prefilled products and quantities.

The app uses the Context API to prevent prop-drilling.

The items in the basket provide all the classic user stories for this app use case. (ie add, remove, change quantity, clear, change currency).

The items can also be previewed in greater detail through loading in extra meta and being displayed via a modal component. This is where the use for shared state comes in and underlines the usefulness of the Context API.

This app won't run, but if placed into a `create-react-app` src directory. it would work - however the app uses `scss` and that would need to be compiled, otherwise its a ghastly mess without CSS.

Hopefully the best practices shine through here in the code, with all of the ES6 enhancements.

Components are kept dumb, cheap and functional.
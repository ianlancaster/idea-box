# Idea Box In Vanilla JS

Idea box was the first project in module 1 of the Turing school that we were introduced to constructors and classes. It is a simple CRUD application that allows a user to create a new idea and store it in local storage. Ideas have a quality rating that can be modified, and can also be edited, deleted, and filtered.

Originally my partner and I coded the app using primarily jQuery, but I decided to redo the entire application using Vanilla ES5 JS and webpack to solidify my knowledge of JS fundamentals. The application was built using OOP methodologies to mirror a traditional MVC architecture. There are only four objects that comprise the application: a dom object, controller, ideaBox, and Idea constructor.

![Idea Box Gif](https://media.giphy.com/media/l0Ex0mxnt8p8HZ6og/giphy.gif)


To install the dependencies run:

```
npm install
```

To fire up a development server run:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/` to run the application.

To build the static files:

```js
npm run build
```

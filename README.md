# data-storage-visual

## Requirements

- Node
- Bower
- Gulp

## Development

### Installing Dependencies

1. Run npm and bower install

From within the root directory:

```sh
npm install -g react-tools
npm install
bower install
```

&nbsp;
2. npm tasks

```sh
npm start
```

To browserify and start auto-compiling jsx while watching the jsx files and saving on any changes.

All the components will be bundled into a file called bundle.js that is then required within the index.html

&nbsp;
3. Server Launch

In a new terminal tab other than the one running `npm start` run:

```sh
nodemon app.js
```

To create a server that watches any changes.

`node app.js` also works but if you make any server side changes restart the server.

Now visit http://localhost:8000 to see the site in development.

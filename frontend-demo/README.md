### INSTALL
1. `npm install create-react-app`
2. `npm install js-cookie`

(really, should just need `npm install` in `/frontend-demo` I think?)

### INIT
1. `/frontend-demo/userdemo/npx create-react-app userdemo`
2. Put `  "proxy": "http://127.0.0.1:8000/"` in package.json

### RUN
In `/frontend-demo/userdemo/`: `npm start`

### EDIT
"Edit src/App.js and save to reload."
(The hotloading is nice - save a file in the project, npm automatically picks up on that and transpiles Babel->JS)
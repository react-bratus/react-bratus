# @react-bratus/cli

This is the react-bratus CLI tool. With this tool you can parse your react.js project and have your component tree visualised in a web app.

## Prerequisites

Since this tool is in early development stages, there are some prerequisites for the tool to work properly.

- When running CLI commands, you are in the root directory of your application
- Your root folder contains a `./src` folder that contains all your components. Following file types are supported: `js, jsx, tsx`.
- The root component of your application is named: `App`

## Disclaimer

This tool is in development. Bugs may therefore occur and the parser might not include all components in your project.

## Getting started

Start by installing the tool globally on your computer. This may take a while.

`npm install -g @react-bratus/cli`

Test that the tool is installed correctly by running `react-bratus --help`. You should see the following message:

```(text)
Usage: react-bratus [options]

React Bratus CLI

Options:
  -V, --version  output the version number
  -s, --start    Start server
  -c, --compile  Compile project
  -l, --log      Show logs while parsing
  -h, --help     display help for command
```

Navigate to your React project and write `react-bratus --start` or `react-bratus -s`. If it is the first time running on that project, it will parse the data before launching the application. This can take a moment.

It will show `Listening on port 4444` when ready. Open the browser and navigate to [http://localhost:4444](http://localhost:4444)

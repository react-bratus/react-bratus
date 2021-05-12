# @react-bratus/cli

This is the react-bratus CLI tool. With this tool you can parse your react.js project and have your component tree visualised in a web app.

## Prerequisites

Since this tool is in early development stages, there are some prerequisites for the tool to work properly.

- When running CLI commands, you are in the root directory of your application

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
  -p, --parse  Parse repository
  -l, --log      Show logs while parsing
  -h, --help     display help for command
```

Navigate to your React project and write `react-bratus --start` or `react-bratus -s`. If it is the first time running on that project, it will parse the data before launching the application. This can take a moment.

It will show `Listening on port 4444` when ready. Open the browser and navigate to [http://localhost:4444](http://localhost:4444)

## Configuration

Default configuration is currently the following

```(Typescript)
const currentWorkingDirectory = process.cwd();
const DEFAULT_CONFIGURATION = {
  pathToSaveDir: `${currentWorkingDirectory}/.react-bratus`,
  rootFolderPath: `${currentWorkingDirectory}/src`,
  rootComponents: ['App'],
};
```

Override default configuration by creating `.bratusrc.json` in the root directory. Example:

```(json)
{
    "rootComponents": ["App", "SecondRootComponent"]
}
```

## Changelog

- 2.0.5
  - Throws error if a circular reference is  found
  - Minor bug fixes
- 2.0.4
  - Added TreeSearch
  - Colored components based on the label hash
  - Added lock icon. Possibility to lock multiple components
  - Added eye icon. Possibility to open details about component. Currently path and code defining the component
  - Fixed some bugs
- 2.0.3
  - Added posibility to set options in `.bratusrc.json` file
  - Handle multiple components
  - Highlight components feature
  - Lock highlighted component and move component including descendants at the same time
  - CLI command -c --compile has been changed to -p --parse
  - Removed info section
- 2.0.2
  - First release

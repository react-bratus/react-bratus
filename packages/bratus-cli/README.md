# react-bratus - A software visualisation tool

This is the react-bratus CLI tool. With this tool you can parse your react.js project and have your component tree visualised in a web app.

See a demo of react-bratus v-2.0.7 [here](https://www.youtube.com/watch?v=GBzsOTrZ304)

## Disclaimer

This tool is in development. Bugs may therefore occur and the parser might not include all components in your project.

## Getting started

You can install react-bratus locally (Method 1) or globally (Method 2).

### Method 1

Run: `npm install @react-bratus/cli -D` locally in your project to install react-bratus.

Add following scripts to your package.json file:

```(JSON)
{
  //...
  "scripts": [
    //...
    "bratus": "node ./node_modules/@react-bratus/cli/bin",
    "bratus:start": "node ./node_modules/@react-bratus/cli/bin -s",
    "bratus:parse": "node ./node_modules/@react-bratus/cli/bin -p",
  ]
  //...
}

```

Test that the tool is installed correctly by running `npm run bratus -V`. You should see the version that you have installed.

### Method 2

Start by installing the tool globally on your computer. This may take a while.

`npm install -g @react-bratus/cli`

Test that the tool is installed correctly by running `bratus --help`. You should see the following message:

```(text)
Usage: bratus [options]

React Bratus CLI

Options:
  -V, --version  output the version number
  -s, --start    Start server
  -p, --parse  Parse repository
  -l, --log      Show logs while parsing
  -h, --help     display help for command
```

Navigate to your React project and write `bratus --start` or `bratus -s`. If it is the first time running on that project, it will parse the data before launching the application. This can take a moment.

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

- 3.0.1
  - Updated Repo URLs
- 3.0.0
  - Added horizontal layout and dynamic change of tree layout with buttons.
  - Redesigned the navigation panel + made it collapsible.
  - Changed the folder structure of the applcation.
  - Refactored the code.
  - Made bratus work with React-Router v6.
  - Visualizing the conditional rendering of the components.
  - The command was changed from react-bratus to bratus.
  - Changed the design, and the visualization types of the components.
  - Fixed bugs that had to do with the language of the browser.
  - Fixed the positioning of the tree and the nodes and made it fit the view whenever the tree is rendered.
  - Added the option to remember the tree layout, so that the user can set vertical as the default view.
  - **WIP**: Help panel doesn't work, as we work on it atm.
- 2.0.7
  - Bug fix
- 2.0.6
  - Configurable component backgrounds
  - Improved logging
- 2.0.5
  - Throws error if a circular reference is found
  - Minor bug fixes
  - Updated README
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

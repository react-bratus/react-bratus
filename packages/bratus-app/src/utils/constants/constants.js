export const GraphLabels = {
  leftToRight: 'LR',
  topToBottom: 'TB',
};

export const defaultOpenKeys = [
  'search-component',
  'node-visualization',
  'navigation-actions',
];

export const HelpPanelLabels = {
  title: 'Legend',
  thanks: 'Thank you for installing react-bratus',
  purpose: 'Hopefully this tool can help you navigate your React.js code base.',
  nodes: {
    title: 'Node visualization options',
    text: 'Each node in the visualization represents a user-defined React component. React-Bratus provides three different ways of visualizing the nodes:',
    size: {
      header: 'Proportional Size based on Lines of Code',
      text: 'Depending on the layout of the tree the height or width of each node is proportional to the lines of code in that component.',
      img: './images/proportional_size.png',
    },
    color: {
      header: 'Colorization based on Lines of Code',
      text: ' Depending on the lines of code of a component, its color gets lighter or darker. React-Bratus uses DarkOrange(255,140,0) to achieve this scaling.',
      img: './images/lines_colorization.png',
    },
    white: {
      header: 'White',
      text: 'White provides a simple overview of your component hierarchy, without any visualization filters applied on it.',
      img: './images/white.png',
    },
  },
  edges: {
    title: 'Edge types',
    text: 'Each edge in the visualization indicates a ”renders” relationship where the source node renders the target node. There are three types of those relationships:',
    default: {
      header: 'Components rendered by default',
      text: 'Black edges denote that these comoponents are always rendered by their parent.',
      img: './images/default.png',
    },
    conditional: {
      header: 'Conditionally rendered components',
      text: 'Conditionally rendered based on Javascript control flow (orange-dashed lines) indicate a component rendered within conditional statements. In the label, you can see the conditional type (ternary, &&, if) and the condition that needs to be satisfied for the component to be rendered.',
      img: './images/conditional.png',
    },
    router: {
      header: 'Components rendered by React-Router',
      text: 'Conditionally rendered by the react-router-dom rendered component given a specific path, represented as the label on the edge',
      img: './images/router.png',
    },
  },
  pref: {
    title: 'Preferences',
    help: 'Hide Help on Start Up',
    tree: 'Set vertical layout as default',
  },
  links: {
    title: 'Useful Links',
    repo: 'Github repo',
    repoUrl: 'https://github.com/react-bratus/react-bratus',
    changeLog: 'Changelog',
    changelogUrl: 'https://github.com/react-bratus/react-bratus#changelog',
    demo: 'v2.0.7 Demo',
    demoUrl: 'https://www.youtube.com/watch?v=GBzsOTrZ304',
  },
};

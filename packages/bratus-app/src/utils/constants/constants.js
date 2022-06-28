export const GraphLabels = {
  leftToRight: 'LR',
  topToBottom: 'TB',
};

export const HandleLabels = {
  left: 'left',
  right: 'right',
  bottom: 'bottom',
  top: 'top',
  source: 'source',
  target: 'target',
};

export const DropDownLabels = {
  default: 'Default - Green',
  size: 'Proportional Size based on Lines',
  color: 'Colorization based on Lines',
};

export const DetailsLabels = {
  freq: {
    title: 'Frequency',
    text: 'This component is used:',
    stext: 'times.',
  },
  path: 'Path',
  code: 'Code',
};

export const BackgroundLabels = {
  size: 'proportional_size',
  loc: 'loc_reference',
  default: 'default',
};

export const defaultOpenKeys = [
  'search-component',
  'node-visualization',
  'navigation-actions',
];

export const HelpPanelLabels = {
  title: 'Help Section',
  thanks: 'Thank you for installing react-bratus',
  purpose: 'Hopefully this tool can help you navigate your React.js code base.',
  nodes: {
    title: 'Node visualization options',
    text: 'React-Bratus provides three ways of visualizing the nodes:',
    size: {
      header: 'Size proportional to lines of code',
      text: 'Depending on the layout of the tree the height or width of each node is proportional to the lines of code in that component. However, there is a minimum size. The different colors are used to easily distinguish between components.',
      img: './images/proportional_size.png',
    },
    color: {
      header: 'Color Intensity proportional to lines of code',
      text: "Based on the component's lines of code. More lines result in a darker shade.",
      img: './images/lines_colorization.png',
      key: 'nodes-color-scale',
    },
    default: {
      header: 'Default (green)',
      text: 'A simple overview of your component hierarchy.',
      img: './images/default-green.png',
    },
  },
  edges: {
    title: 'Edge types',
    text: 'Each edge represents a ”renders” relationship where the source node renders the target node. There are three types of those relationships:',
    default: {
      header: 'Components rendered by default',
      text: 'Dark brown edges denote that these components are always rendered by their parent.',
      img: './images/default.png',
      key: 'default-edges',
    },
    conditional: {
      header: 'Conditionally rendered components',
      text: 'Components rendered conditionally. The conditional types ([IF], [&&], [?:]), as well as the conditions, are shown in the label.',
      img: './images/conditional.png',
    },
    router: {
      header: 'Components rendered by React-Router',
      text: 'Components rendered by react-router-dom. The path is shown in the label.',
      img: './images/router.png',
    },
  },
  pref: {
    title: 'Preferences',
    help: 'Hide Help on Start Up',
    tree: 'Set vertical layout as default',
    key: 'preferences',
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

export const ButtonLabels = {
  vertical: 'Vertical Layout',
  horizontal: 'Horizontal Layout',
  feedback: 'Give feedback',
  bug: 'Submit bug',
  feature: 'Suggest new feature',
  recompile: 'Reset',
  filterReset: 'Reset Filters',
  help: 'Open Help',
  nav: {
    show: 'Show Nav',
    hide: 'Hide Nav',
  },
  map: {
    show: 'Show Map',
    hide: 'Hide Map',
  },
};

export const UrlLabels = {
  feature:
    'https://github.com/react-bratus/react-bratus/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFeature%5D',
  bug: 'https://github.com/react-bratus/react-bratus/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D+',
  feedback:
    'https://github.com/react-bratus/react-bratus/issues/new?assignees=&labels=feedback&template=feedback.md&title=%5BFeedback%5D',
};

export const NavigationLabels = {
  title: 'React-bratus',
  search: {
    title: 'Search for component',
    key: 'search-component',
  },
  node: {
    title: 'Node visualization options',
    key: 'node-visualization',
  },
  actions: {
    title: 'Actions',
    key: 'navigation-actions',
  },
  github: {
    title: 'Contribute',
    key: 'github-actions',
  },
};

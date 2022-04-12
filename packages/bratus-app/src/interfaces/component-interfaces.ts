export interface HelpPanelProps {
  isHelpVisible: boolean;
  setIsHelpVisible: (isHelpVisible: boolean) => void;
  isHelpHiddenOnStartUp: boolean;
  setIsHelpHiddenOnStartUp: (isHelpHiddenOnStartUp: boolean) => void;
  isVerticalTreeLayoutAsDefault: boolean;
  setVerticalTreeLayoutAsDefault: (
    isVerticalTreeLayoutAsDefault: boolean
  ) => void;
}

export interface PreferencesProps {
  isHelpHiddenOnStartUp: boolean;
  setIsHelpHiddenOnStartUp: (isHelpHiddenOnStartUp: boolean) => void;
  isVerticalTreeLayoutAsDefault: boolean;
  setVerticalTreeLayoutAsDefault: (
    isVerticalTreeLayoutAsDefault: boolean
  ) => void;
}

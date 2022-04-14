import React from 'react';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { CheckboxWrapper, VerticalDivider } from '../HelpPanel.sc';
import { HelpPanelLabels } from '../../../utils/constants/constants';
import { PreferencesProps } from '../../../interfaces/component-interfaces';

export const PreferencesSection = ({
  isHelpHiddenOnStartUp,
  setIsHelpHiddenOnStartUp,
  isVerticalTreeLayoutAsDefault,
  setVerticalTreeLayoutAsDefault,
}: PreferencesProps) => {
  return (
    <CheckboxWrapper>
      <Checkbox
        checked={isHelpHiddenOnStartUp}
        onChange={(e) => setIsHelpHiddenOnStartUp(e.target.checked)}
      >
        {HelpPanelLabels.pref.help}
      </Checkbox>
      <VerticalDivider type="vertical" />
      <Checkbox
        checked={isVerticalTreeLayoutAsDefault}
        onChange={(e) => setVerticalTreeLayoutAsDefault(e.target.checked)}
      >
        {HelpPanelLabels.pref.tree}
      </Checkbox>
    </CheckboxWrapper>
  );
};

export default PreferencesSection;

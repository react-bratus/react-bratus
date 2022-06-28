import { Select, Input } from 'antd';
import React, { useContext } from 'react';
import ComponentBackgroundContext from '../../../../contexts/ComponentBackgroundContext';
import {
  BackgroundLabels,
  DropDownLabels,
} from '../../../../utils/constants/constants';
import {
  BaselineInputWrapper,
  DropdownInput,
  StyledDropDownSelect,
} from '../../NavigationPanel.sc';

const NavNodeVisualizationOptions = () => {
  // Getting-Setting the 3 node visualization options through context.
  const { componentBackground, setComponentBackground } = useContext(
    ComponentBackgroundContext
  );

  // Change the lines of code threshold for the color scale visualization option.
  const changeLinesOfCodeThreshold = (e) => {
    if (e.target.value < 1) {
      setComponentBackground({
        ...componentBackground,
        locReference: 1,
      });
    } else {
      setComponentBackground({
        ...componentBackground,
        locReference: e.target.value,
      });
    }
  };

  return (
    <>
      <DropdownInput
        defaultValue={
          !componentBackground.mode
            ? BackgroundLabels.size
            : componentBackground.mode
        }
        onChange={(value) =>
          setComponentBackground({
            ...componentBackground,
            mode: value,
          })
        }
        dropdownStyle={StyledDropDownSelect}
      >
        <Select.Option value={BackgroundLabels.default}>
          {DropDownLabels.default}
        </Select.Option>

        <Select.Option value={BackgroundLabels.size}>
          {DropDownLabels.size}
        </Select.Option>

        <Select.Option value={BackgroundLabels.loc}>
          {DropDownLabels.color}
        </Select.Option>
      </DropdownInput>

      {componentBackground.mode === BackgroundLabels.loc && (
        <BaselineInputWrapper>
          <Input
            addonBefore={'Baseline'}
            placeholder={'LOC Reference'}
            defaultValue={componentBackground.locReference}
            onChange={changeLinesOfCodeThreshold}
            type="number"
            min="1"
          />
        </BaselineInputWrapper>
      )}
    </>
  );
};

export default NavNodeVisualizationOptions;

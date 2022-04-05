import { Select, Input } from 'antd';
import React, { useContext } from 'react';
import ComponentBackgroundContext from '../../../../contexts/ComponentBackgroundContext';
import {
  BaselineInputWrapper,
  DropdownInput,
  StyledDropDownSelect,
} from '../../NavigationPanel.sc';

const NavNodeVisualizationOptions = () => {
  const { componentBackground, setComponentBackground } = useContext(
    ComponentBackgroundContext
  );

  return (
    <>
      <DropdownInput
        defaultValue={
          !componentBackground.mode
            ? 'proportional_size'
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
        <Select.Option value="white">White</Select.Option>

        <Select.Option value="proportional_size">
          Proportional Size based on Lines
        </Select.Option>

        <Select.Option value="loc_reference">
          Colorization based on Lines
        </Select.Option>
      </DropdownInput>

      {componentBackground.mode === 'loc_reference' && (
        <BaselineInputWrapper>
          <Input
            addonBefore={'Baseline'}
            placeholder={'LOC Reference'}
            defaultValue={componentBackground.locReference}
            onChange={(e) => {
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
            }}
            type="number"
            min="1"
          />
        </BaselineInputWrapper>
      )}
    </>
  );
};

export default NavNodeVisualizationOptions;

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useOutsideAlerter } from '../../../hooks/useOutsideAlerter';

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.setisPopoverVisible);

  return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
  setisPopoverVisible: PropTypes.any,
};

export default OutsideAlerter;

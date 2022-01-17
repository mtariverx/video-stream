import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import themeColor from '../../constants/themeColor';


const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: props.color || themeColor["--primary-color"],
    opacity: 0.8,
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)'
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export default class CustomScrollContainer extends Component {
  render() {
    return (
      <Scrollbars
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
        renderThumbHorizontal={() => renderThumb({ color: this.props.color })}
        renderThumbVertical={() => renderThumb({ color: this.props.color })}
        {...this.props}
      />
    )
  }
}

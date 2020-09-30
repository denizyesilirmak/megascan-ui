import React from 'react'

const ResponsiveText = (props) => {
  let fontsize
  if (props.text) {
    if (props.large) {
      fontsize = props.text.length > 10 ? 26 : 28
    } else {
      fontsize = props.text.length > 10 ? 14 : 18
    }
  }
  return (
    <div className="responsive-text" style={{ display: 'inline', fontSize: `${fontsize}px` }}>
      {props.text}
    </div>
  )
}

export default ResponsiveText
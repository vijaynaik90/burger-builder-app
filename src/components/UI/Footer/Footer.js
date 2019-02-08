import React from 'react';
import classes from './Footer.css';
const footer = (props) => (
    <div>
      <div className={classes.phantomStyle} />
      <div className={classes.footerStyle}>{props.children}</div>
    </div>
)

export default footer;
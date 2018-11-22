import React from 'react';

export default function Condition(props) {
  const { condition } = props;
  if (condition) {
    return (
      <>
        {props.children}
      </>
    );
  }
  return null;
}
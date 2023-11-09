import React from 'react'


const Example = props => (
  <div>
    <h3>{props.example.name}</h3>
    <p>{props.example.description}</p>
    <p>{props.example.date.substring(0,10)}</p>
  </div>
);


export default Example;

;

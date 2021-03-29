import React from 'react'

export default function Card(props) {
    const {title, subtitle, cardStyle} = props;
    return (
  <div className={`card ${cardStyle}`}>
  <div className="card-body">
    <h2 className="card-title">{title}</h2> 
     {subtitle}
     <div className="flex justify-center flex-row flex-wrap">{props.children}</div>
  </div>
    </div> 
    )
}

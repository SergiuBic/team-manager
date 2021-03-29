import React from 'react'

export default function Button(props) {
    const {color, content, onClick} = props;
    return (
        <div className={`${color} btn btn-sm`} onClick={onClick}>{content}</div>
    )
}

import React from 'react';
import './ListItem.scss'

interface Props {
    content: string
    style?: React.CSSProperties
}

export function ListItem({ content, style}: Props) {
    return <li style={style} className="list-item">{content}</li>;
}
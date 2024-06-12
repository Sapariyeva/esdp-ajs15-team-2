import { ListItem } from '../ListItem/ListItem';
import './List.scss'

interface Props {
    items: string[]
    style?: React.CSSProperties
}

export function List ({items, style}: Props) {
    return (
        <ul className="list" style={style}>
            {items.map((item, index) => (
                <ListItem key={index} content={item} />
            ))}
        </ul>
    );
}
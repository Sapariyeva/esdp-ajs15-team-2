import { ReactNode } from "react";
import './Modal.scss'

interface Props {
  visible: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  style?: React.CSSProperties
}

export function Modal ({ visible, title, onClose, children, style }: Props) {
  if (!visible) return null;

  return (
    <div className="modal" onClick={onClose} style={style}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
        </div>
        {children}
      </div>
    </div>
  );
}
  
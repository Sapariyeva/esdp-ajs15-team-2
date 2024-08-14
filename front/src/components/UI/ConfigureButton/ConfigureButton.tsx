import './ConfigureButton.css';

interface Props {
  label: string;
  onClick?: () => void;
  isAddButton?: boolean;
  style?: React.CSSProperties
}

export function ConfigureButton({ label, onClick, isAddButton ,style }: Props) {
  return (
    <button style={style} className={`configure-button ${isAddButton ? 'add-button' : ''}`} onClick={onClick}>
      {isAddButton ? <span className="plus-icon">+</span> : label}
    </button>
  );
};


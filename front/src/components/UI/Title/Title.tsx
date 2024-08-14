import  { ReactNode, CSSProperties } from 'react';

interface Props {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

export function Title({ text, level = 1, className, style, children }: Props) {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Heading className={className} style={style}>
      {text}
      {children}
    </Heading>
  );
}

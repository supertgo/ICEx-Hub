import { AnchorHTMLAttributes } from 'react';
import * as S from './LinkText.styles';

export type LinkTextProps = {
  text: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const LinkText = ({ href, text, ...props }: LinkTextProps) => {
  return (
    <S.LinkText {...props} href={href}>
      {text}
    </S.LinkText>
  );
};

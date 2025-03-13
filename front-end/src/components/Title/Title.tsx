import { Hr } from 'components/Hr';
import * as S from './Title.styles';

export type TitleProps = {
	title: string;
	hasBorder?: boolean;
};

export const Title = ({ title, hasBorder = true }: TitleProps) => {
	return (
		<>
			<S.Wrapper>
				<S.Title>{title}</S.Title>
			</S.Wrapper>
			{hasBorder && <Hr />}
		</>
	);
};

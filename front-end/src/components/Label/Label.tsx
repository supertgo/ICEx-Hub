import * as S from './Label.styles';

export type LabelProps = {
	htmlFor?: string;
	labelText: string;
	isRequired?: boolean;
};

export const Label = ({
	htmlFor,
	labelText,
	isRequired = false,
}: LabelProps) => {
	const text = isRequired ? `${labelText}*` : labelText;

	return <S.Wrapper htmlFor={htmlFor}>{text}</S.Wrapper>;
};

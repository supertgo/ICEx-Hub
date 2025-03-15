import { ring } from 'ldrs';
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  useEffect,
} from 'react';
import * as S from './Button.styles';

type ButtonTypes =
	| AnchorHTMLAttributes<HTMLAnchorElement>
	| ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
	size?: 'small' | 'medium';
	fullWidth?: boolean;
	minimal?: boolean;
	icon?: JSX.Element;
	as?: React.ElementType;
	variant?: 'primary' | 'secondary';
	isLoading?: boolean;
} & ButtonTypes;

const Button = forwardRef(
	(
		{
			children,
			icon,
			size = 'medium',
			fullWidth = false,
			minimal = false,
			variant = 'primary',
			isLoading = false,
			...props
		}: ButtonProps,
		ref,
	) => {

		useEffect(() => {
			if (typeof window !== 'undefined') {
				ring.register();
			}
		}, []);

		return (
			<S.Wrapper
				size={size}
				$fullWidth={fullWidth}
				$hasIcon={!!icon}
				$minimal={minimal}
				$variant={variant}
				ref={ref}
				{...props}
			>
				{isLoading ? (
					<l-ring
						size="20"
						stroke="5"
						bg-opacity="0"
						speed="2"
						color="white"
					></l-ring>
				) : (
					<>
						{icon}
						{!!children && <span>{children}</span>}
					</>
				)}
			</S.Wrapper>
		);
	},
);

Button.displayName = 'Button';

export { Button };

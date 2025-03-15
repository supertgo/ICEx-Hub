/* eslint-disable react/display-name */
import {
	ForwardedRef,
	forwardRef,
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

import * as S from './Input.styles';
import { MessageError } from 'components/MessageError';
import { Label } from 'components/Label';

export type InputProps = {
	dataCy?: string;
	label?: string;
	type?: HTMLInputTypeAttribute;
	description?: string;
	error?: FieldError;
	placeholder?: string;
	orientation?: 'vertical' | 'horizontal';
	isDocumentError?: boolean;
	variants?: 'default' | 'primary';
	size?: 'small' | 'large';
	fileSelected?: File | null;
	acceptFile?: string;
	removeFileSelected?: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

const Input = forwardRef(
	(
		{
			label,
			type = 'text',
			description,
			error,
			placeholder = 'Digite',
			value,
			onChange,
			orientation = 'vertical',
			readOnly,
			variants = 'default',
			size = 'large',
			isDocumentError,
			fileSelected,
			removeFileSelected,
			acceptFile,
			dataCy,
			id,
			...inputProps
		}: InputProps,
		ref?: ForwardedRef<HTMLInputElement>,
	) => {
		return (
			<S.InputContainer>
				{!!label && (
					<Label
						htmlFor={id}
						isRequired={inputProps.required}
						labelText={label}
					/>
				)}
				<S.Input
					type={type}
					ref={ref}
					data-cy={dataCy}
					placeholder={placeholder}
					value={value || ''}
					onChange={onChange}
					readOnly={readOnly}
					tabIndex={readOnly ? -1 : 0}
					aria-labelledby={label}
					id={id}
					{...inputProps}
				/>
				{error && <MessageError error={error} />}
			</S.InputContainer>
		);
	},
);

export { Input };

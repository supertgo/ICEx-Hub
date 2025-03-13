import * as S from './LoginForm.styles';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Heading } from 'components/Heading';
import { Controller } from 'react-hook-form';
import { LinkText } from 'components/LinkText';
import { validateInputUserEmail } from 'utils/email';
import { INVALID_EMAIL, REQUIRED_PASSWORD } from 'utils/errors';
import { ForgotPasswordUrl, RegisterUrl } from 'utils/urls';
import { useSignInForm } from './useSignInForm';
import { MaxLength } from 'utils/maxLengths';

export type LoginFormProps = {};

export const LoginForm = ({}: LoginFormProps) => {
	const { control, isLoading, onSubmit, handleSubmit, isValid, errors } =
		useSignInForm();

	return (
		<S.Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
			<Heading variant="h3" text="Entre com a sua conta" />
			<Controller
				rules={{
					required: INVALID_EMAIL,
					validate: validateInputUserEmail,
				}}
				control={control}
				name="email"
				render={({ field: { ...field } }) => (
					<Input
						{...field}
						placeholder="E-mail"
						type="email"
						error={errors.email}
						maxLength={MaxLength.email}
					/>
				)}
			/>
			<Controller
				rules={{
					required: REQUIRED_PASSWORD,
				}}
				control={control}
				name="password"
				render={({ field: { ...field } }) => (
					<Input
						{...field}
						type="password"
						placeholder="Senha"
						error={errors.password}
						maxLength={MaxLength.password}
					/>
				)}
			/>
			<LinkText text="Esqueci minha senha" href={`/${ForgotPasswordUrl}`} />
			<Button
				fullWidth
				type="submit"
				disabled={!isValid || isLoading}
				isLoading={isLoading}
			>
				Entrar
			</Button>
			<S.Text>
				Ainda não tem uma conta?{' '}
				<LinkText text="Faça o seu cadastro" href={`/${RegisterUrl}`} />
			</S.Text>
		</S.Form>
	);
};

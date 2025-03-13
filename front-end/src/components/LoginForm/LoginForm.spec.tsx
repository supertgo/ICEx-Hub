import { render, screen } from 'utils/test/test-utils'
import { LoginForm } from './LoginForm'

describe('<LoginForm />', () => {
  it('should render the component', () => {
    render(
      <LoginForm />
    )

    expect(screen.getByText('Entre com a sua conta')).toBeInTheDocument();
    expect(screen.getByText('Esqueci minha senha')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    expect(screen.getByText('Ainda não tem uma conta?')).toBeInTheDocument();
    expect(screen.getByText('Faça o seu cadastro')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Entrar/i }),
    ).toBeInTheDocument();
  })
})

export const required = (val: string) => !!val || 'Campo é obrigatório';

export const email = (val: string) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || 'Email inválido';
};

export const minLength = (length: number) => (val: string) =>
  val.length >= length || `Must be at least ${length} characters`;

export const passwordMatch = (password: string) => (val: string) =>
  val === password || 'As senhas não são iguais';

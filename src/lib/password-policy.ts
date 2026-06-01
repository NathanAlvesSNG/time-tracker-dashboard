export interface PasswordRequirement {
  label: string;
  met: boolean;
}

export function getPasswordRequirements(password: string): PasswordRequirement[] {
  return [
    { label: "Mínimo de 8 caracteres", met: password.length >= 8 },
    { label: "Pelo menos 1 letra maiúscula", met: /[A-Z]/.test(password) },
    { label: "Pelo menos 1 letra minúscula", met: /[a-z]/.test(password) },
    { label: "Pelo menos 1 número", met: /\d/.test(password) },
    {
      label: "Pelo menos 1 caractere especial",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];
}

export function isPasswordValid(password: string): boolean {
  return getPasswordRequirements(password).every((req) => req.met);
}

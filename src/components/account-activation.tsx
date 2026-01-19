"use client";

import { CheckCircle2, Lock, Mail, XCircle } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createPassword, getUserByEmail } from "@/services/users.service";
import { useRouter } from "next/navigation";

type Step = "email" | "password" | "error";

interface PasswordRequirement {
  label: string;
  met: boolean;
}

export function AccountActivation() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const passwordRequirements: PasswordRequirement[] = [
    { label: "Mínimo de 8 caracteres", met: password.length >= 8 },
    { label: "Pelo menos 1 letra maiúscula", met: /[A-Z]/.test(password) },
    { label: "Pelo menos 1 número", met: /\d/.test(password) },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await getUserByEmail(email);

      console.log(data);

      if (!data.exists) {
        setStep("error");
        return;
      }

      if (data.hasPassword) {
        setError("O email ja possui uma senha cadastrada.");
        return;
      }

      setStep("password");
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao verificar o email. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Por favor, atenda todos os requisitos da senha.");
      return;
    }

    if (!passwordsMatch) {
      setError("As senhas não coincidem.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const data = await createPassword(email, password);

      if (data.success) {
        router.push("/login");
      } else {
        setError(data.error ?? "Ocorreu um erro ao criar a senha.");
      }
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao criar a senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-muted/20 to-muted/50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            🔐 Ativação de Conta
          </CardTitle>
          <CardDescription className="text-base">
            {step === "email" &&
              "Digite seu email com domínio @synergroup.com.br para acessar o dashboard."}
            {step === "password" && "Crie uma senha segura para sua conta."}
            {step === "error" && "Email não encontrado no sistema."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@synergroup.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  className="w-full border"
                  onClick={() => router.push("/login")}
                >
                  Voltar
                </Button>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Verificando...
                  </>
                ) : (
                  "Continuar"
                )}
              </Button>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Digite sua senha novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 rounded-lg bg-muted/50 p-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Requisitos da senha:
                </p>
                <ul className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      {req.met ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span
                        className={
                          req.met ? "text-green-600" : "text-muted-foreground"
                        }
                      >
                        {req.label}
                      </span>
                    </li>
                  ))}
                  {confirmPassword && (
                    <li className="flex items-center gap-2 text-sm">
                      {passwordsMatch ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span
                        className={
                          passwordsMatch
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }
                      >
                        As senhas coincidem
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              {error && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !isPasswordValid || !passwordsMatch}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Criando senha...
                  </>
                ) : (
                  "Criar senha"
                )}
              </Button>
            </form>
          )}

          {step === "error" && (
            <div className="space-y-4">
              <Alert>
                <XCircle className="h-4 w-4" />
                <AlertDescription className="text-sm leading-relaxed">
                  Este email não está cadastrado no sistema. Por favor, entre em
                  contato com o suporte para solicitar acesso.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Button variant="default" className="w-full" asChild>
                  <a href="mailto:atendimento@sng.com.br">
                    Falar com o suporte
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setStep("email");
                    setEmail("");
                    setError("");
                  }}
                >
                  Tentar outro email
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

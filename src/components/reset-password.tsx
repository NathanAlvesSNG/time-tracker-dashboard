"use client";

import { CheckCircle2, Lock, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
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
import {
  getPasswordRequirements,
  isPasswordValid,
} from "@/lib/password-policy";
import {
  completePasswordReset,
  validateRecoveryToken,
} from "@/services/auth-recovery.service";

type ViewState = "loading" | "invalid" | "form" | "success";

export function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [view, setView] = useState<ViewState>("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordRequirements = getPasswordRequirements(password);
  const passwordsMatch =
    password === confirmPassword && confirmPassword !== "";

  useEffect(() => {
    let cancelled = false;

    async function checkToken() {
      if (!token) {
        setView("invalid");
        return;
      }

      try {
        const { valid } = await validateRecoveryToken(token);
        if (!cancelled) {
          setView(valid ? "form" : "invalid");
        }
      } catch {
        if (!cancelled) {
          setView("invalid");
        }
      }
    }

    checkToken();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid(password)) {
      setError("Por favor, atenda todos os requisitos da senha.");
      return;
    }

    if (!passwordsMatch) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      await completePasswordReset(token, password);
      setView("success");
    } catch (err: unknown) {
      const axiosErr = err as {
        response?: { data?: { error?: string } };
      };
      setError(
        axiosErr.response?.data?.error ??
          "Não foi possível redefinir a senha. Tente novamente.",
      );
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
          <CardTitle className="text-2xl font-bold">Redefinir senha</CardTitle>
          <CardDescription className="text-base">
            {view === "loading" && "Validando link de recuperação..."}
            {view === "invalid" &&
              "Este link de recuperação é inválido ou expirou."}
            {view === "form" && "Defina uma nova senha para sua conta."}
            {view === "success" && "Senha atualizada com sucesso."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {view === "loading" && (
            <div className="flex justify-center py-6">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}

          {view === "invalid" && (
            <div className="space-y-4">
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  Este link de recuperação é inválido ou expirou.
                </AlertDescription>
              </Alert>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/forgot-password">Solicitar novo link</Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">Ir para o login</Link>
              </Button>
            </div>
          )}

          {view === "success" && (
            <div className="space-y-4">
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Senha atualizada com sucesso. Você já pode fazer login.
                </AlertDescription>
              </Alert>
              <Button className="w-full" onClick={() => router.push("/login")}>
                Ir para o login
              </Button>
            </div>
          )}

          {view === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua nova senha"
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
                  {passwordRequirements.map((req) => (
                    <li key={req.label} className="flex items-center gap-2 text-sm">
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
                disabled={isLoading || !isPasswordValid(password) || !passwordsMatch}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Salvando...
                  </>
                ) : (
                  "Redefinir senha"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Link from "next/link";

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return alert("Digite um usuário válido");
    }

    try {
      await login(name);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <Card className="w-full max-w-sm shadow-xl p-4 bg-white">
        <CardHeader>
          <CardTitle className="text-center text-[#47A138]">
            Faça seu Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da conta"
              className="border border-[#47A138]"
            />

            <Button colors="outline" text="Entrar" className="!w-full" />
            <Link href="/register" className="text-center text-[#47A138]">
              Criar conta
            </Link>
            <Link href="/" className="text-center text-[#47A138]">
              Voltar
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

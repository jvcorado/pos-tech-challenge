"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    if (!name.trim()) {
      return alert("Digite um nome válido");
    }

    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao registrar.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <Card className="w-full max-w-sm shadow-xl p-4 bg-white">
        <CardHeader>
          <CardTitle className="text-center text-[#47A138]">
            Criar Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Nome da conta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="border border-[#47A138]"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              className="w-full  h-12 bg-transparent border border-[#47A138] text-[#47A138] hover:bg-[#d9f3d542] "
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
            </Button>
            <Link href="/login" className="text-center text-[#47A138]">
              Fazer Login
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

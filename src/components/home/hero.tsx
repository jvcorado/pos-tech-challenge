import Image from 'next/image';
import ilustracao from '../../../public/home/ilustracao.svg';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import Button from "@/components/button";

const benefits = [
    {
        title: "Conta e cartão gratuitos",
        description: "Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.",
        image: "/home/presente.svg",
    },
    {
        title: "Saques sem custo",
        description: "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
        image: "/home/saque.svg",
    },
    {
        title: "Programa de pontos",
        description: "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
        image: "/home/pontos.svg",
    },
    {
        title: "Seguro Dispositivos",
        description: "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
        image: "/home/dispositivos.svg",
    },
]

export default function Hero() {
    return (
        <section className="bg-gradient-to-b from-[#004D61] to-white text-black py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20">
                {/* Lado esquerdo - texto */}
                <div className="text-center md:text-left">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 flex flex-col md:flex-row md:items-center gap-2">
                        Experimente mais liberdade no controle da sua vida financeira.
                        <br className="hidden md:block" />
                        Crie sua conta com a gente!
                    </h1>
                </div>
                {/* Lado direito - imagem */}
                <div className="flex justify-center md:justify-end">
                    <Image
                        src={ilustracao}
                        alt="Pessoa com dinheiro e gráfico"
                        width={420}
                        height={420}
                        className="max-w-[280px] sm:max-w-[340px] md:max-w-full h-auto"
                    />
                </div>
                {/* Botões - visíveis apenas no mobile */}
                <div className="block sm:hidden mt-6 flex justify-center gap-4">
                    <Button colors="black" text="Abrir minha conta" />
                    <Button colors="outline-black" text="Já tenho conta" />
                </div>
            </div>
            <div className="max-w-6xl mx-auto text-center py-12 text-black">
                <h2 className="text-lg sm:text-xl font-bold mb-10">Vantagens do nosso banco:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="text-center">
                            <CardContent className="flex flex-col items-center gap-2 p-4 sm:p-6">
                                <Image
                                    src={benefit.image}
                                    alt={benefit.title}
                                    width={50}
                                    height={50}
                                    className="text-green-600 mb-2"
                                />
                                <CardTitle className="text-md font-bold text-green-600 text-center">{benefit.title}</CardTitle>
                                <CardDescription className="text-sm text-gray-500">{benefit.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
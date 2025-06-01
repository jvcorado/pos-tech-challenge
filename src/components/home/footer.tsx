import { Separator } from "@/components/ui/separator";
import { Instagram, Youtube, MessageCircle, Phone, Mail } from "lucide-react";
import Logo_white from "../../../public/Logo_white.svg";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-black text-white px-6 py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
                {/* Serviços */}
                <div>
                    <h3 className="text-md font-semibold mb-3">Serviços</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>Conta corrente</li>
                        <li>Conta PJ</li>
                        <li>Cartão de crédito</li>
                    </ul>
                </div>
                {/* Contato */}
                <div>
                    <h3 className="text-md font-semibold mb-3">Contato</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li className="flex items-center gap-2">
                            <Phone size={16} /> 0800 004 250 08
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={16} /> <a href="mailto:meajuda@bytebank.com.br">meajuda@bytebank.com.br</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <MessageCircle size={16} /> <a href="mailto:ouvidoria@bytebank.com.br">ouvidoria@bytebank.com.br</a>
                        </li>
                    </ul>
                </div>
                {/* Redes sociais */}
                <div>
                    <h3 className="text-md font-semibold mb-3">Desenvolvido por Alura</h3>
                    <div className="flex flex-col gap-4 mt-2">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={Logo_white} alt="logo branca" width={100} height={22} />
                        </Link>
                        <div className="flex gap-4">
                            <Instagram size={20} className="hover:text-green-500 cursor-pointer" />
                            <MessageCircle size={20} className="hover:text-green-500 cursor-pointer" />
                            <Youtube size={20} className="hover:text-green-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Linha separadora */}
            <div className="mt-8">
                <Separator className="bg-gray-700" />
                <div className="text-center text-gray-500 text-xs mt-4">© 2025 Bytebank. Todos os direitos reservados.</div>
            </div>
        </footer>
    )
}
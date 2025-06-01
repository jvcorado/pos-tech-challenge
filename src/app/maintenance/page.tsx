"use client";

import Menu from "@/components/menu";
import TransactionsSection from "@/views/TransactionsSection";
import { useSearchParams } from "next/navigation";

export default function MaintenancePage() {
    const searchParams = useSearchParams();

    return (

        <div className="flex flex-col lg:flex-row justify-center items-start gap-6 py-6 px-4 w-full  md:h-[calc(100vh_-_6rem)] max-w-screen-xl mx-auto">
            {/* Menu lateral (vira horizontal em telas menores) */}
            <div className="bg-white w-full max-w-[282px] h-full rounded-[8px] hidden lg:block">
                <Menu />
            </div>

            {/* Seção principal */}
            <div className="flex flex-col justify-between h-full flex-1 gap-9 w-full">
                <div className="flex flex-col items-center min-h-screen bg-white rounded-[8px] pt-12 px-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-700">Página em manutenção 🚧</h1>
                    <p className="text-gray-600 text-lg">Estamos trabalhando para melhorar este serviço. <br/>Tente novamente mais tarde.
                    </p>
                </div>

                {/* TransactionsSection em mobile */}
                <div className="block lg:hidden bg-white rounded-[8px] w-full p-4">
                    <TransactionsSection />
                </div>
            </div>

            {/* TransactionsSection fixo em desktop */}
            <div className="hidden lg:block bg-white  w-full max-w-[282px] h-full rounded-[8px] p-4">
                <TransactionsSection />
            </div>
        </div>
    );
}

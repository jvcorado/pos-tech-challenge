"use client";

import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { useBank } from "@/context/BankContext";
import { TransactionType } from "@/models/TransactionType";
import { Transaction } from "@/models/Transaction";

import Transacaobg2 from "@/assets/illustrations/Transacaobg2";
import Transacaobg3 from "@/assets/illustrations/Transacaobg3";
import Transacaobg1 from "@/assets/illustrations/Transacaobg1";
import IconeSeta from "@/assets/illustrations/IconeSeta";

const tipos: { label: string; value: TransactionType }[] = [
  { label: "DOC/TED", value: TransactionType.EXPENSE },
  { label: "Pagamento de Boleto", value: TransactionType.EXPENSE },
  { label: "Câmbio de Moeda", value: TransactionType.INCOME },
  { label: "Empréstimo e Financiamento", value: TransactionType.INCOME },
  { label: "Depósito", value: TransactionType.INCOME },
  { label: "Transferencia", value: TransactionType.EXPENSE },
];

export default function NewTransactions() {
  //const [valor, setValor] = useState('');
  const [data, setData] = useState("");
  const [selected, setSelected] = useState<(typeof tipos)[0] | null>(null);

  const { addTransaction, refresh } = useBank();

  const [type, setType] = useState<TransactionType>(TransactionType.INCOME);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState("");

  const formatarValor = (valor: string) => {
    // Remove tudo que não for número
    const somenteNumeros = valor.replace(/\D/g, ".");

    // Converte para float com duas casas decimais
    const numero = (parseFloat(somenteNumeros) / 100).toFixed(2);
    return numero.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    const hoje = new Date();
    const formatada = hoje.toISOString().split("T")[0];
    setData(formatada);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //const parsedAmount = parseFloat(amount.replace(",", "."));
    const parsedAmount = parseFloat((Number(amount) / 100).toFixed(2));
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Valor inválido.");
      return;
    }

    try {
      setError(null);
      const tx = new Transaction(
        "Nova transação: " + selected?.label,
        parsedAmount,
        type,
        undefined,
        new Date(data)
      );
      await addTransaction(tx);
      setAmount(""); // limpa campo
      setType(selected?.value as TransactionType); // opcional
      refresh(); //
      setMensagem("Transação concluída com sucesso!");
      setTimeout(() => setMensagem(""), 20000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  }

  console.log(type, "type");

  return (
    <div className="w-full gap-6 bg-[#CBCBCB] flex flex-col rounded-md relative">
      <div className="absolute top-0 left-0 md:left-auto md:right-0 h-[142px] w-[142px] md:h-[177px] md:w-[180px]">
        <Transacaobg2 className="w-full h-full" />
      </div>

      <h2 className="relative pt-4 text-[25px] sm:text-[22px] md:text-[25px] font-bold text-white z-10 sm:text-left ml-4 sm:ml-8 md:ml-16">
        Nova transação
      </h2>

      <form
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        className="relative min-h-[402px] flex flex-col z-10 "
      >
        {/* Tipo de transação */}
        <div className="z-10 relative pt-5 rounded-md ml-4 sm:ml-8 md:ml-16">
          <Listbox
            value={selected}
            onChange={(value) => {
              setSelected(value);
              setType(value?.value as TransactionType);
            }}
          >
            {() => (
              <div className="relative">
                <Listbox.Button className="w-full max-w-[355px] z-10 min-h-[48px] border border-[#004D61] rounded-lg bg-white text-[#444444] px-4 py-2 text-base flex items-center justify-between">
                  <span className="truncate">
                    {selected
                      ? selected.label
                      : "Selecione o tipo de transação"}
                  </span>
                  <IconeSeta />
                </Listbox.Button>

                <Listbox.Options className="w-full max-w-[355px] absolute mt-1 border rounded-lg border-[#004D61] bg-white shadow-md text-start text-base z-10">
                  {tipos.map((tipo) => (
                    <Listbox.Option
                      key={`${tipo.label}-${tipo.value}`}
                      value={tipo}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${
                          active
                            ? "bg-[#E4EDE3] text-black rounded-lg"
                            : "text-[#444444]"
                        }`
                      }
                    >
                      {tipo.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
          <input
            type="hidden"
            name="tipoTransacao"
            value={selected?.value || ""}
          />
        </div>

        {/* valor */}
        <div className="relative pt-4 ml-4 sm:ml-8 md:ml-16 w-full max-w-[250px]">
          <label
            htmlFor="valor"
            className="block font-medium mb-1 text-white text-base"
          >
            Valor:
          </label>
          <input
            type="text"
            id="valor"
            name="valor"
            required
            placeholder="R$ 0,00"
            className="w-full min-h-[48px] border border-[#004D61] bg-white text-[#444444] text-center rounded-lg text-base"
            value={amount ? `R$ ${formatarValor(amount)}` : ""}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, "");
              setAmount(rawValue);
            }}
          />
        </div>
        {/* data */}
        <div className="relative pt-4 ml-4 sm:ml-8 md:ml-16">
          <label
            htmlFor="data"
            className="block font-medium mb-1 text-white text-base"
          >
            Data:
          </label>
          <input
            type="date"
            id="data"
            name="data"
            required
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full z-10 max-w-[250px] min-h-[48px] border border-[#004D61] bg-white text-[#444444] rounded-lg py-2 px-2 text-base"
          />
        </div>

        <div className="pt-8 ml-4 sm:ml-8 md:ml-16 w-full flex justify-start z-8">
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full max-w-[250px] min-h-[48px] bg-[#004D61] text-white rounded-lg font-bold cursor-pointer border-none hover:bg-[#3e8698] transition-colors duration-200 ml-0 "
          >
            Concluir transação
          </button>
        </div>
        {mensagem && (
          <div className="ml-4 sm:ml-8 md:ml-16 mt-4 px-4 py-2 z-10 bg-green-500 text-white rounded-md text-sm w-fit">
            {mensagem}
          </div>
        )}
      </form>
      <div className="absolute bottom-0 right-0 md:right-auto md:left-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[142px] md:h-[142px] lg:w-[177px] lg:h-[177px] max-w-full overflow-hidden">
        <Transacaobg1 className="w-full h-full object-contain" />
      </div>

      <div className="bottom-4 right-0 max-w-full lg:hidden z-10 items-center">
        <Transacaobg3 className="w-[100px] h-[100px] sm:w-[120px] right-0 sm:h-[120px] items-center object-contain z-10 lg:hidden" />
      </div>
    </div>
  );
}

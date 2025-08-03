"use client";


import "svg2pdf.js";
import { useEffect, useRef, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { useBank } from "@/context/BankContext";
import { Transaction } from "@/models/Transaction";
import { formatCurrencyBRL } from "@/lib/formatCurrency";
import { toPng } from 'html-to-image';
import DatePicker from "react-datepicker";
import { Download } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import "svg2pdf.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCalendarAlt, faReceipt, faRocket } from '@fortawesome/free-solid-svg-icons';
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";




type ChartItem = {
  name: string;
  value: number;
  type: string;
};

export default function FinanceChart() {

  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const [valor, setValor] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { account } = useBank();
  const [data, setData] = useState<ChartItem[]>([]);
  const [categoryColors, setCategoryColors] = useState<Record<string, string>>({});
  const chartRef = useRef<HTMLDivElement>(null);
  // const screenWidth = useWindowSize();
  //const isMobile = screenWidth < 640;
  const isMobile = useIsMobile();
  const outerRadius = isMobile ? 100 : 140;
  const innerRadius = isMobile ? 70 : 100;



  const generateColorByIndex = (index: number, total: number) => {
    const hue = Math.floor((360 / total) * index);
    return `hsl(${hue}, 90%, 30%)`;
  };
  const exportarPDF = () => {
    const graficoElement = document.getElementById("grafico");

    if (!graficoElement) {
      alert("Gráfico não encontrado.");
      return;
    }

    toPng(graficoElement, {
      cacheBust: true,
      backgroundColor: "#ffffff", // evita fundo transparente
    })
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;

        img.onload = () => {
          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: [img.width, img.height],
          });

          pdf.addImage(img, "PNG", 0, 0, img.width, img.height);
          pdf.save("grafico.pdf");
        };
      })
      .catch((error) => {
        console.error("Erro ao gerar imagem:", error);
        alert("Erro ao exportar gráfico. Verifique o console.");
      });
  };


  const formatarValor = (valor: string) => {
    // Remove tudo que não for número
    const somenteNumeros = valor.replace(/\D/g, ".");

    // Converte para float com duas casas decimais
    const numero = (parseFloat(somenteNumeros) / 100).toFixed(2);
    return numero.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getDicaFinanceira = (gasto: number, meta: number) => {


    //if (!meta || isNaN(meta)) return null;
    if (!gasto || !meta || isNaN(gasto) || isNaN(meta)) {
      return "ℹ️ Para receber dicas personalizadas, preencha sua meta de gastos mensais.";
    }

    const percentual = (gasto / meta) * 100;
    //if (percentual == undefined) return "Preencha aqui💰\nQue tal investir a diferença ou reforçar sua reserva? 📈";
    if (percentual < 80) return "✅ Ótimo trabalho! Seus gastos estão bem controlados. \n💰Que tal investir a diferença ou reforçar sua reserva? 📈"
    if (percentual < 100) return "⚠️ Atenção! Você está se aproximando da meta. \n👀Reveja gastos com delivery, lazer ou compras. 📊";
    return "🚨 Alerta! Você ultrapassou a meta. \n⛔Tente evitar gastos não essenciais e reequilibrar o orçamento. 🧮";

  };

  const getClasseDeEstilo = (gasto: number, meta: number) => {
    if (!gasto || !meta || isNaN(gasto) || isNaN(meta)) {
      return {
        bg: "bg-blue-50",
        text: "text-blue-800",
        border: "border-blue-300",
      };
    }
    const porcentagem = (gasto / meta) * 100;

    const estilos = [
      { min: 0, max: 50, bg: "bg-green-50", text: "text-green-800", border: "border-green-300" },
      { min: 50, max: 100, bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-300" },
      { min: 100, max: Infinity, bg: "bg-red-50", text: "text-red-800", border: "border-red-300" },
    ];

    return estilos.find(({ min, max }) => porcentagem >= min && porcentagem < max)!;
  };
  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      function handleResize() {
        setIsMobile(window.innerWidth < 640);
      }
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
  }

  useEffect(() => {

    async function fetchData() {

      if (!account) return;

      const category: Transaction[] =
        await account.getExpensesByCategoryForMonth?.(month, year);
      const chartData = category
        .map(tx => ({
          name: tx.description.split(":")[1]?.trim() || "Sem descrição",
          value: tx.amount,
          type: tx.type,

        }));
      setCategoryColors((prev) => {
        const newColors = { ...prev };
        chartData.forEach((item, idx) => {

          if (!newColors[item.name]) {
            newColors[item.name] = generateColorByIndex(idx, chartData.length);
          }
        });
        return newColors;
      });

      setData(chartData);
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      setMonthlyTotal(total);
    };

    fetchData();

  }, [account, month, year]);
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (

    <div className="w-full flex justify-center">
      <div className="w-full max-w-[90%] flex flex-col justify-center">
        <h1
          className="w-full sm:text-2xl md:text-2xl lg:text-2xl font-extrabold tracking-tight px-4 py-6
          text-slate-800 bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-lg rounded-lg
          flex justify-center items-center text-center"
        >
          <FontAwesomeIcon
            icon={faChartLine}
            className="text-blue-600 mr-4 animate-bounce"
          />
          Painel Financeiro
        </h1>
        <div className="grid z-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          <div className="flex min-w-full sm:min-w-[300px] flex-col justify-center bg-white border border-gray-200 p-4 rounded-xl shadow-md text-center transition duration-300 hover:scale-105 hover:shadow-lg">
            <label
              className="text-gray-500 text-2xl font-semibold whitespace-nowrap flex justify-center items-center gap-2"
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="text-3xl text-[#004D61]"
              />
              Filtrar: mês e o ano
            </label>

            <div className="relative text-2xl sm:text-3xl">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => {
                  if (!date) return;
                  setSelectedDate(date);
                  setMonth(date.getMonth() + 1);
                  setYear(date.getFullYear());
                }}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="border border-gray-300 text-2xl font-semibold rounded-lg px-4 py-2 w-full max-w-xs text-center focus:outline-none focus:ring-2 focus:ring-[#004D61]"
                placeholderText="MM/AAAA"
                aria-label="Selecionar mês e ano"
                popperPlacement="bottom-start"
                popperClassName="!z-[9999]"
                portalId="root-portal"
              />
            </div>
          </div>

          <div className="flex min-w-full sm:min-w-[300px] flex-col justify-center bg-white border border-gray-200 p-4 rounded-xl shadow-md text-center transition duration-300 hover:scale-105 hover:shadow-lg">
            <h2
              className="text-gray-500 text-2xl font-semibold whitespace-nowrap flex justify-center items-center gap-2"
            >
              <FontAwesomeIcon
                icon={faReceipt}
                className="text-red-800 text-3xl"
              />
              Gastos do mês
            </h2>
            <p className="text-3xl font-bold text-red-500 w-full min-h-[48px] px-4">
              {monthlyTotal !== null
                ? formatCurrencyBRL(monthlyTotal)
                : "Carregando..."}
            </p>
          </div>

          <div className="flex min-w-full sm:min-w-[300px] flex-col justify-center bg-white border border-gray-200 p-4 rounded-xl shadow-md text-center transition duration-300 hover:scale-105 hover:shadow-lg">
            <label
              htmlFor="valor"
              className="text-gray-500 text-2xl font-semibold whitespace-nowrap flex justify-center items-center gap-2"
            >
              <FontAwesomeIcon
                icon={faRocket}
                className="text-blue-600 text-3xl"
              />
              Meta mensal
            </label>
            <input
              type="text"
              id="valor"
              name="valor"
              required
              placeholder="Digite sua meta de economia"
              className="w-full min-h-[48px] text-2xl bg-white text-[#444444] text-center rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#004D61] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={valor ? `R$ ${formatarValor(valor)}` : ""}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                setValor(rawValue);
              }}
            />
          </div>
        </div>


        <div aria-label={`Gráfico de pizza mostrando a distribuição financeira de ${month}/${year}`} className="flex flex-col min-h-screen bg-gray-50 p-4">
          <div id="grafico" ref={chartRef}>
            <h2 className="text-3xl font-bold mb-2 text-center mt-5">
              Distribuição Financeira
            </h2>
            {/* Texto acessível para leitores de tela */}
            <p className="sr-only">
              Este gráfico mostra a distribuição de gastos do mês {month}/{year}.{" "}
              {data.map(d => `${d.name} com R$ ${d.value.toFixed(2)}`).join(", ")}.
              Total do mês: R$ {monthlyTotal.toFixed(2)}.
            </p>
            <div
              className="mt-6 px-4 sm:px-6 py-5 rounded-2xl shadow-md border-l-4 border-blue-500 bg-blue-50
             max-w-full sm:max-w-2xl mx-auto break-words"
            >
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                💬 Dica do mês
              </h2>
              {!valor || isNaN(monthlyTotal) || isNaN(parseFloat(valor)) ? (
                <div
                  className="text-[1.375rem] px-4 py-4 rounded-xl font-medium border border-b-indigo-200
                 bg-yellow-50 text-yellow-800 flex items-center gap-2 shadow-sm break-words"
                  style={{ wordBreak: "break-word" }}
                >
                  ℹ️ Para receber dicas personalizadas, preencha sua meta de gastos mensais.
                </div>
              ) : (
                (() => {
                  const meta = parseFloat(valor) / 100;
                  const estilo = getClasseDeEstilo(monthlyTotal, meta) || {
                    bg: "bg-gray-100",
                    text: "text-gray-800",
                    border: "border-gray-200",
                  };
                  const { bg, text, border } = estilo;
                  const dica = getDicaFinanceira(monthlyTotal, meta)?.toString() || "";
                  return (
                    <div
                      className={`px-4 py-4 text-[1.375rem] rounded-xl font-medium border shadow-sm ${bg} ${text} ${border} break-words`}
                      style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
                    >
                      {dica}
                    </div>
                  );
                })()
              )}
            </div>

            <div className="h-[70vh] flex items-center justify-center">
              {data.length === 0 ? ( // ⬅️ Adição
                <div className="text-center text-gray-500 text-xl italic">
                  📭 Nenhum gasto registrado neste mês.
                </div>
              ) : ( // ⬅️ Adição
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={outerRadius}
                      innerRadius={innerRadius}
                      paddingAngle={4}
                      startAngle={360}
                      endAngle={0}
                      isAnimationActive={true}
                      animationDuration={1200}
                      animationEasing="ease-in-out"
                      className="text-[10px] sm:text-[14px] font-semibold"
                      label={({ name, value }) =>

                        isMobile
                          ? `${(((value ?? total) / total) * 100).toFixed(0)}%`
                          : `${name.split(":")[1]?.trim() ?? name}: ${(((value ?? total) / total) * 100).toFixed(0)}%`
                      }
                      labelLine={false}

                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={categoryColors[entry.name] ?? "#ccc"}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const { name, value } = payload[0];
                          return (
                            <div className="bg-white shadow px-4 py-2 rounded text-base border border-gray-200">
                              <strong className="text-[16px]">{name}</strong>:{" "}
                              <span className="text-[16px] text-gray-700">
                                R$ {value.toLocaleString("pt-BR")}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      content={({ payload }) => (
                        <div className="w-full px-4 mt-6">
                          <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center text-base md:text-lg font-medium border border-gray-200 shadow rounded-xl p-4">
                            {payload?.map((entry, index) => (
                              <li key={`item-${index}`} className="flex items-center gap-2">
                                <span
                                  className="inline-block w-4 h-4 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                ></span>
                                <span className="truncate">{entry.value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10 mb-6">
          <button
            onClick={exportarPDF}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-500 hover:brightness-110 shadow-lg transition duration-300"
          >
            <ArrowDownTrayIcon className="w-6 h-6" />
            Baixar Gráfico em PDF
          </button>
        </div>

      </div>
    </div>
  )

};
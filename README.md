# 💸 Projeto de Gerenciamento Financeiro

Este é um projeto de gerenciamento financeiro desenvolvido com **Next.js** e **TypeScript**, utilizando a biblioteca de componentes **shadcn/ui** para a construção da interface. A aplicação permite o controle de transações financeiras com uma estrutura organizada e foco em responsividade.

---

## 🧱 Tecnologias Utilizadas

- **Next.js 14** (App Router)
- **TypeScript**
- **shadcn/ui** (baseada em Radix UI e TailwindCSS)
- **POO (Programação Orientada a Objetos)** com separação em `models/` e `services/`
- **json-server** para simular uma API RESTful
- **Lucide Icons** para os ícones da interface
- **React Number Format** para formatação de valores

---

## 🗂️ Estrutura do Projeto

- `models/`: contém as classes como `Transaction`, `Account`, etc., seguindo princípios de POO.
- `services/`: responsável pela comunicação com a API do `json-server` (ex: buscar, criar, editar e deletar transações).
- `context/`: gerenciamento global de estado com React Context API.
- `components/`: componentes reutilizáveis da interface como botões, inputs e itens de transações.
- `views/`: contém as **telas completas da aplicação**, compostas por componentes e organizadas por páginas ou seções (ex: Dashboard, Extrato, Menu).
- `app/`: estrutura de rotas do Next.js com páginas como `dashboard`, `manutencao`, etc.

---

## 🔒 Página de Login

Neste primeiro momento, a autenticação de usuários **não é obrigatória**. Foi criada uma página de login **simples**, com o objetivo de manter a estrutura organizada e pronta para evoluções futuras.

---

## 📱 Responsividade

O projeto foi desenvolvido com foco em **responsividade**, garantindo uma boa experiência tanto em dispositivos desktop quanto móveis.

---

## ▶️ Como Rodar o Projeto em Desenvolvimento

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/jvcorado/pos-tech-challenge.git
cd pos-tech-challenge
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Rode o projeto
```bash
npm run dev
```
Esse comando inicia **simultaneamente**:
- O servidor de desenvolvimento do Next.js [http://localhost:3000]
- O json-server para a API fake [http://localhost:3001]

## Considerações Finais
Este projeto foi desenvolvido para a pós-graduação. O grupo focou em organização, separação de responsabilidades e estrutura escalável. Nele, podemos:
- Aprender sobre POO no frontend com TypeScript;
- Entender como integrar o json-server em projetos React/Next.js;
- Praticar a criação de componentes reutilizáveis com shadcn/ui;
- Estruturar projetos pensando em expansão futura (ex: autenticação, dashboards mais complexos, integrações reais com banco de dados).
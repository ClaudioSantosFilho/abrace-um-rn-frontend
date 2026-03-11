# 🌸 Abrace um RN

**Abrace um RN** é um projeto social idealizado por **Joseane Cavalcante** com o propósito de combater o abandono infantil através da solidariedade. O site foi desenvolvido para divulgar a iniciativa e facilitar o apoio a mães em situação de vulnerabilidade, oferecendo dignidade, cuidado e amor aos recém-nascidos por meio da entrega de kits de enxoval e outras ações voluntárias.

## 💖 Sobre o Projeto

> “Nossa missão é combater o abandono infantil causado pela falta de recursos para itens básicos de enxoval. Apoiamos mães em situações de vulnerabilidade, oferecendo kits de enxoval que proporcionam dignidade, cuidado e amor aos recém-nascidos. Com esses gestos, buscamos manter as famílias unidas, oferecendo esperança em momentos de grande dificuldade.”

A inspiração para o projeto nasceu da jornada espiritual de Joseane em busca de um propósito maior, transformando fé em ação concreta. O projeto também conta com o apoio do **Projeto Kairós**, que arrecada fundos através da venda de protetores de porta e produtos personalizados.

---

## ✨ Como Ajudar

### Seja um voluntário!

Faça parte da mudança e contribua com o Projeto Abrace um Recém-Nascido! Há diversas formas de se envolver:

* 🚗 **Recolhimento de doações**: Tem carro? Ajude na coleta!
* 🧵 **Oficinas**: Ensine costura, crochê, laços ou outras habilidades.
* 💬 **Apoio psicológico**: Ofereça escuta e suporte emocional às mães.

📌 Para se tornar um doador, acesse a página Voluntarie-se no site do Abrace um RN e preencha o formulário.

---

## 📂 Arquitetura e Estrutura de Pastas

O frontend do projeto foi modernizado e refatorado utilizando princípios de **Atomic Design** (para componentização e CSS) e o padrão **MVVM** (Model-View-ViewModel para separação lógica e controle de estado em JavaScript Vanilla).

### Estrutura da Pasta `src`

A pasta `src` contém todos os recursos estáticos, de estilo e scripts organizados de forma modular:

```text
src/
├── assets/        # Imagens, ilustrações e ícones separados por contexto (galeria, home, shared, etc)
├── components/    # Componentes visuais modulares (Web Components Vanilla) baseados no Atomic Design
│   ├── atoms/     # Elementos únicos e indivisíveis (ex: <app-button> - botões personalizados)
│   ├── molecules/ # Combinação de átomos (ex: <social-links>, <product-card>, <form-field>)
│   └── organisms/ # Seções completas formadas por átomos e moléculas (ex: <app-header>, <app-footer>, <product-modal>)
├── js/            # Scripts de configuração global (ex: registro unificado de componentes em custom-elements.js)
├── pages/         # Estilos (CSS) e lógica (JS) encapsulados por página
│   ├── home/      # Ex: home.css (estilos da tela), home-model.js (dados), home-viewmodel.js (eventos da DOM)
│   ├── lojinha/   # Regras de negócio de produtos, busca e interações da lojinha
│   ├── voluntaria-se/
│   └── ...        
├── utils/         # Scripts e ferramentas Node.js utilitárias usadas para organizar e refatorar arquivos (ex: fix_paths.js)
└── shared/        # Arquivos globais para todo o projeto
    └── css/       # reset.css e globals.css (variáveis CSS de cores, fontes, utilitários, responsividade base)
```

### 🧩 Como os Componentes (Web Components) Funcionam
Graças à adoção do **Atomic Design** com Custom Elements nativos do HTML5, componentes repetitivos foram extraídos para diretórios próprios. Por exemplo, em vez de repetir classes do Bootstrap espalhadas pelos arquivos, nós usamos tags diretas:
* Ao invés de usar `<div>` ou `<a>` complexas, utiliza-se `<app-button variant="rosa-escuro">Ajudar</app-button>`.
* Em vez de dezenas de linhas de CSS jogados na raiz do projeto, o `<app-header>` domina o topo encapsulando sua própria lógica e HTML interno.
Isso deixa os arquivos HTML na raiz limpos ("declarativos") e com manutenção descentralizada.

---

## 🌐 Páginas do Site

### `index.html` – Página Inicial

Apresenta a missão do projeto, formas de contribuição e histórias reais de mães ajudadas. Inclui botões de ajuda, galeria de bebês beneficiados e acesso rápido às redes sociais.

### `sobre.html` – Sobre o Projeto

Conta a origem do projeto, trajetória da fundadora Joseane, e o impacto do **Projeto Kairós** nas arrecadações e na construção de kits.

### `lojinha.html` – Lojinha Solidária

Produtos personalizados com renda revertida para o projeto:

* Canecas, copos térmicos, camisas, necessaires, marcadores de página, entre outros.
* Cada compra ajuda diretamente uma mãe e seu bebê!

### `receber.html` – Solicitação de Ajuda

Formulário para mães em situação de vulnerabilidade solicitarem ajuda, contando suas histórias e necessidades para receberem kits.

### `voluntaria-se.html` – Seja Voluntário

Formulário completo para pessoas que desejam contribuir com tempo, conhecimento ou recursos.

### `galeria.html` – Galeria de Ações

Fotos das entregas, eventos, workshops e voluntários em ação. Mostra o impacto real da solidariedade.

### `doar.inicial.html` – Formas de Doar

Explica as diferentes maneiras de contribuir:

* Doação em dinheiro (com chave PIX)
* Doação de itens usados
* Compras na lojinha

### `doar-usados.html` – Doação de Usados

Informa sobre os pontos de coleta de roupas, brinquedos e outros itens infantis.

### `doar-dinheiro.html` – Doação em Dinheiro

Apresenta os benefícios da sua contribuição com metas, itens dos kits e despesas cobertas.

---

## 📦 Tecnologias Utilizadas

* HTML
* CSS
* JavaScript
* Design responsivo
* Organização de páginas com foco em acessibilidade e clareza

---

## 📲 Contato e Redes Sociais

Siga e apoie o projeto também nas redes sociais:

* [Instagram](https://www.instagram.com/abraceumrn/)
* [WhatsApp](https://wa.me/5583987075415)

---

## 🤝 Agradecimentos

A todas as mãos que ajudam a abraçar, acolher e transformam a vida de muitas pessoas. Cada gesto de amor faz a diferença.
**“Abrace um RN” é mais do que um projeto, é um chamado ao cuidado e à empatia.**

---

## 🚀 Como Executar o Projeto Localmente

Como o projeto utiliza funcionalidades modernas do JavaScript, especificamente **ES Modules** (como `<script type="module">` e sintaxe `import/export`), a aplicação **não vai funcionar se você abrir o arquivo `index.html` diretamente** com dois cliques. O seu navegador bloqueará os scripts por políticas de segurança (CORS).

Para rodar o projeto corretamente, você deve servir a pasta através de um **Servidor Local (Web Server)**. Abaixo estão as três formas mais simples de fazer isso:

### Opção 1: Via VS Code (Recomendada)
1. No Visual Studio Code, vá na aba de Extensões e instale o **Live Server** (Extensão do Ritwick Dey).
2. Abra a pasta raiz deste projeto no VS Code.
3. Clique com o botão direito do mouse no arquivo `index.html` e escolha a opção **"Open with Live Server"** (ou clique no "Go Live" no rodapé direito).
4. O navegador abrirá a tela automaticamente (Geralmente em `http://127.0.0.1:5500`).

### Opção 2: Via Node.js (`npx`)
Se você possui o Node.js instalado no seu computador:
1. Abra o terminal na pasta raiz do projeto.
2. Digite o comando: `npx serve .`
3. Acesse a URL que ele gerar no terminal (Normalmente `http://localhost:3000`).

### Opção 3: Via Python
Se você possui Python3 instalado:
1. Abra o terminal na pasta raiz do projeto.
2. Digite o comando: `python -m http.server 8000`
3. Pelo navegador, acesse: `http://localhost:8000`.

---

## 🔽 Como clonar este projeto

Para clonar e utilizar este repositório em sua máquina local, siga os passos abaixo:

### 1. Clone este repositório
git clone https://github.com/ClaudioSantosFilho/abrace-um-rn-frontend.git

### 2. Acesse a pasta do projeto
cd abrace-um-rn-frontend

--- 

## 🤝 Créditos:

### Professora: 

- [Roberta Ribeiro Guedes Pereira]() 

### Equipe responsável pelo projeto atualmente 2026.01:

- [Alef Emauel Marques Verissimo](https://github.com/Destroier650)
- [Claudio Alves dos Santos Filho](https://github.com/ClaudioSantosFilho)
- [Gabriel Barbosa Claudino]()
- [Gilberto Henriques da Fonseca Segundo](https://github.com/Sircrawler)
- [Jeferson Thiago Felix do Nascimento](https://github.com/Jeffersonthiagofn)
- [Mateus Dantas de Oliveira](https://github.com/MateusDantas123)
- [Nikson Gabriel Santos Silva](https://github.com/Nikson-silva)
- [Thomas Arlles da Silva](https://github.com/Thomasarlles)

### Equipe responsável por dar ínicio ao projeto Abrace um RN: 
- [Amxdiogo](https://github.com/amxdiogo)
- [kcaiosouza](https://github.com/kcaiosouza)
- [Lorran-Kaio](https://github.com/Lorran-Kaio)
- [LuizAlbar](https://github.com/LuizAlbar)
- [MartinelliCHS](https://github.com/MartinelliCHS)
- [raiane-oliveira](https://github.com/raiane-oliveira)

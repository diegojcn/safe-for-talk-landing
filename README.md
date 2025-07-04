# Safe 4 Talk - Landing Page

Uma landing page moderna e interativa para o Safe 4 Talk, plataforma de prática de inglês em ambiente seguro.

## 🚀 Tecnologias Utilizadas

- [Vite](https://vite.dev/) - Build tool moderna e rápida para desenvolvimento web
- [React](https://react.dev/) - Biblioteca JavaScript para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first para design responsivo
- [shadcn/ui](https://ui.shadcn.com/) - Biblioteca de componentes reutilizáveis e acessíveis
- [Framer Motion](https://motion.dev/) - Biblioteca para animações em React
- [pnpm](https://pnpm.io/) - Gerenciador de pacotes rápido e eficiente

## 📦 Instalação do pnpm

O método mais recomendado para instalar o pnpm é através do npm:

```bash
npm install -g pnpm
```

Alternativamente, você pode usar outros métodos:

```bash
# Usando curl (Linux/macOS)
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Usando wget
wget -qO- https://get.pnpm.io/install.sh | sh -

# Usando PowerShell (Windows)
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

Após a instalação, você pode verificar se o pnpm foi instalado corretamente com:

```bash
pnpm --version
```

## 🛠️ Configuração do Projeto

1. Instale as dependências:
```bash
pnpm install
```

2. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

3. Acesse o projeto em `http://localhost:5173`

## 📦 Estrutura do Projeto

```
src/
├── components/     # Componentes React
├── lib/           # Utilitários e configurações
├── assets/        # Recursos estáticos
└── App.tsx        # Componente principal
```

## 🎨 Design System

O projeto utiliza o shadcn/ui como base para o design system, oferecendo:
- Componentes acessíveis e reutilizáveis
- Design consistente e moderno
- Personalização através do Tailwind CSS

## ✨ Animações

As animações são implementadas usando Framer Motion, proporcionando:
- Transições suaves entre estados
- Animações de entrada e saída
- Interações responsivas
- Efeitos de hover e scroll

## 🚀 Performance

O Vite oferece:
- Hot Module Replacement (HMR) instantâneo
- Build otimizado para produção
- Suporte nativo a TypeScript
- Servidor de desenvolvimento ultra-rápido

## 📱 Responsividade

A landing page é totalmente responsiva, adaptando-se a diferentes tamanhos de tela graças ao Tailwind CSS.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia o guia de contribuição antes de submeter pull requests.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
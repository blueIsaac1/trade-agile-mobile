# Trade Agile Mobile

O **Trade Agile Mobile** é um aplicativo móvel desenvolvido com React Native. Este projeto tem como objetivo fornecer uma plataforma para o gerenciamento ágil de negociações e projetos.

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:

- Node.js (v14 ou superior)
- Yarn ou npm
- Expo CLI (para desenvolvimento com Expo, se aplicável)
- Android Studio ou Xcode (para desenvolvimento nativo)

## Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/blueIsaac1/trade-agile-mobile.git
    cd trade-agile-mobile
    ```

2. **Instale as dependências:**

    Com **Yarn**:

    ```bash
    yarn install
    ```

    Ou com **npm**:

    ```bash
    npm install
    ```

## Execução

1. **Para iniciar o projeto com Expo (se aplicável):**

    ```bash
    expo start
    ```

    Isso abrirá o Expo DevTools no seu navegador e permitirá que você inicie o aplicativo em um emulador ou dispositivo físico.

2. **Para iniciar o projeto sem Expo:**

    - **Para Android:**

        Certifique-se de que o Android Studio está configurado e em execução. Em seguida, execute:

        ```bash
        npx react-native run-android
        ```

    - **Para iOS:**

        No macOS, certifique-se de que o Xcode está instalado. Em seguida, execute:

        ```bash
        npx react-native run-ios
        ```

## Estrutura do Projeto

- `App.js`: O ponto de entrada principal do aplicativo.
- `src/`: Contém a maioria dos arquivos de código-fonte do aplicativo.
  - `components/`: Componentes React reutilizáveis.
  - `screens/`: Telas do aplicativo.
  - `services/`: Serviços e APIs.
  - `styles/`: Arquivos de estilos e temas.
- `assets/`: Recursos estáticos como imagens e fontes.
- `package.json`: Arquivo de configuração do projeto e dependências.
- `babel.config.js`: Configuração do Babel.

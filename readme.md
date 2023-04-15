# React Native Marketplace

Aplicação utilizada no treinamento **Especialista React Native** como back-end do projeto final. A aplicação consiste em uma API Restful que se conecta a um banco de dados MongoDB e fornece endpoints para o funcionamento de um marketplace de produtos usados.

## Como usar em desenvolvimento

Para executar a API em ambiente de desenvolvimento é preciso ter o Node.js e o npm instalados. Além disso, é preciso usar o MongoDB, seja localmente com a versão [Community](https://www.mongodb.com/try/download/community), ou em nuvem com o [MongoDB Atlas](https://www.mongodb.com/atlas).

1. Clone este repositório e acesse-o no terminal
2. Instale as dependências: `npm install`
3. Crie um arquivo **.env** e adicione as variáveis de ambiente: `cp .env.example .env`
4. Execute: `npm run dev`

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- Multer
- Socket.io

## Funcionalidades implementadas

- ✅ Registro e login de usuários
- ✅ Autenticação com JWT
- ✅ Atualizar perfil do usuário
- ✅ Atualizar senha
- ✅ Gerenciar endereços do usuário (Listar, Adicionar e Remover)
- ✅ Gerenciar produtos favoritos do usuário (Listar, Adicionar e Remover)
- ❌ Excluir perfil do usuário
- ✅ Obter perfil de outro usuário
- ✅ Avaliar outro usuário
- ✅ Listar produtos
- ✅ Criar produtos
- ✅ Atualizar produto
- ✅ Atualizar imagens do produto
- ✅ Excluir produtos
- ✅ Pesquisar produtos
- ✅ Obter conversas do usuário
- ✅ Criar novas conversas
- ✅ Enviar e receber mensagens em tempo real

## Rotas da API

- POST   /login
- POST   /register
- GET    /categories
- GET    /products
- POST   /products
- DELETE /products/:_id
- PUT    /profile
- PUT    /profile/password
- GET    /users/:_id
- GET    /addresses
- POST   /addresses
- DELETE /addresses/:_id
- GET    /favorites
- POST   /favorites
- DELETE /favorites/:product_id
- POST   /ratings
- GET    /conversations
- POST   /conversations

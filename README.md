# TrackFleet Backend

O backend do projeto **TrackFleet** é responsável pela criação e gerenciamento de rotas para o aplicativo. Ele fornece as funcionalidades essenciais para permitir que o aplicativo TrackFleet assista aos motoristas no planejamento e monitoramento de rotas de veículos, garantindo eficiência na gestão de entregas e movimentações de frota.

## Tecnologias

- Node.js
- Express
- PostgreSQL

## Funcionalidades

- Criação de rotas para os motoristas
- Registro e atualização de entregas e movimentações
- Integração com o aplicativo TrackFleet

## Como Rodar

### 1. Clonar o repositório

```bash
git clone https://github.com/alexmeirels/trackfleet-backend.git
```
### 2. Instalar as dependências

```bash
cd trackfleet-backend
yarn install
```

### 3. Criar o arquivo ```.env```

Na raiz do projeto, crie um arquivo ```.env``` e adicione a seguinte variável de configuração para conectar ao seu banco de dados PostgreSQL:
```bash
DATABASE_URL="postgresql://alexalmeida:password@localhost:5433/db_name"

```
### 4. Configurar o Prisma

Antes de realizar qualquer migração ou interação com o banco de dados, é necessário gerar o cliente Prisma. Execute o seguinte comando para gerar o cliente:

```bash
npx prisma generate
```

### 5. Rodar a aplicação

Agora, você pode iniciar o servidor de desenvolvimento com o seguinte comando:

```bash
npm run dev
```

Isso iniciará o backend do TrackFleet na sua máquina local, permitindo que você comece a interagir com a API e a testar as funcionalidades de criação e gerenciamento de rotas.

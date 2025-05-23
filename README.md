# Documentação do Projeto Balatro

## Visão Geral

O projeto **Balatro** é composto por uma API RESTful desenvolvida em Node.js (Express) para gerenciamento de cartas e naipes, e um frontend em React para interação visual com esses dados. O sistema permite criar, listar, editar, visualizar e deletar cartas e naipes de um baralho.

---

## Estrutura do Projeto

```
BalatroAPI/
│
├── BackEnd/
│   ├── controllers/
│   │   ├── CartasControllers.js
│   │   └── NaipesControllers.js
│   ├── models/
│   │   ├── Cartas.js
│   │   ├── Naipes.js
│   │   └── db.js
│   └── index.js
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Cartas/
│       │   │   ├── AddCarta.js
│       │   │   ├── ListCarta.js
│       │   │   ├── ReadCarta.js
│       │   │   └── UpdateCarta.js
│       │   └── Naipe/
│       │       ├── AddNaipe.js
│       │       ├── ListNaipe.js
│       │       ├── ReadNaipe.js
│       │       └── UpdateNaipe.js
│       ├── App.js
│       └── ...
│
└── Balatro.sql
```

---

## BackEnd (API)

### Inicialização do Servidor

O arquivo principal do backend é o `index.js`:

```javascript
// ...existing code...
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8081;

const nC = require("./controllers/NaipesControllers.js");
const cC = require("./controllers/CartasControllers.js");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Estou aqui"));

app.use("/naipe", nC);
app.use("/carta", cC);

app.listen(port, () => console.log(`Servidor rodando porta ${port}!`));
```

- **Express**: Framework para criar o servidor HTTP.
- **body-parser**: Permite receber dados em JSON.
- **cors**: Permite requisições de outros domínios (ex: frontend React).
- **Controllers**: As rotas `/naipe` e `/carta` são delegadas para seus respectivos controllers.

---

### Modelos (Sequelize)

#### Conexão com o Banco

```javascript
// models/db.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('balatro','root','root',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});
module.exports = { Sequelize, sequelize }
```

#### Modelo Naipe

```javascript
// models/Naipes.js
const Naipe = db.sequelize.define("naipe", {
  id_naipe: { type: db.Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  nome: { type: db.Sequelize.TEXT },
  cor: { type: db.Sequelize.TEXT },
}, { freezeTableName: true });
```

#### Modelo Carta

```javascript
// models/Cartas.js
const Carta = db.sequelize.define("carta", {
  id_carta: { type: db.Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  numero: { type: db.Sequelize.TEXT },
  pontuacao: { type: db.Sequelize.INTEGER },
  fk_naipe: { type: db.Sequelize.INTEGER, references: { model: "naipe", key: "id_naipe" }, onDelete: "CASCADE", allowNull: false },
}, { freezeTableName: true });
```

---

### Controllers

#### Exemplo de Controller de Naipe

```javascript
// controllers/NaipesControllers.js
router.get("/", async (req, res) => {
  const naipes = await Naipe.findAll();
  res.status(200).json(naipes);
});
router.post("/", async (req, res) => {
  const { nome, cor } = req.body;
  await Naipe.create({ nome, cor });
  res.status(200).json({ message: "Cadastrado com sucesso" });
});
```

- **GET /naipe**: Lista todos os naipes.
- **POST /naipe**: Cria um novo naipe.

#### Exemplo de Controller de Carta

```javascript
// controllers/CartasControllers.js
router.get("/", async (req, res) => {
  const cartas = await Carta.findAll();
  res.status(200).json(cartas);
});
router.post("/", async (req, res) => {
  const { numero, pontuacao, fk_naipe } = req.body;
  await Carta.create({ numero, pontuacao, fk_naipe });
  res.status(200).json({ message: "Cadastrado com sucesso" });
});
```

---

## FrontEnd (React)

### Estrutura de Rotas

```javascript
// src/App.js
<BrowserRouter>
  <div className="balatro-layout">
    <Sidebar />
    <main className="balatro-main">
      <Routes>
        <Route path="/naipe" element={<ListNaipe />} />
        <Route path="/naipe/add" element={<AddNaipe />} />
        <Route path="/naipe/read/:id_naipe" element={<ReadNaipe />} />
        <Route path="/naipe/update/:id_naipe" element={<UpdateNaipe />} />
        <Route path="/carta" element={<ListCarta />} />
        <Route path="/carta/add" element={<AddCarta />} />
        <Route path="/carta/read/:id_carta" element={<ReadCarta />} />
        <Route path="/carta/update/:id_carta" element={<UpdateCarta />} />
      </Routes>
    </main>
  </div>
</BrowserRouter>
```

- **Sidebar**: Navegação entre cartas e naipes.
- **Rotas**: CRUD completo para cartas e naipes.

---

### Exemplo de Listagem de Naipes

```javascript
// src/components/Naipe/ListNaipe.js
useEffect(() => {
  const fetchAllNaipes = async () => {
    const res = await axios.get("http://localhost:8081/naipe");
    setNaipes(res.data);
  };
  fetchAllNaipes();
}, []);
```

- **useEffect**: Busca todos os naipes ao carregar o componente.
- **axios**: Realiza requisições HTTP para a API.

---

### Exemplo de Adição de Carta

```javascript
// src/components/Cartas/AddCarta.js
const handleClick = async (e) => {
  e.preventDefault();
  await axios.post("http://localhost:8081/carta", carta);
  navigate("/carta");
};
```

- **handleClick**: Envia os dados do formulário para a API e redireciona para a listagem.

---

## Banco de Dados

O banco de dados é MySQL. O script inicial está em `Balatro.sql`:

```sql
create database balatro;
use balatro;
```

As tabelas são criadas automaticamente pelo Sequelize ao rodar a aplicação.

---

## Como Executar

1. **Instale as dependências** em `BackEnd` e `frontend` com `npm install`.
2. **Configure o banco de dados** MySQL conforme `models/db.js`.
3. **Inicie o backend**:
   ```
   cd BackEnd
   node index.js
   ```
4. **Inicie o frontend**:
   ```
   cd frontend
   npm start
   ```
5. **Acesse** o frontend em `http://localhost:3000` e a API em `http://localhost:8081`.

---

## Funcionalidades

- CRUD de Naipes (criar, listar, editar, deletar, visualizar)
- CRUD de Cartas (criar, listar, editar, deletar, visualizar)
- Relacionamento entre cartas e naipes
- Interface amigável com React e estilização customizada

---

## Observações

- O backend utiliza Sequelize para ORM.
- O frontend utiliza React Router para navegação.
- O CORS está habilitado para facilitar o desenvolvimento local.

---

## Exemplos de Uso

- **Adicionar Naipe**: Preencha nome e cor, clique em "Cadastrar".
- **Adicionar Carta**: Informe valor, pontuação e id do naipe correspondente.
- **Editar/Deletar**: Use os botões nas tabelas de listagem.

---

## Contato

Dúvidas ou sugestões? Entre em contato com o desenvolvedor do projeto.
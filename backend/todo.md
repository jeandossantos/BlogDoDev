#### User

- <b style="color: blue">Registrar usuário método</b>

  - [x] **usuário deve ter username, email, password, imageUrl**
  - [x] **usuário com email já cadastrado não pode ser criado**

- [x] <b style="color: blue">Login método</b>
  - [x] **Retorno deve conter o token**
- [x] <b style="color: blue">Atualizar usuário método</b>
- [x] <b style="color: blue">Alterar senha do usuário método</b>
  - [x] **Nova senha deve ser criptografada antes de ser salva**
- [x] <b style="color: blue">Deletar usuário método</b>

### Tag

- [x] <b style="color: blue">Criar tag método</b>

  - [x] **tag deve ser salva em lowercases**
  - [x] **tag deve ter pelo menos 2 caracteres**
  - [x] **tag não deve ser repetida**
  - [x] **retorna a tag criada**

- [x] <b style="color: blue">Buscar tags método</b>

  - [x] **retorna todas as tags**

- [x] <b style="color: blue">Deletar tag método</b>

  - [x] **tag que tem artigos vinculados não podem ser apagados**

### Article

- [x] <b style="color: blue"> Criar artigo método</b>

  - [x] **artigo deve ter pelo menos 1 tag**

- [x] <b style="color: blue">Buscar artigo por id método</b>

- [x] <b style="color: blue">remove artigo método</b>

- [x] <b style="color: blue">atualizar artigo método</b>

  - [x] **artigo deve ter pelo menos 1 tag**

- [x] <b style="color: blue">Listar artigos por página método</b>

  - [x] **retorna artigos com paginação**
        **artigo deve ter as propriedades:**
  - [x] { id, title, description, createdAt, updatedAt, imageUrl, author }

- [x] <b style="color: blue">Listar artigos por tag</b>

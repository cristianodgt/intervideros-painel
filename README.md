# InterVideros — Painel Operacional

Painel administrativo completo: Chats WhatsApp, Agenda de Visitas, Equipe em Campo e delegação de tarefas.

---

## 🚀 Como publicar no GitHub Pages (passo a passo)

### Pré-requisitos
- Conta no [GitHub](https://github.com)
- [Node.js 18+](https://nodejs.org) instalado no computador
- [Git](https://git-scm.com) instalado

---

### 1️⃣  Crie o repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: **`intervideros-painel`** (exatamente assim)
3. Deixe como **Public**
4. Clique em **Create repository**

---

### 2️⃣  Ajuste o nome do repositório no vite.config.js

Abra o arquivo `vite.config.js` e confirme que o `base` bate com o nome do seu repositório:

```js
base: '/intervideros-painel/',
```

Se você usou outro nome no GitHub, troque aqui.

---

### 3️⃣  Suba o projeto

No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/intervideros-painel.git
git push -u origin main
```

> Substitua `SEU_USUARIO` pelo seu usuário do GitHub.

---

### 4️⃣  Ative o GitHub Pages

1. No repositório, vá em **Settings → Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Salve

O GitHub vai rodar o deploy automaticamente a cada `git push` na branch `main`.

---

### 5️⃣  Acesse o painel

Após o deploy (leva ~2 minutos), seu painel estará em:

```
https://SEU_USUARIO.github.io/intervideros-painel/
```

---

## 💻 Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173/intervideros-painel/

---

## 📁 Estrutura do projeto

```
intervideros-painel/
├── .github/
│   └── workflows/
│       └── deploy.yml      ← deploy automático
├── src/
│   ├── App.jsx             ← painel completo
│   └── main.jsx            ← entrada React
├── index.html
├── vite.config.js          ← configuração Vite + base URL
└── package.json
```

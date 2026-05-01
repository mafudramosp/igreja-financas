# ⛪ Gestão Financeira — AD Belém

Aplicativo PWA para controle de dízimos, ofertas e gastos da igreja, com sincronização via Google Sheets.

## 📲 Instalação no Celular

1. Acesse o site pelo Chrome (Android) ou Safari (iPhone)
2. **Android:** Menu ⋮ → "Adicionar à tela inicial" ou "Instalar app"
3. **iPhone:** Botão compartilhar ↑ → "Adicionar à Tela de Início"

## 🚀 Deploy no GitHub Pages

1. Crie um repositório no GitHub (ex: `igreja-financas`)
2. Faça upload de todos os arquivos desta pasta:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192x192.png`
   - `icon-512x512.png`
3. Vá em **Settings → Pages → Source: main → Save**
4. Acesse em: `https://seuusuario.github.io/igreja-financas/`

## 📊 Configurar Google Sheets (Sincronização)

### Passo 1 — Criar a Planilha
1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha nova
2. Copie o **ID** da URL (a parte entre `/d/` e `/edit`)

### Passo 2 — Criar o Apps Script
1. Acesse [script.google.com](https://script.google.com) → **Novo Projeto**
2. Apague o conteúdo padrão
3. Cole o conteúdo do arquivo `google-apps-script.js`
4. Substitua `COLE_O_ID_DA_SUA_PLANILHA_AQUI` pelo ID da planilha
5. Salve (Ctrl+S)

### Passo 3 — Implantar
1. Clique em **Implantar → Nova implantação**
2. Tipo: **App da Web**
3. Executar como: **Eu**
4. Quem tem acesso: **Qualquer pessoa**
5. Clique em **Implantar** e autorize
6. Copie a **URL** gerada

### Passo 4 — Conectar ao App
1. Abra o `index.html`
2. Encontre a linha: `const SCRIPT_URL = "";`
3. Cole a URL entre as aspas
4. Salve e faça push para o GitHub

### Pronto! 🎉
Clique em **🔄 Sincronizar** no app para enviar os dados à planilha.

## 📁 Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Aplicativo principal |
| `manifest.json` | Configuração PWA |
| `sw.js` | Service Worker (offline) |
| `icon-192x192.png` | Ícone PWA pequeno |
| `icon-512x512.png` | Ícone PWA grande |
| `google-apps-script.js` | Código do Google Apps Script |

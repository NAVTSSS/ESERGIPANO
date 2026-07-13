# Guia: colocando o ESERGIPANO no Firebase (admin em tempo real)

Este guia é pra quando você quiser ligar o "modo admin de verdade" —
onde qualquer resultado ou notícia cadastrada aparece na hora pra
todo mundo, sem precisar reenviar arquivo nenhum.

**Enquanto você não fizer isso, o site funciona normalmente** com os
dados de exemplo do arquivo `assets/js/hub-data.js`.

---

## Passo 1 — Criar a conta e o projeto

1. Acesse **https://firebase.google.com** e entre com uma conta Google
   (pode ser a mesma que você já usa no dia a dia).
2. Clique em **"Ir para o console"** e depois em **"Criar um projeto"**.
3. Dê um nome, por exemplo `esergipano-2026`.
4. Pode desativar o Google Analytics (não é necessário pra isso).
5. Clique em **"Criar projeto"** e espere terminar.

## Passo 2 — Criar o banco de dados (Firestore)

1. No menu à esquerda, vá em **Compilação → Firestore Database**.
2. Clique em **"Criar banco de dados"**.
3. Escolha o modo **produção**.
4. Na região, escolha a mais próxima do Brasil disponível
   (ex: `southamerica-east1`).
5. Clique em **"Ativar"**.

## Passo 3 — Pegar as chaves de configuração

1. Clique no ícone de engrenagem (⚙) no menu esquerdo →
   **"Configurações do projeto"**.
2. Role até **"Seus apps"** e clique no ícone **`</>`** (Web).
3. Dê um apelido, ex: `esergipano-web`, e clique em **"Registrar app"**.
4. Vai aparecer um bloco parecido com este:

   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "esergipano-2026.firebaseapp.com",
     projectId: "esergipano-2026",
     storageBucket: "esergipano-2026.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```

5. Copie esses valores e cole no arquivo `assets/js/firebase-config.js`
   do site, no lugar de `"COLE_AQUI"`.
6. No mesmo arquivo, troque `FIREBASE_ATIVO = false` para
   `FIREBASE_ATIVO = true`.

## Passo 4 — Regras de segurança do Firestore

Por padrão, o Firestore não deixa ninguém ler nem escrever nada. Como
o site precisa que **qualquer visitante consiga ler** os dados
(modalidades, jogos, notícias), mas **só o admin consiga escrever**,
vamos usar regras simples baseadas em senha por enquanto (login de
verdade com Firebase Authentication é o próximo passo, quando o site
já estiver rodando).

Em **Firestore Database → Regras**, cole:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if false; // temporário — o admin vai gravar por uma função protegida
    }
  }
}
```

Isso deixa o site público **ler** tudo (o que já é suficiente pra essa
primeira fase, com os dados ainda sendo carregados a partir do
`hub-data.js`/`script.js` locais). Quando eu construir o painel
administrativo conectado ao Firebase (próxima fase), a gente ajusta
essas regras para permitir escrita autenticada.

## Passo 5 — Subir os dados iniciais (quando o admin estiver pronto)

Isso vai ser feito automaticamente por uma tela de "importar dados"
que vou construir no painel administrativo — você não vai precisar
digitar cada time/jogo direto no Firebase.

---

## O que já está pronto vs. o que vem na próxima fase

✅ **Pronto agora:**
- Estrutura de dados pensada para o Firestore (coleções
  `modalidades`, `noticias`, `patrocinadores`) — veja o formato em
  `assets/js/hub-data.js`.
- O site já tenta carregar do Firebase automaticamente assim que
  `FIREBASE_ATIVO` for `true`; se der erro, ele usa os dados locais
  sem quebrar nada.

🔜 **Próxima fase (quando você quiser seguir):**
- Painel administrativo novo, ligado ao Firebase, com login de
  verdade (Firebase Authentication) em vez da senha simples atual.
- Telas de cadastro de jogos, times, notícias por modalidade.
- Migração da página de Valorant para o novo formato "modalidade"
  (hoje ela continua funcionando do jeito antigo, em `valorant.html`).

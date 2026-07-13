/* ================================================================
   CONFIGURAÇÃO DO FIREBASE
   ================================================================
   Esse arquivo é o único lugar onde você vai colar as chaves do
   seu projeto Firebase. Sem isso preenchido, o site inteiro
   continua funcionando normalmente, só que com os dados de
   exemplo (arquivo hub-data.js) em vez dos dados reais/ao vivo.

   COMO CONSEGUIR ESSAS CHAVES (resumo — o guia completo está no
   arquivo GUIA-FIREBASE.md):
   1. Crie uma conta gratuita em https://firebase.google.com
   2. Crie um novo projeto (ex: "esergipano-2026")
   3. Dentro do projeto, vá em "Compilação" > "Firestore Database"
      e clique em "Criar banco de dados" (modo produção, região
      "southamerica-east1" se disponível).
   4. Vá em "Configurações do projeto" (ícone de engrenagem) >
      role até "Seus apps" > clique no ícone "</>" (Web) >
      dê um nome (ex: "esergipano-web") > "Registrar app".
   5. O Firebase vai te mostrar um bloco de código parecido com o
      objeto abaixo. Copie os valores e cole aqui embaixo.
================================================================ */

const FIREBASE_ATIVO = false; // troque para "true" depois de preencher as chaves abaixo

const firebaseConfig = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI",
  projectId: "COLE_AQUI",
  storageBucket: "COLE_AQUI",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};

/* Não mexa daqui pra baixo */
window.ESERGIPANO_FIREBASE = { ativo: FIREBASE_ATIVO, config: firebaseConfig };

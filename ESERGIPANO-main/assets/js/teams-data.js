/* ================================================================
   TEAMS-DATA.JS — Informações extras de cada equipe
   ================================================================
   Esse arquivo guarda os dados que NÃO vêm do placar dos jogos:
   organização, redes sociais e elenco. Os dados de resultado
   (vitórias, derrotas, saldo, aproveitamento) são calculados
   automaticamente a partir de assets/js/valorant-data.js — você
   não edita isso aqui.

   Para cada equipe, o "nome" precisa ser IDÊNTICO ao usado em
   valorant-data.js (times / jogos), é isso que conecta os dois
   arquivos.

   "elenco" -> lista de jogadores. Comece vazio e vá preenchendo:
     { nome: "NickDoJogador", funcao: "Duelista" }

   ---------------------------------------------------------------
   GUIA RÁPIDO DE "FUNÇÃO" POR MODALIDADE (copie e cole no funcao):
   ---------------------------------------------------------------
   Valorant        -> Duelista | Iniciador | Controlador | Sentinela | IGL
   CS2             -> Entry Fragger | AWPer | Lurker | Support | IGL | Rifler
   League of Legends -> Topo | Selva | Meio | Atirador | Suporte
   TFT             -> Jogador (é individual, mas o time soma pontos)
   Dota 2          -> Carry (posição 1) | Mid (posição 2) | Offlane (posição 3)
                      | Suporte (posição 4) | Suporte (posição 5)
   Free Fire       -> Rusher | Suporte | Sniper | IGL
   Brawl Stars     -> Tank | Suporte | Dano | Controle
   EA FC 26 / eFootball / eFootball Mobile / Street Fighter 6 / Clash Royale
                   -> Jogador (modalidades individuais, um jogador por "equipe")

   Se a função que você precisa não estiver na lista, pode escrever
   à vontade — é só um texto livre, isso aqui é só uma referência
   pra não ficar pensando toda vez.

   "redesSociais" -> deixe "" no que a equipe não tiver.
================================================================ */

const equipesInfo = {
  "The Frag Academy": {
    slug: "the-frag-academy",
    modalidadeId: "valorant",
    logo: "../assets/the-frag-academy.png",
    organizacao: "Organização de esports sergipana.",
    redesSociais: { instagram: "https://www.instagram.com/oficialtfa/", twitter: "", discord: "", twitch: "" },
    elenco:[
  { nome: "KINGBRENO", funcao: "Flex" },
  { nome: "Noah", funcao: "Controlador" },
  { nome: "AZAKI", funcao: "Sentinela" },
  { nome: "nujabeS", funcao: "Iniciador" },
  { nome: "luckzynho", funcao: "Duelista" },
  { nome: "exec", funcao: "Flex" },
],
    // { nome: "NickDoJogador", funcao: "Duelista" },
  },
  "Troianos": {
    slug: "troianos",
    modalidadeId: "valorant",
    logo: "../assets/troianos.png",
    organizacao: "Organização de esports sergipana.",
    redesSociais: { instagram: "https://www.instagram.com/atleticatroianosunit/", twitter: "", discord: "", twitch: "" },
    elenco: [
  { nome: "HAYATO", funcao: "Flex" },
  { nome: "CabeludinhoCalvo", funcao: "Controlador" },
  { nome: "cetaceo lover", funcao: "Duelista" },
  { nome: "alves", funcao: "Sentinela" },
  { nome: "far", funcao: "Inciador" },
      // { nome: "NickDoJogador", funcao: "Duelista" },
    ]
  },
  "Gabirus Alados": {
    slug: "gabirus-alados",
    modalidadeId: "valorant",
    logo: "../assets/gabirus-alados.png",
    organizacao: "Organização de esports sergipana.",
    redesSociais: { instagram: "", twitter: "", discord: "", twitch: "" },
    elenco: [
  { nome: "tag", funcao: "Flex" },
  { nome: "Rocabub", funcao: "Sentinela" },
  { nome: "jotav", funcao: "Controlador" },
  { nome: "Muzlu", funcao: "Flex" },
  { nome: "SkyAvast ", funcao: "Duelista" },
  { nome: "Zayn", funcao: "Flex" }
  // { nome: "NickDoJogador", funcao: "Duelista" },
    ]
  },
  "Crab E-Sports": {
    slug: "crab-esports",
    modalidadeId: "valorant",
    logo: "../assets/crab-esports.png",
    organizacao: "Organização de esports sergipana.",
    redesSociais: { instagram: "https://www.instagram.com/crabesports/", twitter: "", discord: "", twitch: "" },
    elenco: [
  { nome: "Sharkays", funcao: "Flex" },
  { nome: "Kznỳ", funcao: "Duelista" },
  { nome: "kingSuya", funcao: "Sentinela" },
  { nome: "Apx ", funcao: "Controlador" },
  { nome: "Lmgarcez", funcao: "Controlador" },
  { nome: "Pain", funcao: "Iniciador" }
      // { nome: "NickDoJogador", funcao: "Duelista" },
    ]
  },
  "Wolfgang": {
    slug: "wolfgang",
    modalidadeId: "valorant",
    logo: "../assets/volfgang.png",
    organizacao: "Organização de esports sergipana.",
    redesSociais: { instagram: "https://www.instagram.com/osgabirusalados/", twitter: "", discord: "", twitch: "" },
    elenco: [
  { nome: "Vxnny04", funcao: "Controlador" },
  { nome: "OldDeux", funcao: "Flex" },
  { nome: "m0raisXdk", funcao: "Duelista" },
  { nome: "R 水  ", funcao: "Iniciador" },
  { nome: "Hermeneguncio", funcao: "Sentinela" }
 
      // { nome: "NickDoJogador", funcao: "Duelista" },
    ]
  }
};

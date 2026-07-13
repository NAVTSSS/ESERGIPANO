/* ================================================================
   HUB-DATA.JS — Dados de exemplo do ESERGIPANO 2026
   ================================================================
   Esse arquivo tem duas funções:

   1) Enquanto o Firebase não estiver conectado (ver
      firebase-config.js), o site usa ESSES dados aqui pra
      funcionar normalmente — você pode editar à vontade, do
      mesmo jeito que editava o script.js do Valorant.

   2) Depois que o Firebase estiver ativo, esses dados viram só
      um "modelo de referência": a estrutura de cada objeto aqui
      é EXATAMENTE a estrutura que vai ser salva no Firestore, nas
      coleções de mesmo nome. Ou seja, aprender a editar aqui já
      é aprender o formato de dado que o admin novo vai gerar.

   Cada modalidade tem uma cor própria (corPrimaria) — é ela que
   muda o "clima visual" do site (banners, cards, brilhos) quando
   a modalidade é destacada ou selecionada.

   "logo" -> caminho da logo oficial do jogo (PNG), usada nos
   cards de modalidade e no calendário, no lugar do emoji antigo.

   STATUS possíveis de uma modalidade:
     "em_andamento"       -> campeonato rolando agora
     "inscricoes_abertas" -> inscrições abertas, ainda não começou
     "agendada"           -> data/mês já definido, ainda não começou
     "em_breve"           -> ainda sem data definida
     "encerrada"          -> temporada já disputada este ano
================================================================ */

const modalidades = [
  {
    id: "valorant",
    nome: "Valorant",
    logo: "assets/modalidades/valorant.png",
    corPrimaria: "#fece00",
    corPrimariaRgb: "254, 206, 0",
    status: "em_andamento",
    resumo: "Fase de grupos em andamento — 5 times, todos contra todos.",
    dataInfo: "Em andamento",
    linkPagina: "modalidades/valorant/index.html",
    banner: "assets/logo-campeonato.png"
  },
  {
    id: "cs2",
    nome: "Counter-Strike 2",
    logo: "assets/modalidades/cs2.png",
    corPrimaria: "#ff7a1a",
    corPrimariaRgb: "255, 122, 26",
    status: "inscricoes_abertas",
    resumo: "Inscrições abertas agora. Início do campeonato em 20 de julho.",
    dataInfo: "Começa em 20/07",
    dataInicioISO: "2026-07-20T18:00:00-03:00",
    linkPagina: "#",
    banner: ""
  },
  {
    id: "lol",
    nome: "League of Legends",
    logo: "assets/modalidades/lol.png",
    corPrimaria: "#00c2ff",
    corPrimariaRgb: "0, 194, 255",
    status: "agendada",
    resumo: "Temporada confirmada para agosto de 2026.",
    dataInfo: "Agosto de 2026",
    linkPagina: "#",
    banner: ""
  },
  {
    id: "tft",
    nome: "TFT",
    logo: "assets/modalidades/tft.png",
    corPrimaria: "#a06bff",
    corPrimariaRgb: "160, 107, 255",
    status: "agendada",
    resumo: "Temporada confirmada para agosto de 2026.",
    dataInfo: "Agosto de 2026",
    linkPagina: "#",
    banner: ""
  },
  {
    id: "eafc26",
    nome: "EA FC 26",
    logo: "assets/modalidades/eafc26.png",
    corPrimaria: "#1fd15a",
    corPrimariaRgb: "31, 209, 90",
    status: "em_breve",
    resumo: "Data de início a definir.",
    dataInfo: "Em breve",
    linkPagina: "#",
    banner: ""
  },
  {
    id: "efootball",
    nome: "eFootball",
    logo: "assets/modalidades/efootball.png",
    corPrimaria: "#2e86ff",
    corPrimariaRgb: "46, 134, 255",
    status: "em_breve",
    resumo: "Data de início a definir.",
    dataInfo: "Em breve",
    linkPagina: "#",
    banner: ""
  },
  {
    id: "efootball-mobile",
    nome: "eFootball Mobile",
    logo: "assets/modalidades/efootball-mobile.png",
    corPrimaria: "#1560c9",
    corPrimariaRgb: "21, 96, 201",
    status: "em_breve",
    resumo: "Data de início a definir.",
    dataInfo: "Em breve",
    linkPagina: "#",
    banner: ""
  },
  {
    id: "free-fire",
    nome: "Free Fire",
    logo: "assets/modalidades/free-fire.png",
    corPrimaria: "#ff5029",
    corPrimariaRgb: "255, 80, 41",
    status: "em_breve",
    resumo: "Data de início a definir.",
    dataInfo: "Em breve",
    linkPagina: "#",
    banner: ""
  },
  {
    id: "dota2",
    nome: "Dota 2",
    logo: "assets/modalidades/dota2.png",
    corPrimaria: "#c0392b",
    corPrimariaRgb: "192, 57, 43",
    status: "em_breve",
    resumo: "Data de início a definir.",
    dataInfo: "Em breve",
    linkPagina: "#",
    banner: ""
  },
  {
    id: "brawl-stars",
    nome: "Brawl Stars",
    logo: "assets/modalidades/brawl-stars.png",
    corPrimaria: "#ffd400",
    corPrimariaRgb: "255, 212, 0",
    status: "em_breve",
    resumo: "Data de início a definir.",
    dataInfo: "Em breve",
    linkPagina: "#",
    banner: ""
  },
  {
    id: "sf6",
    nome: "Street Fighter 6",
    logo: "assets/modalidades/sf6.png",
    corPrimaria: "#e63946",
    corPrimariaRgb: "230, 57, 70",
    status: "em_breve",
    resumo: "Data de início a definir.",
    dataInfo: "Em breve",
    linkPagina: "#",
    banner: ""
  },
  {
    id: "clash-royale",
    nome: "Clash Royale",
    logo: "assets/modalidades/clash-royale.png",
    corPrimaria: "#2a9df4",
    corPrimariaRgb: "42, 157, 244",
    status: "em_breve",
    resumo: "Data de início a definir.",
    dataInfo: "Em breve",
    linkPagina: "#",
    banner: ""
  }
];

/* ================================================================
   NOTÍCIAS
   ----------------------------------------------------------------
   "tipo" é só uma etiqueta visual: inscricoes, datas, resultado,
   regulamento, modalidade, final.
================================================================ */
const noticias = [
  {
    id: 1,
    titulo: "Inscrições abertas para o CS2",
    resumo: "Já estão abertas as inscrições para a temporada de Counter-Strike 2, com início marcado para 20 de julho.",
    tipo: "inscricoes",
    modalidadeId: "cs2",
    data: "01/07/2026"
  },
  {
    id: 2,
    titulo: "Valorant: fase de grupos na 2ª rodada",
    resumo: "Crab E-Sports e The Frag Academy seguem invictos após a segunda rodada da fase de grupos.",
    tipo: "resultado",
    modalidadeId: "valorant",
    data: "04/07/2026"
  },
  {
    id: 3,
    titulo: "League of Legends confirmado para agosto",
    resumo: "A próxima modalidade da temporada ESERGIPANO 2026 será League of Legends, com início previsto para agosto.",
    tipo: "modalidade",
    modalidadeId: "lol",
    data: "28/06/2026"
  }
];

/* ================================================================
   PATROCINADORES
================================================================ */
const patrocinadores = [
  { nome: "BLOB", logo: "assets/Sponsor6.png", link: "" },
  { nome: "Patrocinador 2", logo: "assets/Sponsor7.png", link: "" },
  { nome: "Patrocinador 3", logo: "assets/Sponsor1.png", link: "" },
  { nome: "HM Sonorização", logo: "assets/Sponsor3.png", link: "" },
  { nome: "Patrocinador 5", logo: "assets/Sponsor4.png", link: "" }
];

/* ================================================================
   TEXTOS DOS BANNERS DA HOME
================================================================ */
const bannerPrincipal = {
  modalidadeId: "valorant",
  eyebrow: "Em andamento agora",
  titulo: "VALORANT",
  subtitulo: "Fase de grupos",
  texto: "5 times, todos contra todos. Acompanhe a tabela e os resultados em tempo real.",
  linkBotao: "modalidades/valorant/index.html",
  textoBotao: "Ver campeonato"
};

const bannerSecundario = {
  modalidadeId: "cs2",
  eyebrow: "Próxima modalidade",
  titulo: "COUNTER-STRIKE 2",
  texto: "Inscrições abertas. O campeonato começa em 20 de julho.",
  dataInicioISO: "2026-07-20T18:00:00-03:00"
};

/* ================================================================
   SERGIPANO 2026 — VALORANT — script.js
   ================================================================
   ESTE É O ARQUIVO QUE VOCÊ VAI EDITAR NO DIA A DIA.

   Índice deste arquivo (use Ctrl+F para pular direto):

     1) SPONSORS        -> logos da aba "Patrocinadores"
     2) TIMES            -> nomes e logos dos times
     3) JOGOS             -> todas as partidas do campeonato (fase de grupos)
     4) SEMIFINAIS        -> os 2 jogos do mata-mata
     5) SENHA DO ADMIN    -> senha simples pra abrir o painel administrativo
     6) MOTOR DO SITE     -> não precisa mexer (classificação, telas, etc.)

   A CLASSIFICAÇÃO NÃO é mais digitada à mão: ela é calculada
   sozinha a partir dos resultados que você cadastra em "JOGOS"
   (ou pelo Painel Administrativo, na aba "Administração" do site).
================================================================ */


/* ================================================================
   1) SPONSORS / PATROCINADORES
   ALTERE AQUI OS PATROCINADORES
   ----------------------------------------------------------------
   - "nome"  -> nome do patrocinador (aparece no "alt" da imagem,
                bom pra quem usa leitor de tela)
   - "logo"  -> caminho do arquivo dentro da pasta ../../assets/
   - "link"  -> site/instagram/whatsapp do patrocinador.
                Se não tiver link, deixe como "" (vazio) que o
                logo aparece sem poder ser clicado.

   Para adicionar um novo patrocinador: copie um bloco { } inteiro,
   cole embaixo do último, separe com uma vírgula e troque os
   valores. Para remover, apague o bloco inteiro (com a vírgula).
================================================================ */
const sponsors = [
  { nome: "BLOB", logo: "../../assets/Sponsor6.png", link: "" },
  { nome: "Patrocinador 2", logo: "../../assets/Sponsor7.png", link: "" },
  { nome: "Patrocinador 3", logo: "../../assets/Sponsor1.png", link: "" },
  { nome: "HM Sonorização", logo: "../../assets/Sponsor3.png", link: "" },
  { nome: "Patrocinador 5", logo: "../../assets/Sponsor4.png", link: "" }
];


/* ================================================================
   2) TIMES
   ALTERE AQUI OS TIMES / LOGOS
   ----------------------------------------------------------------
   - "nome"   -> nome do time, exatamente como deve aparecer no site
   - "logo"   -> caminho do arquivo de imagem dentro da pasta ../../assets/
   - "status" -> texto pequeno que aparece embaixo do nome

   IMPORTANTE: o "nome" usado aqui precisa ser IDÊNTICO ao usado
   nos jogos (timeA / timeB) lá embaixo — é isso que conecta tudo.
================================================================ */
const times = [
  { nome: "The Frag Academy", logo: "../../assets/the-frag-academy.png", status: "Confirmado" },
  { nome: "Troianos",         logo: "../../assets/troianos.png",         status: "Confirmado" },
  { nome: "Gabirus Alados",   logo: "../../assets/gabirus-alados.png",   status: "Confirmado" },
  { nome: "Crab E-Sports",    logo: "../../assets/crab-esports.png",     status: "Confirmado" },
  { nome: "Wolfgang",         logo: "../../assets/volfgang.png",         status: "Confirmado" }
];


/* ================================================================
   3) JOGOS — FASE DE GRUPOS
   ALTERE AQUI OS JOGOS / RESULTADOS
   ----------------------------------------------------------------
   Cada jogo é um objeto com estes campos:

   - "id"       -> identificador único do jogo. NÃO REPITA IDs.
                   Se criar um jogo novo, use o próximo número livre.
   - "rodada"   -> número da rodada (1, 2, 3...). Agrupa os jogos
                   na aba "Resultados" e no "Cronograma".
   - "diaSemana"-> texto livre, ex: "Sexta-feira"
   - "horario"  -> ex: "20h00"
   - "data"     -> ex: "10/08". Deixe "" se ainda não tiver data.
   - "timeA" / "timeB" -> nomes dos times (iguais aos da lista "times")
   - "placarA" / "placarB" -> placar da partida (rounds).
        Enquanto não jogou, deixe null (sem aspas).
        Depois de jogar, troque pelo número de rounds de cada time,
        ex: placarA: 13, placarB: 8
   - "mapa"     -> nome do mapa jogado, ex: "Haven". Deixe "" se
                   ainda não tiver sido definido/jogado.
   - "mvp"      -> nome do MVP da partida (opcional). Deixe "".
   - "vod"      -> link da transmissão/VOD (opcional). Deixe "".
   - "formato"  -> "MD1" (não muda na fase de grupos)
   - "status"   -> um destes três valores, exatamente assim:
        "agendado"   -> jogo ainda não começou (aparece "Em breve")
        "ao_vivo"    -> jogo acontecendo agora (fica piscando)
        "finalizada" -> jogo já terminou (fica verde, entra na
                        classificação automaticamente)

   Dica: o jeito mais fácil de atualizar isso no dia a dia é pela
   aba "Administração" do próprio site — ela gera o texto pronto
   pra você colar aqui. Veja o guia que a Claude te mandou junto
   com os arquivos.
================================================================ */
const jogos = [
  { id: 1, rodada: 1, diaSemana: "Sexta-feira", horario: "20h00", data: "03/07", timeA: "The Frag Academy", timeB: "Troianos", placarA: 13, placarB: 6, mapa: "Ascent", mvp: "nujabeS", vod: "https://www.youtube.com/live/jyAiuB40E1I?si=3NbpwHzcj4KslJyt&t=2524", formato: "MD1", status: "finalizada" },
  { id: 2, rodada: 1, diaSemana: "Sexta-feira", horario: "21h00", data: "03/07", timeA: "Gabirus Alados", timeB: "Crab E-Sports", placarA: 4, placarB: 13, mapa: "Lotus", mvp: "Kzny", vod: "https://www.youtube.com/live/jyAiuB40E1I?si=UE4x0LTdOruqFRcp&t=5733", formato: "MD1", status: "finalizada" },
  { id: 3, rodada: 1, diaSemana: "Sexta-feira", horario: "22h00", data: "03/07", timeA: "The Frag Academy", timeB: "Wolfgang", placarA: 13, placarB: 2, mapa: "Haven", mvp: "luckzynho", vod: "https://www.youtube.com/live/jyAiuB40E1I?si=ouHlaz4fiytDhePT&t=8734", formato: "MD1", status: "finalizada" },
  { id: 4, rodada: 2, diaSemana: "Sábado", horario: "14h00", data: "04/07", timeA: "Troianos", timeB: "Gabirus Alados", placarA: 5, placarB: 13, mapa: "Ascent", mvp: "cetaceo lover", vod: "https://www.youtube.com/live/h8_VRahbjJA?si=fCUcLPtt734q3aiC&t=4442", formato: "MD1", status: "finalizada" },
  { id: 5, rodada: 2, diaSemana: "Sábado", horario: "15h00", data: "04/07", timeA: "Crab E-Sports", timeB: "Wolfgang", placarA: 13, placarB: 2, mapa: "Ascent", mvp: "Kzny", vod: "https://www.youtube.com/live/h8_VRahbjJA?si=HzgXkd7aXo8dnnx8&t=5532", formato: "MD1", status: "finalizada" },
  { id: 6, rodada: 3, diaSemana: "Sexta-feira", horario: "20h00", data: "10/07/2026", timeA: "The Frag Academy", timeB: "Gabirus Alados", placarA: 13, placarB: 2, mapa: "Ascent", mvp: "Noah", vod: "https://www.youtube.com/live/PCchGEuN_oU?si=cJrFdLs01DlsXT1V&t=1324", formato: "MD1", status: "finalizada" },
  { id: 7, rodada: 3, diaSemana: "Sexta-feira", horario: "21h00", data: "10/07/2026", timeA: "Troianos", timeB: "Wolfgang", placarA: 13, placarB: 0, mapa: "Haven", mvp: "far", vod: "https://www.youtube.com/live/PCchGEuN_oU?si=yCLeCXSr_JxQLS-d&t=4929", formato: "MD1", status: "finalizada" },
  { id: 8, rodada: 3, diaSemana: "Sexta-feira", horario: "22h00", data: "10/07/2026", timeA: "The Frag Academy", timeB: "Crab E-Sports", placarA: 11, placarB: 13, mapa: "Sunset", mvp: "KZNY", vod: "https://www.youtube.com/live/PCchGEuN_oU?si=YULuBCpugataP5_h&t=7701", formato: "MD1", status: "finalizada" },
  { id: 9, rodada: 4, diaSemana: "Sábado", horario: "14h00", data: "11/07/2026", timeA: "Troianos", timeB: "Crab E-Sports", placarA: 10, placarB: 13, mapa: "Lotus", mvp: "Pain", vod: "https://www.youtube.com/live/ACo8HWKihds?si=aBOR8LW6aJyjIImq&t=4885", formato: "MD1", status: "finalizada" },
  { id: 10, rodada: 4, diaSemana: "Sábado", horario: "15h00", data: "11/07/2026", timeA: "Gabirus Alados", timeB: "Wolfgang", placarA: 13, placarB: 0, mapa: "", mvp: "", vod: "", formato: "MD1", status: "finalizada" }
];


/* ================================================================
   4) SEMIFINAIS
   ----------------------------------------------------------------
   O chaveamento (1º x 4º / 2º x 3º) é montado SOZINHO a partir da
   classificação calculada em "JOGOS" — não precisa digitar os times
   aqui. Só edite dia/horário/placar de cada série quando ela rolar.

   - "placarA" / "placarB" -> quantos mapas cada time venceu na série
        (MD3 = melhor de 3, então o placar vai até 2). Deixe null
        enquanto não jogou.
   - "status" -> "agendado" | "ao_vivo" | "finalizada"
================================================================ */
const semifinaisConfig = [
  { nome: "Semifinal 1", seedA: 1, seedB: 4, dia: "Sexta-feira", horario: "20h00", formato: "MD3", placarA: null, placarB: null, status: "agendado" },
  { nome: "Semifinal 2", seedA: 2, seedB: 3, dia: "Sábado",       horario: "14h00", formato: "MD3", placarA: null, placarB: null, status: "agendado" }
];

/* Grande Final — os times só são conhecidos depois das semifinais.
   Edite dia/horário/placar quando ela acontecer. */
const finalConfig = { nome: "Grande Final", dia: "A definir", horario: "A definir", formato: "MD3", placarA: null, placarB: null, status: "agendado" };


/* ================================================================
   5) SENHA DO PAINEL ADMINISTRATIVO
   ----------------------------------------------------------------
   Isso é só uma trava simples pra visitantes comuns não mexerem
   sem querer. NÃO é uma segurança de verdade (qualquer pessoa que
   abrir o código do site consegue ver essa senha) — sirve só pra
   afastar cliques curiosos. Troque por qualquer palavra que quiser.
================================================================ */
const ADMIN_SENHA = "sergipano2026";

/* Quantos pontos vale cada resultado (pedido do cliente: vitória = 3) */
const PONTOS_VITORIA = 3;
const PONTOS_DERROTA = 0;
const PONTOS_EMPATE = 1; // usado só se algum dia houver empate




/* ================================================================
   ================================================================
   6) DAQUI PRA BAIXO É O "MOTOR" DO SITE.
   Não precisa mexer nessa parte — ela lê as listas acima (mais os
   resultados salvos pelo painel administrativo) e desenha a
   página inteira automaticamente.
   ================================================================
================================================================ */

const LS_KEY = "sergipano2026_overrides";

/* ---------- Camada de persistência (localStorage) ----------
   O painel administrativo NÃO edita as listas lá em cima direto
   (isso é impossível só com JavaScript rodando no navegador do
   visitante). Em vez disso, ele guarda um "adendo" no navegador
   de quem mexeu, com os campos que mudaram por id de jogo.
   Toda vez que o site carrega, ele pega os jogos originais e
   aplica esse adendo por cima. */
function carregarOverrides() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("Não foi possível ler os resultados salvos:", e);
    return {};
  }
}

function salvarOverrides(overrides) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(overrides));
    return true;
  } catch (e) {
    console.warn("Não foi possível salvar:", e);
    return false;
  }
}

// Retorna os jogos já com as edições do painel administrativo aplicadas
function getJogosAtuais() {
  const overrides = carregarOverrides();
  return jogos.map(j => {
    const o = overrides[j.id];
    return o ? { ...j, ...o } : { ...j };
  });
}

/* ---------------- Utilidades ---------------- */
function buscarLogoDoTime(nomeTime) {
  const time = times.find(t => t.nome === nomeTime);
  return time ? time.logo : "";
}

function classeDoStatus(status) {
  switch (status) {
    case "ao_vivo": return "status-em-andamento";
    case "finalizada": return "status-finalizado";
    default: return "status-a-jogar";
  }
}

function textoDoStatus(status) {
  switch (status) {
    case "ao_vivo": return "Ao vivo";
    case "finalizada": return "Finalizada";
    default: return "Em breve";
  }
}

function resultadoDoJogo(jogo) {
  // "vitoriaA" | "vitoriaB" | "empate" | null (ainda não jogado)
  if (jogo.status !== "finalizada" || jogo.placarA === null || jogo.placarB === null) return null;
  if (jogo.placarA > jogo.placarB) return "vitoriaA";
  if (jogo.placarB > jogo.placarA) return "vitoriaB";
  return "empate";
}

/* ---------------- CÁLCULO AUTOMÁTICO DA CLASSIFICAÇÃO ---------------- */
function calcularClassificacao(jogosAtuais) {
  const stats = {};
  times.forEach(t => {
    stats[t.nome] = { time: t.nome, jogos: 0, vitorias: 0, derrotas: 0, empates: 0, saldo: 0, pontos: 0, confrontos: {} };
  });

  jogosAtuais.forEach(jogo => {
    const resultado = resultadoDoJogo(jogo);
    if (!resultado) return;
    const a = stats[jogo.timeA];
    const b = stats[jogo.timeB];
    if (!a || !b) return; // time desconhecido, ignora

    a.jogos += 1;
    b.jogos += 1;
    a.saldo += (jogo.placarA - jogo.placarB);
    b.saldo += (jogo.placarB - jogo.placarA);

    if (resultado === "vitoriaA") {
      a.vitorias += 1; b.derrotas += 1;
      a.pontos += PONTOS_VITORIA; b.pontos += PONTOS_DERROTA;
      a.confrontos[jogo.timeB] = "venceu"; b.confrontos[jogo.timeA] = "perdeu";
    } else if (resultado === "vitoriaB") {
      b.vitorias += 1; a.derrotas += 1;
      b.pontos += PONTOS_VITORIA; a.pontos += PONTOS_DERROTA;
      b.confrontos[jogo.timeA] = "venceu"; a.confrontos[jogo.timeB] = "perdeu";
    } else {
      a.empates += 1; b.empates += 1;
      a.pontos += PONTOS_EMPATE; b.pontos += PONTOS_EMPATE;
      a.confrontos[jogo.timeB] = "empate"; b.confrontos[jogo.timeA] = "empate";
    }
  });

  const lista = Object.values(stats);

  // Critérios de desempate, na ordem pedida:
  // 1) Pontos  2) Saldo de mapas/rounds  3) Confronto direto  4) Ordem alfabética
  lista.sort((x, y) => {
    if (y.pontos !== x.pontos) return y.pontos - x.pontos;
    if (y.saldo !== x.saldo) return y.saldo - x.saldo;

    const direto = x.confrontos[y.time];
    if (direto === "venceu") return -1;
    if (direto === "perdeu") return 1;

    return x.time.localeCompare(y.time, "pt-BR");
  });

  lista.forEach((item, i) => { item.posicao = i + 1; });
  return lista;
}

/* ---------------- 1. PATROCINADORES ---------------- */
function renderSponsors() {
  const track = document.getElementById("sponsorsTrack");
  if (!track) return;
  track.innerHTML = sponsors.map(sp => {
    const img = `<img src="${sp.logo}" alt="${sp.nome}" loading="lazy">`;
    return `
      <div class="sponsor-item">
        ${sp.link ? `<a href="${sp.link}" target="_blank" rel="noopener">${img}</a>` : img}
      </div>
    `;
  }).join("");
}

/* ---------------- 2. TIMES ---------------- */
function renderTimes() {
  const container = document.getElementById("teamsGrid");
  if (!container) return;
  container.innerHTML = times.map(time => {
    // Se teams-data.js estiver carregado, linka pra página própria da equipe (ver pasta /equipes)
    const slug = (typeof equipesInfo !== "undefined" && equipesInfo[time.nome] && equipesInfo[time.nome].slug) || "";
    const abre = slug ? `<a href="../../equipes/time.html?slug=${slug}" class="team-card">` : `<div class="team-card">`;
    const fecha = slug ? "</a>" : "</div>";
    return `
    ${abre}
      <div class="team-logo-wrap">
        <img src="${time.logo}" alt="Logo ${time.nome}">
      </div>
      <div class="team-name">${time.nome}</div>
      <span class="team-status">${time.status}</span>
    ${fecha}
  `;
  }).join("");
}

/* ---------------- 3. CLASSIFICAÇÃO ---------------- */
function renderClassificacao(jogosAtuais) {
  const corpo = document.getElementById("standingsBody");
  if (!corpo) return;
  const classificacao = calcularClassificacao(jogosAtuais);

  corpo.innerHTML = classificacao.map(item => `
    <tr class="${item.posicao <= 4 ? "top-four" : ""}">
      <td class="col-position"><span class="pos-badge">${item.posicao}</span></td>
      <td class="col-team">
        <div class="team-cell">
          <img src="${buscarLogoDoTime(item.time)}" alt="Logo ${item.time}">
          <span>${item.time}</span>
        </div>
      </td>
      <td data-label="J">${item.jogos}</td>
      <td data-label="V">${item.vitorias}</td>
      <td data-label="D">${item.derrotas}</td>
      <td data-label="SD">${item.saldo > 0 ? "+" + item.saldo : item.saldo}</td>
      <td data-label="Pts"><strong>${item.pontos}</strong></td>
    </tr>
  `).join("");

  // Versão em cards, usada automaticamente no celular via CSS
  const cardsWrap = document.getElementById("standingsCards");
  if (cardsWrap) {
    cardsWrap.innerHTML = classificacao.map(item => `
      <div class="standing-card ${item.posicao <= 4 ? "top-four" : ""}">
        <div class="standing-card-top">
          <span class="pos-badge">${item.posicao}</span>
          <div class="team-cell">
            <img src="${buscarLogoDoTime(item.time)}" alt="Logo ${item.time}">
            <span>${item.time}</span>
          </div>
          <strong class="standing-card-pts">${item.pontos} pts</strong>
        </div>
        <div class="standing-card-stats">
          <span>J <strong>${item.jogos}</strong></span>
          <span>V <strong>${item.vitorias}</strong></span>
          <span>D <strong>${item.derrotas}</strong></span>
          <span>SD <strong>${item.saldo > 0 ? "+" + item.saldo : item.saldo}</strong></span>
        </div>
      </div>
    `).join("");
  }
}

/* ---------------- Card de partida (reutilizado em Resultados e Cronograma) ---------------- */
function montarCardPartida(jogo, { mostrarExtras = true } = {}) {
  const resultado = resultadoDoJogo(jogo);
  const classeA = resultado === "vitoriaA" ? "is-vencedor" : (resultado === "vitoriaB" ? "is-perdedor" : "");
  const classeB = resultado === "vitoriaB" ? "is-vencedor" : (resultado === "vitoriaA" ? "is-perdedor" : "");
  const jogado = jogo.status === "finalizada" && jogo.placarA !== null && jogo.placarB !== null;

  const placarHtml = jogado
    ? `<span class="placar-num ${classeA}">${jogo.placarA}</span><span class="dash">x</span><span class="placar-num ${classeB}">${jogo.placarB}</span>`
    : `<span class="dash">vs</span>`;

  const extras = mostrarExtras ? `
    <div class="match-extra">
      ${jogo.mapa ? `<span class="match-extra-item"><strong>Mapa:</strong> ${jogo.mapa}</span>` : ""}
      ${jogo.mvp ? `<span class="match-extra-item"><strong>MVP:</strong> ${jogo.mvp}</span>` : ""}
      ${jogo.vod ? `<a class="match-extra-item match-vod" href="${jogo.vod}" target="_blank" rel="noopener">Assistir VOD →</a>` : ""}
    </div>
  ` : "";

  return `
    <div class="match-card" data-rodada="${jogo.rodada}" data-timea="${jogo.timeA}" data-timeb="${jogo.timeB}" data-status="${jogo.status}">
      <div class="match-time">
        <span class="time">${jogo.data ? jogo.data + " · " : ""}${jogo.horario}${jogo.diaSemana ? " · " + jogo.diaSemana : ""}</span>
        <span class="match-format">${jogo.formato}</span>
      </div>
      <div class="match-teams">
        <div class="match-team ${classeA}">
          <img src="${buscarLogoDoTime(jogo.timeA)}" alt="Logo ${jogo.timeA}">
          <span>${jogo.timeA}</span>
        </div>
        <div class="match-score">${placarHtml}</div>
        <div class="match-team ${classeB}">
          <img src="${buscarLogoDoTime(jogo.timeB)}" alt="Logo ${jogo.timeB}">
          <span>${jogo.timeB}</span>
        </div>
      </div>
      ${extras}
      <div class="match-status ${classeDoStatus(jogo.status)}">${textoDoStatus(jogo.status)}</div>
    </div>
  `;
}

/* ---------------- 4. RESULTADOS (com filtros) ---------------- */
let filtroRodadaAtual = "todas";
let filtroTimeAtual = "todos";
let buscaAtual = "";

function popularFiltros() {
  const selRodada = document.getElementById("filtroRodada");
  const selTime = document.getElementById("filtroTime");
  if (!selRodada || !selTime) return;

  const rodadas = [...new Set(jogos.map(j => j.rodada))].sort((a, b) => a - b);
  selRodada.innerHTML = `<option value="todas">Todas as rodadas</option>` +
    rodadas.map(r => `<option value="${r}">Rodada ${r}</option>`).join("");

  selTime.innerHTML = `<option value="todos">Todos os times</option>` +
    times.map(t => `<option value="${t.nome}">${t.nome}</option>`).join("");
}

function renderResultados(jogosAtuais) {
  const container = document.getElementById("resultadosContainer");
  if (!container) return;

  let filtrados = jogosAtuais.filter(j => {
    if (filtroRodadaAtual !== "todas" && String(j.rodada) !== String(filtroRodadaAtual)) return false;
    if (filtroTimeAtual !== "todos" && j.timeA !== filtroTimeAtual && j.timeB !== filtroTimeAtual) return false;
    if (buscaAtual) {
      const alvo = (j.timeA + " " + j.timeB).toLowerCase();
      if (!alvo.includes(buscaAtual.toLowerCase())) return false;
    }
    return true;
  });

  // Agrupa por rodada, mantendo a ordem
  const grupos = [];
  filtrados.forEach(jogo => {
    let grupo = grupos.find(g => g.rodada === jogo.rodada);
    if (!grupo) { grupo = { rodada: jogo.rodada, itens: [] }; grupos.push(grupo); }
    grupo.itens.push(jogo);
  });
  grupos.sort((a, b) => a.rodada - b.rodada);

  container.innerHTML = grupos.length ? grupos.map(grupo => `
    <div class="game-group">
      <h3 class="game-group-title">Rodada ${grupo.rodada}</h3>
      <div class="games-grid">
        ${grupo.itens.map(j => montarCardPartida(j, { mostrarExtras: true })).join("")}
      </div>
    </div>
  `).join("") : `<p class="empty-state">Nenhuma partida encontrada com esse filtro.</p>`;

  // Contadores
  const total = jogosAtuais.length;
  const finalizadas = jogosAtuais.filter(j => j.status === "finalizada").length;
  const restantes = total - finalizadas;
  const elDisputadas = document.getElementById("contadorDisputadas");
  const elRestantes = document.getElementById("contadorRestantes");
  if (elDisputadas) elDisputadas.textContent = finalizadas;
  if (elRestantes) elRestantes.textContent = restantes;
}

/* ---------------- 5. CRONOGRAMA ---------------- */
function renderCronograma(jogosAtuais) {
  const container = document.getElementById("cronogramaContainer");
  if (!container) return;

  const grupos = [];
  jogosAtuais.forEach(jogo => {
    let grupo = grupos.find(g => g.rodada === jogo.rodada);
    if (!grupo) { grupo = { rodada: jogo.rodada, itens: [] }; grupos.push(grupo); }
    grupo.itens.push(jogo);
  });
  grupos.sort((a, b) => a.rodada - b.rodada);

  container.innerHTML = grupos.map(grupo => `
    <div class="game-group">
      <h3 class="game-group-title">Rodada ${grupo.rodada}</h3>
      <div class="games-grid">
        ${grupo.itens.map(j => montarCardPartida(j, { mostrarExtras: false })).join("")}
      </div>
    </div>
  `).join("");
}

/* ---------------- 6. SEMIFINAIS / CHAVEAMENTO ---------------- */

// Monta uma linha de time dentro do chaveamento (usado nas semis e na final)
function montarSlotTime(nomeTime, seed, venceu, indefinido, placar, jogado) {
  const placarHtml = jogado ? `<span class="bracket-row-score">${placar}</span>` : "";

  if (indefinido) {
    return `
      <div class="bracket-row bracket-row-tbd">
        <span class="bracket-seed">?</span>
        <span class="bracket-team-name">${nomeTime}</span>
        ${placarHtml}
      </div>
    `;
  }
  return `
    <div class="bracket-row ${venceu === true ? "is-vencedor" : ""} ${venceu === false ? "is-eliminado" : ""}">
      ${seed ? `<span class="bracket-seed">${seed}</span>` : ""}
      <img src="${buscarLogoDoTime(nomeTime)}" alt="Logo ${nomeTime}" class="bracket-team-logo">
      <span class="bracket-team-name">${nomeTime}</span>
      ${placarHtml}
    </div>
  `;
}

function montarCardChaveamento(cfg, timeA, timeB, seedA, seedB) {
  const jogado = cfg.status === "finalizada" && cfg.placarA !== null && cfg.placarB !== null;
  const vencedorA = jogado ? cfg.placarA > cfg.placarB : null;
  const vencedorB = jogado ? cfg.placarB > cfg.placarA : null;

  return `
    <div class="bracket-match" data-status="${cfg.status}">
      <div class="bracket-match-head">
        <span class="bracket-match-name">${cfg.nome}</span>
        <span class="match-status ${classeDoStatus(cfg.status)}">${textoDoStatus(cfg.status)}</span>
      </div>
      <div class="bracket-match-body">
        ${montarSlotTime(timeA, seedA, vencedorA, timeA === "A definir", cfg.placarA, jogado)}
        <div class="bracket-row-divider"><span>vs</span></div>
        ${montarSlotTime(timeB, seedB, vencedorB, timeB === "A definir", cfg.placarB, jogado)}
      </div>
      <div class="bracket-match-meta">
        <span class="semi-tag">${cfg.dia}</span>
        <span class="semi-tag">${cfg.horario}</span>
        <span class="semi-tag">${cfg.formato}</span>
      </div>
    </div>
  `;
}

function renderSemifinais(jogosAtuais) {
  const container = document.getElementById("semisGrid");
  const finalContainer = document.getElementById("finalSlot");
  if (!container) return;

  const classificacao = calcularClassificacao(jogosAtuais || getJogosAtuais());
  const porPosicao = {};
  classificacao.forEach(item => { porPosicao[item.posicao] = item.time; });

  // Chaveamento automático: 1º x 4º / 2º x 3º
  const sf1 = semifinaisConfig[0];
  const sf2 = semifinaisConfig[1];
  const sf1TimeA = porPosicao[sf1.seedA] || "A definir";
  const sf1TimeB = porPosicao[sf1.seedB] || "A definir";
  const sf2TimeA = porPosicao[sf2.seedA] || "A definir";
  const sf2TimeB = porPosicao[sf2.seedB] || "A definir";

  container.innerHTML =
    montarCardChaveamento(sf1, sf1TimeA, sf1TimeB, sf1.seedA, sf1.seedB) +
    montarCardChaveamento(sf2, sf2TimeA, sf2TimeB, sf2.seedA, sf2.seedB);

  if (!finalContainer) return;

  // Times da final: só ficam definidos depois que cada semifinal termina (MD3, 2 mapas)
  const vencedorSf1 = (sf1.status === "finalizada" && sf1.placarA !== null && sf1.placarB !== null)
    ? (sf1.placarA > sf1.placarB ? sf1TimeA : sf1TimeB) : "A definir";
  const vencedorSf2 = (sf2.status === "finalizada" && sf2.placarA !== null && sf2.placarB !== null)
    ? (sf2.placarA > sf2.placarB ? sf2TimeA : sf2TimeB) : "A definir";

  finalContainer.innerHTML = montarCardChaveamento(finalConfig, vencedorSf1, vencedorSf2, "", "");
}

/* ---------------- 7. PAINEL ADMINISTRATIVO ---------------- */
function popularSelectsAdmin() {
  const selJogo = document.getElementById("adminSelectJogo");
  if (!selJogo) return;
  const jogosAtuais = getJogosAtuais();

  selJogo.innerHTML = jogosAtuais.map(j =>
    `<option value="${j.id}">Rodada ${j.rodada} — ${j.timeA} x ${j.timeB}</option>`
  ).join("");

  if (jogosAtuais.length) preencherFormularioAdmin(jogosAtuais[0]);
}

function preencherFormularioAdmin(jogo) {
  document.getElementById("adminTimeALabel").textContent = jogo.timeA;
  document.getElementById("adminTimeBLabel").textContent = jogo.timeB;
  document.getElementById("adminPlacarA").value = jogo.placarA ?? "";
  document.getElementById("adminPlacarB").value = jogo.placarB ?? "";
  document.getElementById("adminMapa").value = jogo.mapa || "";
  document.getElementById("adminData").value = jogo.data || "";
  document.getElementById("adminHorario").value = jogo.horario || "";
  document.getElementById("adminMvp").value = jogo.mvp || "";
  document.getElementById("adminVod").value = jogo.vod || "";
  document.getElementById("adminStatus").value = jogo.status || "agendado";
}

function initAdmin() {
  const form = document.getElementById("adminForm");
  const selJogo = document.getElementById("adminSelectJogo");
  const lockScreen = document.getElementById("adminLock");
  const panel = document.getElementById("adminPanel");
  const btnEntrar = document.getElementById("adminEntrar");
  const btnExportar = document.getElementById("adminExportar");
  const btnLimpar = document.getElementById("adminLimparTudo");
  const feedback = document.getElementById("adminFeedback");
  if (!form || !selJogo || !lockScreen || !panel) return;

  btnEntrar.addEventListener("click", () => {
    const senha = document.getElementById("adminSenhaInput").value;
    if (senha === ADMIN_SENHA) {
      lockScreen.style.display = "none";
      panel.style.display = "block";
      popularSelectsAdmin();
    } else {
      document.getElementById("adminLockErro").textContent = "Senha incorreta. Tente novamente.";
    }
  });

  selJogo.addEventListener("change", () => {
    const jogosAtuais = getJogosAtuais();
    const jogo = jogosAtuais.find(j => String(j.id) === selJogo.value);
    if (jogo) preencherFormularioAdmin(jogo);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Number(selJogo.value);
    const overrides = carregarOverrides();

    const placarAraw = document.getElementById("adminPlacarA").value;
    const placarBraw = document.getElementById("adminPlacarB").value;

    overrides[id] = {
      placarA: placarAraw === "" ? null : Number(placarAraw),
      placarB: placarBraw === "" ? null : Number(placarBraw),
      mapa: document.getElementById("adminMapa").value,
      data: document.getElementById("adminData").value,
      horario: document.getElementById("adminHorario").value,
      mvp: document.getElementById("adminMvp").value,
      vod: document.getElementById("adminVod").value,
      status: document.getElementById("adminStatus").value
    };

    const ok = salvarOverrides(overrides);
    feedback.textContent = ok
      ? "Resultado salvo neste navegador! A classificação, os resultados e o cronograma já foram atualizados abaixo."
      : "Não deu pra salvar (o navegador bloqueou o armazenamento local).";
    feedback.className = ok ? "admin-feedback ok" : "admin-feedback erro";

    atualizarTudo();
    setTimeout(() => { feedback.textContent = ""; }, 5000);
  });

  btnLimpar.addEventListener("click", () => {
    if (!confirm("Isso vai apagar TODOS os resultados salvos neste navegador (volta pro que está escrito no script.js). Continuar?")) return;
    localStorage.removeItem(LS_KEY);
    popularSelectsAdmin();
    atualizarTudo();
  });

  btnExportar.addEventListener("click", () => {
    const jogosAtuais = getJogosAtuais();
    const codigo = gerarCodigoJogos(jogosAtuais);
    const caixa = document.getElementById("adminExportBox");
    caixa.style.display = "block";
    caixa.value = codigo;
    caixa.focus();
    caixa.select();
  });
}

// Gera o texto pronto pra colar no lugar do array "const jogos = [...]" do script.js
function gerarCodigoJogos(jogosAtuais) {
  const linhas = jogosAtuais.map(j => {
    const campo = (v) => (v === null || v === undefined) ? "null" : (typeof v === "number" ? v : `"${String(v).replace(/"/g, '\\"')}"`);
    return `  { id: ${j.id}, rodada: ${j.rodada}, diaSemana: ${campo(j.diaSemana)}, horario: ${campo(j.horario)}, data: ${campo(j.data)}, timeA: ${campo(j.timeA)}, timeB: ${campo(j.timeB)}, placarA: ${campo(j.placarA)}, placarB: ${campo(j.placarB)}, mapa: ${campo(j.mapa)}, mvp: ${campo(j.mvp)}, vod: ${campo(j.vod)}, formato: ${campo(j.formato)}, status: ${campo(j.status)} }`;
  });
  return "const jogos = [\n" + linhas.join(",\n") + "\n];";
}

/* ---------------- MENU MOBILE ---------------- */
function initMenuMobile() {
  const botao = document.getElementById("navToggle");
  const menu = document.getElementById("mainNav");
  if (!botao || !menu) return;

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("open");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  });

  menu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      botao.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------- ATUALIZA TUDO DE UMA VEZ ---------------- */
function atualizarTudo() {
  const jogosAtuais = getJogosAtuais();
  renderClassificacao(jogosAtuais);
  renderResultados(jogosAtuais);
  renderCronograma(jogosAtuais);
  renderSemifinais(jogosAtuais);

  // Pequena animação de destaque quando os dados mudam
  document.querySelectorAll(".standings-table tbody tr, .standing-card").forEach(el => {
    el.classList.remove("just-updated");
    void el.offsetWidth; // força reflow pra reiniciar a animação
    el.classList.add("just-updated");
  });
}

/* ---------------- FILTROS DE RESULTADOS ---------------- */
function initFiltros() {
  const selRodada = document.getElementById("filtroRodada");
  const selTime = document.getElementById("filtroTime");
  const inputBusca = document.getElementById("filtroBusca");
  if (!selRodada || !selTime || !inputBusca) return;

  selRodada.addEventListener("change", () => { filtroRodadaAtual = selRodada.value; renderResultados(getJogosAtuais()); });
  selTime.addEventListener("change", () => { filtroTimeAtual = selTime.value; renderResultados(getJogosAtuais()); });
  inputBusca.addEventListener("input", () => { buscaAtual = inputBusca.value; renderResultados(getJogosAtuais()); });
}

/* ---------------- INICIALIZAÇÃO ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderSponsors();
  renderTimes();
  popularFiltros();
  initFiltros();
  initMenuMobile();
  initAdmin();
  atualizarTudo();
});

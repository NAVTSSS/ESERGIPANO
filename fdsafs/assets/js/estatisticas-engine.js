/* ================================================================
   ESTATISTICAS-ENGINE.JS — motor do painel de estatísticas
   ================================================================
   Não precisa mexer aqui no dia a dia. Tudo aqui é CALCULADO
   automaticamente a partir dos jogos cadastrados em
   assets/js/valorant-data.js (rodada, placar e mvp de cada
   partida). Quando novas modalidades tiverem jogos/mvp
   cadastrados do mesmo jeito, é só somar as listas nas funções
   abaixo.

   "Ranking de jogadores" e "MVPs" usam o campo "mvp" de cada
   jogo (texto livre com o nick do jogador). Ainda não existe uma
   base própria de estatísticas por jogador (kills/assists/etc) —
   por isso o ranking aqui é por NÚMERO DE MVPs conquistados.
================================================================ */

/* ---------------- ÍCONES (SVG inline, sem depender de bibliotecas externas) ---------------- */
const ICONE_MEDALHA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="m8.21 13.89-1.51 6.32a.5.5 0 0 0 .74.55L11 18.5l3.56 2.26a.5.5 0 0 0 .74-.55l-1.51-6.32"/></svg>`;
const ICONE_ESPADAS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20 20 4"/><path d="M20 20 4 4"/><path d="m4 20 2-2M20 20l-2-2M4 4l2 2M20 4l-2 2"/></svg>`;

/* Badge de posição no ranking — 1º/2º/3º ganham cor de pódio (ouro/prata/bronze) */
function posBadge(posicao) {
  const classeRank = posicao === 1 ? "rank-1" : posicao === 2 ? "rank-2" : posicao === 3 ? "rank-3" : "";
  return `<span class="pos-badge ${classeRank}">${posicao}</span>`;
}

/* Estado vazio compacto, reutilizado em tabelas e listas */
function miniVazio(icone, texto) {
  return `<div class="mini-vazio">${icone}<span>${texto}</span></div>`;
}

function todosOsJogosFinalizados() {
  if (typeof getJogosAtuais === "undefined") return [];
  return getJogosAtuais().filter(j => j.status === "finalizada" && j.placarA !== null && j.placarB !== null);
}

/* ---------------- RANKING DE EQUIPES ---------------- */
function rankingDeEquipes() {
  if (typeof calcularClassificacao === "undefined" || typeof getJogosAtuais === "undefined") return [];
  return calcularClassificacao(getJogosAtuais());
}

/* ---------------- RANKING DE JOGADORES (por MVPs) ---------------- */
function rankingDeJogadores() {
  const contagem = {};
  todosOsJogosFinalizados().forEach(j => {
    if (!j.mvp) return;
    if (!contagem[j.mvp]) contagem[j.mvp] = { nome: j.mvp, mvps: 0, ultimoJogo: null };
    contagem[j.mvp].mvps += 1;
    contagem[j.mvp].ultimoJogo = `${j.timeA} x ${j.timeB} (rodada ${j.rodada})`;
  });
  return Object.values(contagem).sort((a, b) => b.mvps - a.mvps);
}

/* ---------------- MVP DA RODADA (última rodada com jogos finalizados) ---------------- */
function mvpDaRodada() {
  const finalizados = todosOsJogosFinalizados();
  if (!finalizados.length) return [];
  const maiorRodada = Math.max(...finalizados.map(j => j.rodada));
  return finalizados.filter(j => j.rodada === maiorRodada && j.mvp).map(j => ({
    rodada: j.rodada, mvp: j.mvp, confronto: `${j.timeA} ${j.placarA} x ${j.placarB} ${j.timeB}`
  }));
}

/* ---------------- MVP DO CAMPEONATO (mais MVPs no total) ---------------- */
function mvpDoCampeonato() {
  const ranking = rankingDeJogadores();
  return ranking.length ? ranking[0] : null;
}

/* ---------------- MAIOR SEQUÊNCIA DE VITÓRIAS ---------------- */
function maiorSequenciaDeVitorias() {
  if (typeof times === "undefined") return [];
  const finalizados = todosOsJogosFinalizados().sort((a, b) => a.id - b.id);

  return times.map(t => {
    let atual = 0, melhor = 0;
    finalizados.forEach(j => {
      if (j.timeA !== t.nome && j.timeB !== t.nome) return;
      const venceu = (j.timeA === t.nome && j.placarA > j.placarB) || (j.timeB === t.nome && j.placarB > j.placarA);
      if (venceu) { atual += 1; melhor = Math.max(melhor, atual); }
      else { atual = 0; }
    });
    return { time: t.nome, sequencia: melhor };
  }).sort((a, b) => b.sequencia - a.sequencia);
}

/* ---------------- MELHOR SALDO DE MAPAS/ROUNDS ---------------- */
function melhorSaldoDeMapas() {
  return rankingDeEquipes().slice().sort((a, b) => b.saldo - a.saldo);
}

/* ---------------- TAXA DE VITÓRIA ---------------- */
function taxaDeVitoria() {
  return rankingDeEquipes().map(t => ({
    time: t.time,
    jogos: t.jogos,
    vitorias: t.vitorias,
    taxa: t.jogos > 0 ? Math.round((t.vitorias / t.jogos) * 100) : 0
  })).sort((a, b) => b.taxa - a.taxa);
}

/* ---------------- HISTÓRICO DE CONFRONTOS ENTRE EQUIPES ---------------- */
function historicoDeConfrontos() {
  const finalizados = todosOsJogosFinalizados();
  const confrontos = {};
  finalizados.forEach(j => {
    const chave = [j.timeA, j.timeB].sort().join(" vs ");
    if (!confrontos[chave]) confrontos[chave] = [];
    confrontos[chave].push(j);
  });
  return Object.entries(confrontos).map(([par, lista]) => ({ par, jogos: lista }));
}

/* ---------------- RENDER GERAL DA PÁGINA ---------------- */
function renderEstatisticas() {
  if (typeof times === "undefined") {
    const aviso = document.getElementById("estatisticasAviso");
    if (aviso) aviso.style.display = "block";
    return;
  }

  // Ranking de equipes
  const corpoEquipes = document.getElementById("rankingEquipesBody");
  if (corpoEquipes) {
    const equipes = rankingDeEquipes();
    corpoEquipes.innerHTML = equipes.length ? equipes.map(t => `
      <tr class="${t.posicao === 1 ? "top-four" : ""}">
        <td class="col-position">${posBadge(t.posicao)}</td>
        <td class="col-team-nome">${t.time}${t.posicao === 1 ? '<span class="lider-tag">Líder</span>' : ""}</td>
        <td>${t.jogos}</td>
        <td>${t.vitorias}</td>
        <td>${t.derrotas}</td>
        <td>${t.saldo > 0 ? "+" + t.saldo : t.saldo}</td>
        <td><strong>${t.pontos}</strong></td>
      </tr>
    `).join("") : `<tr><td colspan="7">${miniVazio(ICONE_ESPADAS, "Nenhum jogo cadastrado ainda.")}</td></tr>`;
  }

  // Ranking de jogadores
  const corpoJogadores = document.getElementById("rankingJogadoresBody");
  const jogadores = rankingDeJogadores();
  if (corpoJogadores) {
    corpoJogadores.innerHTML = jogadores.length ? jogadores.map((j, i) => `
      <tr class="${i === 0 ? "top-four" : ""}">
        <td class="col-position">${posBadge(i + 1)}</td>
        <td class="col-team-nome">${j.nome}</td>
        <td>${j.mvps}</td>
        <td>${j.ultimoJogo}</td>
      </tr>
    `).join("") : `<tr><td colspan="4">${miniVazio(ICONE_MEDALHA, "Nenhum MVP cadastrado ainda.")}</td></tr>`;
  }

  // MVP da rodada
  const listaMvpRodada = document.getElementById("mvpRodadaLista");
  if (listaMvpRodada) {
    const mvps = mvpDaRodada();
    listaMvpRodada.innerHTML = mvps.length ? mvps.map(m => `
      <div class="mvp-rodada-card">
        <div class="mvp-rodada-icon">${ICONE_MEDALHA}</div>
        <div>
          <div class="mvp-rodada-nome">${m.mvp}</div>
          <div class="mvp-rodada-info">${m.confronto} — rodada ${m.rodada}</div>
        </div>
      </div>
    `).join("") : miniVazio(ICONE_MEDALHA, "Nenhuma rodada finalizada ainda.");
  }

  // MVP do campeonato
  const mvpCampeonatoEl = document.getElementById("mvpCampeonato");
  if (mvpCampeonatoEl) {
    const mvp = mvpDoCampeonato();
    mvpCampeonatoEl.innerHTML = mvp
      ? `<span class="stat-destaque-nome">${mvp.nome}</span><span class="stat-destaque-sub">${mvp.mvps} MVP${mvp.mvps > 1 ? "s" : ""} na temporada</span>`
      : `<span class="stat-destaque-sub">Ainda sem dados suficientes.</span>`;
  }

  // Maior sequência de vitórias
  const sequenciaEl = document.getElementById("maiorSequencia");
  if (sequenciaEl) {
    const seq = maiorSequenciaDeVitorias()[0];
    sequenciaEl.innerHTML = seq && seq.sequencia > 0
      ? `<span class="stat-destaque-nome">${seq.time}</span><span class="stat-destaque-sub">${seq.sequencia} vitórias seguidas</span>`
      : `<span class="stat-destaque-sub">Ainda sem dados suficientes.</span>`;
  }

  // Melhor saldo
  const saldoEl = document.getElementById("melhorSaldo");
  if (saldoEl) {
    const melhor = melhorSaldoDeMapas()[0];
    saldoEl.innerHTML = melhor
      ? `<span class="stat-destaque-nome">${melhor.time}</span><span class="stat-destaque-sub">Saldo de ${melhor.saldo > 0 ? "+" + melhor.saldo : melhor.saldo} rounds</span>`
      : `<span class="stat-destaque-sub">Ainda sem dados suficientes.</span>`;
  }

  // Taxa de vitória
  const corpoTaxa = document.getElementById("taxaVitoriaBody");
  const taxas = taxaDeVitoria();
  if (corpoTaxa) {
    corpoTaxa.innerHTML = taxas.length ? taxas.map(t => `
      <tr>
        <td class="col-team-nome">${t.time}</td>
        <td>${t.jogos}</td>
        <td>${t.vitorias}</td>
        <td>
          <div class="taxa-cell">
            <strong>${t.taxa}%</strong>
            <div class="taxa-bar-wrap"><div class="taxa-bar-fill" data-largura="${t.taxa}"></div></div>
          </div>
        </td>
      </tr>
    `).join("") : `<tr><td colspan="4">${miniVazio(ICONE_ESPADAS, "Nenhum jogo cadastrado ainda.")}</td></tr>`;

    // Anima as barras depois de inseridas no DOM (double rAF garante que a transição rode)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        corpoTaxa.querySelectorAll(".taxa-bar-fill").forEach(el => {
          el.style.width = el.dataset.largura + "%";
        });
      });
    });
  }

  // Número de partidas disputadas (total da liga)
  const totalPartidasEl = document.getElementById("totalPartidas");
  if (totalPartidasEl) totalPartidasEl.textContent = todosOsJogosFinalizados().length;

  // Confrontos diretos
  const confrontosEl = document.getElementById("confrontosLista");
  if (confrontosEl) {
    const confrontos = historicoDeConfrontos();
    confrontosEl.innerHTML = confrontos.length ? confrontos.map(c => `
      <div class="confronto-card">
        <div class="confronto-card-head">
          <span class="confronto-icon">${ICONE_ESPADAS}</span>
          <span class="confronto-par">${c.par}</span>
        </div>
        ${c.jogos.map(j => `<span class="confronto-jogo">${j.timeA} ${j.placarA} x ${j.placarB} ${j.timeB} <em>(rodada ${j.rodada})</em></span>`).join("")}
      </div>
    `).join("") : miniVazio(ICONE_ESPADAS, "Nenhum confronto finalizado ainda.");
  }

  // Reobserva os elementos "reveal" que acabaram de entrar no DOM (cards de MVP e confrontos)
  initRevealEstatisticas();
}

/* ---------------- ANIMAÇÃO AO ROLAR A PÁGINA ---------------- */
function initRevealEstatisticas() {
  if (!window.__observerRevealEstatisticas) {
    window.__observerRevealEstatisticas = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("in-view");
          window.__observerRevealEstatisticas.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.in-view)").forEach(el => window.__observerRevealEstatisticas.observe(el));
}

document.addEventListener("DOMContentLoaded", renderEstatisticas);

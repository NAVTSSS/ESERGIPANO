/* ================================================================
   TEAMS-ENGINE.JS — motor das páginas de Equipes
   ================================================================
   Não precisa mexer aqui no dia a dia. Este arquivo:
   - junta os dados de resultado (assets/js/valorant-data.js)
     com os dados de perfil (assets/js/teams-data.js)
   - calcula vitórias, derrotas, saldo e aproveitamento de cada
     equipe automaticamente a partir dos jogos cadastrados
   - desenha o hub de equipes (equipes/index.html) e a página
     individual de cada equipe (equipes/time.html?slug=...)

   IMPORTANTE: por enquanto só o Valorant tem times/jogos
   cadastrados. Quando uma nova modalidade ganhar sua própria
   base de dados (times + jogos), basta somar essa lista aqui.
================================================================ */

function listaDeEquipes() {
  // Uma equipe = o que está em "times" (valorant-data.js) + o perfil em equipesInfo (teams-data.js)
  if (typeof times === "undefined") return [];
  return times.map(t => {
    const info = (typeof equipesInfo !== "undefined" && equipesInfo[t.nome]) ? equipesInfo[t.nome] : {};
    return {
      nome: t.nome,
      logoPerfil: info.logo || t.logo,
      slug: info.slug || t.nome.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      modalidadeId: info.modalidadeId || "valorant",
      organizacao: info.organizacao || "",
      redesSociais: info.redesSociais || {},
      elenco: info.elenco || []
    };
  });
}

function estatisticasDoTime(nome) {
  if (typeof getJogosAtuais === "undefined" || typeof calcularClassificacao === "undefined") return null;
  const classificacao = calcularClassificacao(getJogosAtuais());
  return classificacao.find(c => c.time === nome) || null;
}

function jogosDoTime(nome) {
  if (typeof getJogosAtuais === "undefined") return [];
  return getJogosAtuais()
    .filter(j => j.timeA === nome || j.timeB === nome)
    .sort((a, b) => a.id - b.id);
}

function listaDeEquipesPorModalidade(modalidadeId) {
  return listaDeEquipes().filter(eq => eq.modalidadeId === modalidadeId);
}

/* ---------------- SELETOR DE MODALIDADES (equipes/index.html) ----------------
   Aqui o usuário escolhe PRIMEIRO a modalidade, e só depois vê as equipes
   dela. Todas as modalidades aparecem e são clicáveis, mesmo as que ainda
   não têm equipe cadastrada — a página da modalidade é que avisa isso. */
function renderModalidadesEquipes() {
  const grid = document.getElementById("modalidadesEquipesGrid");
  if (!grid || typeof modalidades === "undefined") return;

  grid.innerHTML = modalidades.map(m => {
    const qtd = listaDeEquipesPorModalidade(m.id).length;
    return `
      <a href="modalidade.html?id=${m.id}" class="equipe-card reveal" style="--mc-rgb:${m.corPrimariaRgb}">
        <div class="equipe-card-logo"><img src="../${m.logo}" alt="Logo ${m.nome}"></div>
        <div class="equipe-card-nome">${m.nome}</div>
        <span class="equipe-card-link">${qtd > 0 ? `${qtd} equipe${qtd > 1 ? "s" : ""}` : "Ver equipes"} <span class="arrow">→</span></span>
      </a>
    `;
  }).join("");

  requestAnimationFrame(() => {
    const observer = new IntersectionObserver((entradas) => {
      entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in-view"); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  });
}

/* ---------------- EQUIPES DE UMA MODALIDADE (equipes/modalidade.html) ---------------- */
function renderEquipesDaModalidade() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const mod = (typeof modalidades !== "undefined") ? modalidades.find(m => m.id === id) : null;

  const cabecalho = document.getElementById("modalidadeCabecalho");
  const grid = document.getElementById("equipesDaModalidadeGrid");
  const vazio = document.getElementById("modalidadeVazio");
  if (!grid) return;

  if (!mod) {
    if (cabecalho) cabecalho.innerHTML = `<h1 class="pagina-titulo">Modalidade não encontrada</h1>`;
    return;
  }

  document.title = `Equipes — ${mod.nome} — ESERGIPANO 2026`;
  if (cabecalho) {
    cabecalho.innerHTML = `
      <div class="equipe-header" style="margin-bottom:0;">
        <img src="../${mod.logo}" alt="Logo ${mod.nome}" class="equipe-header-logo">
        <div>
          <span class="equipe-header-eyebrow">Equipes</span>
          <h1 class="equipe-header-nome">${mod.nome}</h1>
        </div>
      </div>
    `;
  }

  const equipesDaModalidade = listaDeEquipesPorModalidade(mod.id);

  if (!equipesDaModalidade.length) {
    grid.innerHTML = "";
    if (vazio) vazio.style.display = "block";
    return;
  }
  if (vazio) vazio.style.display = "none";

  grid.innerHTML = equipesDaModalidade.map(eq => {
    const stats = estatisticasDoTime(eq.nome);
    const aproveitamento = stats && stats.jogos > 0 ? Math.round((stats.vitorias / stats.jogos) * 100) : 0;
    return `
      <a href="time.html?slug=${eq.slug}" class="equipe-card reveal">
        <div class="equipe-card-logo"><img src="${eq.logoPerfil}" alt="Logo ${eq.nome}"></div>
        <div class="equipe-card-nome">${eq.nome}</div>
        <div class="equipe-card-stats">
          <span><strong>${stats ? stats.jogos : 0}</strong> jogos</span>
          <span><strong>${stats ? stats.vitorias : 0}</strong> vitórias</span>
          <span><strong>${aproveitamento}%</strong> aprov.</span>
        </div>
        <span class="equipe-card-link">Ver equipe <span class="arrow">→</span></span>
      </a>
    `;
  }).join("");

  requestAnimationFrame(() => {
    const observer = new IntersectionObserver((entradas) => {
      entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in-view"); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  });
}

/* ---------------- PÁGINA INDIVIDUAL (equipes/time.html) ---------------- */
const REDES_LABEL = { instagram: "Instagram", twitter: "Twitter/X", discord: "Discord", twitch: "Twitch" };

function renderPaginaTime() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const equipes = listaDeEquipes();
  const eq = equipes.find(e => e.slug === slug);

  const container = document.getElementById("timeConteudo");
  if (!container) return;

  if (!eq) {
    container.innerHTML = `
      <div class="equipe-nao-encontrada">
        <h2>Equipe não encontrada</h2>
        <p>Volte para o <a href="index.html">hub de equipes</a> e escolha uma equipe da lista.</p>
      </div>
    `;
    return;
  }

  const stats = estatisticasDoTime(eq.nome) || { jogos: 0, vitorias: 0, derrotas: 0, empates: 0, saldo: 0, pontos: 0, posicao: "-" };
  const aproveitamento = stats.jogos > 0 ? Math.round((stats.vitorias / stats.jogos) * 100) : 0;
  const jogos = jogosDoTime(eq.nome);

  document.title = `${eq.nome} — ESERGIPANO 2026`;

  const breadcrumb = document.getElementById("timeBreadcrumb");
  if (breadcrumb) {
    const mod = (typeof modalidades !== "undefined") ? modalidades.find(m => m.id === eq.modalidadeId) : null;
    breadcrumb.innerHTML = `<a href="../index.html">Home</a> / <a href="index.html">Equipes</a> / ${mod ? `<a href="modalidade.html?id=${mod.id}">${mod.nome}</a>` : "Equipes"} / ${eq.nome}`;
  }

  const redesHtml = Object.entries(eq.redesSociais).filter(([, v]) => v).map(([k, v]) => `
    <a href="${v}" target="_blank" rel="noopener" class="rede-link">${REDES_LABEL[k] || k}</a>
  `).join("") || `<span class="rede-vazia">Redes sociais ainda não cadastradas.</span>`;

  const elencoHtml = eq.elenco.length
    ? `<div class="elenco-grid">${eq.elenco.map(j => `
        <div class="elenco-item">
          <span class="elenco-nome">${j.nome}</span>
          <span class="elenco-funcao">${j.funcao || ""}</span>
        </div>`).join("")}</div>`
    : `<p class="elenco-vazio">Elenco ainda não cadastrado. Edite <code>assets/js/teams-data.js</code> para adicionar os jogadores.</p>`;

  const historicoHtml = jogos.length ? jogos.map(j => {
    const adversario = j.timeA === eq.nome ? j.timeB : j.timeA;
    const jogado = j.status === "finalizada" && j.placarA !== null && j.placarB !== null;
    const meuPlacar = j.timeA === eq.nome ? j.placarA : j.placarB;
    const placarAdv = j.timeA === eq.nome ? j.placarB : j.placarA;
    let resultadoClasse = "pendente", resultadoTexto = "A definir";
    if (jogado) {
      if (meuPlacar > placarAdv) { resultadoClasse = "vitoria"; resultadoTexto = "Vitória"; }
      else if (meuPlacar < placarAdv) { resultadoClasse = "derrota"; resultadoTexto = "Derrota"; }
      else { resultadoClasse = "empate"; resultadoTexto = "Empate"; }
    }
    return `
      <div class="historico-item ${resultadoClasse}">
        <span class="historico-rodada">Rodada ${j.rodada}</span>
        <span class="historico-confronto">vs ${adversario}</span>
        <span class="historico-placar">${jogado ? `${meuPlacar} x ${placarAdv}` : "vs"}</span>
        <span class="historico-resultado">${resultadoTexto}</span>
      </div>
    `;
  }).join("") : `<p class="elenco-vazio">Nenhum jogo cadastrado ainda para esta equipe.</p>`;

  container.innerHTML = `
    <div class="equipe-header">
      <img src="${eq.logoPerfil}" alt="Logo ${eq.nome}" class="equipe-header-logo">
      <div>
        <span class="equipe-header-eyebrow">${eq.modalidadeId.toUpperCase()}</span>
        <h1 class="equipe-header-nome">${eq.nome}</h1>
        <p class="equipe-header-org">${eq.organizacao}</p>
      </div>
    </div>

    <div class="equipe-stats-grid">
      <div class="equipe-stat-card"><span class="stat-num">${stats.jogos}</span><span class="stat-label">Partidas disputadas</span></div>
      <div class="equipe-stat-card"><span class="stat-num">${stats.vitorias}</span><span class="stat-label">Vitórias</span></div>
      <div class="equipe-stat-card"><span class="stat-num">${stats.derrotas}</span><span class="stat-label">Derrotas</span></div>
      <div class="equipe-stat-card"><span class="stat-num">${aproveitamento}%</span><span class="stat-label">Aproveitamento</span></div>
      <div class="equipe-stat-card"><span class="stat-num">${stats.saldo > 0 ? "+" + stats.saldo : stats.saldo}</span><span class="stat-label">Saldo de rounds</span></div>
      <div class="equipe-stat-card"><span class="stat-num">${stats.pontos}</span><span class="stat-label">Pontos</span></div>
    </div>

    <div class="equipe-secao">
      <h2>Elenco</h2>
      ${elencoHtml}
    </div>

    <div class="equipe-secao">
      <h2>Redes sociais</h2>
      <div class="redes-lista">${redesHtml}</div>
    </div>

    <div class="equipe-secao">
      <h2>Histórico na competição</h2>
      <div class="historico-lista">${historicoHtml}</div>
    </div>
  `;
}

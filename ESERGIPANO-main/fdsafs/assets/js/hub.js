/* ================================================================
   HUB.JS — motor da página inicial multi-modalidade
   ================================================================
   Não precisa mexer aqui no dia a dia. Os dados que você edita
   ficam em hub-data.js (enquanto o Firebase não estiver ativo) ou
   direto no painel administrativo (quando o Firebase estiver
   ativo — ver firebase-config.js).
================================================================ */

const ETIQUETAS_STATUS = {
  em_andamento: "Em andamento",
  inscricoes_abertas: "Inscrições abertas",
  agendada: "Data definida",
  em_breve: "Em breve",
  encerrada: "Encerrada"
};

/* ---------------- CAMADA DE DADOS (Firestore OU seed local) ---------------- */
let DB = { modalidades, noticias, patrocinadores, bannerPrincipal, bannerSecundario };

async function carregarDados() {
  const cfg = window.ESERGIPANO_FIREBASE;
  if (!cfg || !cfg.ativo) return DB; // Firebase ainda não configurado: usa os dados locais

  try {
    // Carregado dinamicamente só quando o Firebase está ativo, pra não pesar o site à toa
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
    const { getFirestore, collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

    const app = initializeApp(cfg.config);
    const db = getFirestore(app);

    const [modSnap, newsSnap, sponsSnap] = await Promise.all([
      getDocs(collection(db, "modalidades")),
      getDocs(collection(db, "noticias")),
      getDocs(collection(db, "patrocinadores"))
    ]);

    if (!modSnap.empty) DB.modalidades = modSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    if (!newsSnap.empty) DB.noticias = newsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    if (!sponsSnap.empty) DB.patrocinadores = sponsSnap.docs.map(d => d.data());

    console.info("ESERGIPANO: dados carregados do Firebase.");
  } catch (erro) {
    console.warn("ESERGIPANO: não deu pra carregar do Firebase, usando dados locais.", erro);
  }
  return DB;
}

/* ---------------- HERO PRINCIPAL ---------------- */
function renderHero() {
  const hero = document.getElementById("hero");
  const banner = DB.bannerPrincipal;
  const mod = DB.modalidades.find(m => m.id === banner.modalidadeId);
  if (mod) hero.style.setProperty("--mod-color-rgb", mod.corPrimariaRgb);

  document.getElementById("heroEyebrow").textContent = banner.eyebrow;
  document.getElementById("heroTitle").textContent = banner.titulo;
  document.getElementById("heroSub").textContent = banner.subtitulo || "";
  document.getElementById("heroText").textContent = banner.texto;
  const btn = document.getElementById("heroBtn");
  btn.href = banner.linkBotao;
  btn.textContent = banner.textoBotao;
}

/* ---------------- BANNER SECUNDÁRIO + CONTAGEM REGRESSIVA ---------------- */
function renderNextCard() {
  const card = document.getElementById("nextCard");
  const banner = DB.bannerSecundario;
  const mod = DB.modalidades.find(m => m.id === banner.modalidadeId);
  if (mod) card.style.setProperty("--next-color-rgb", mod.corPrimariaRgb);

  document.getElementById("nextLabel").textContent = banner.eyebrow;
  document.getElementById("nextTitle").textContent = banner.titulo;
  document.getElementById("nextText").textContent = banner.texto;

  if (!banner.dataInicioISO) {
    document.getElementById("countdown").style.display = "none";
    return;
  }

  const alvo = new Date(banner.dataInicioISO).getTime();

  function atualizar() {
    const agora = Date.now();
    const diff = Math.max(0, alvo - agora);

    const dias = Math.floor(diff / 86400000);
    const horas = Math.floor((diff % 86400000) / 3600000);
    const min = Math.floor((diff % 3600000) / 60000);
    const seg = Math.floor((diff % 60000) / 1000);

    document.getElementById("cdDias").textContent = String(dias).padStart(2, "0");
    document.getElementById("cdHoras").textContent = String(horas).padStart(2, "0");
    document.getElementById("cdMin").textContent = String(min).padStart(2, "0");
    document.getElementById("cdSeg").textContent = String(seg).padStart(2, "0");

    if (diff <= 0) clearInterval(intervalo);
  }

  atualizar();
  const intervalo = setInterval(atualizar, 1000);
}

/* ---------------- CARDS DE MODALIDADE ---------------- */
function renderModalidades() {
  const grid = document.getElementById("modalidadesGrid");
  grid.innerHTML = DB.modalidades.map(m => {
    const clicavel = m.linkPagina && m.linkPagina !== "#";
    const tag = clicavel ? "a" : "div";
    return `
      <${tag} ${clicavel ? `href="${m.linkPagina}"` : ""} class="modalidade-card reveal ${clicavel ? "" : "mc-disabled"}" style="--mc-rgb:${m.corPrimariaRgb}">
        <div class="mc-logo-wrap"><img src="${m.logo}" alt="Logo ${m.nome}" loading="lazy"></div>
        <div class="mc-nome">${m.nome}</div>
        <span class="mc-status">${ETIQUETAS_STATUS[m.status] || m.status}</span>
        <p class="mc-resumo">${m.resumo}</p>
        <span class="mc-link">${clicavel ? "Ver campeonato" : m.dataInfo} ${clicavel ? '<span class="arrow">→</span>' : ""}</span>
      </${tag}>
    `;
  }).join("");
}

/* ---------------- CALENDÁRIO DA TEMPORADA (prévia) ---------------- */
const ORDEM_STATUS = { em_andamento: 0, inscricoes_abertas: 1, agendada: 2, em_breve: 3, encerrada: 4 };

function renderCalendario() {
  const trilho = document.getElementById("calendarioTrilho");
  const ordenado = [...DB.modalidades].sort((a, b) => (ORDEM_STATUS[a.status] ?? 9) - (ORDEM_STATUS[b.status] ?? 9));

  trilho.innerHTML = ordenado.map(m => `
    <div class="cal-item reveal" style="--mc-rgb:${m.corPrimariaRgb}">
      <span class="cal-status-label">${ETIQUETAS_STATUS[m.status] || m.status}</span>
      <span class="cal-nome"><img class="cal-logo" src="${m.logo}" alt="" loading="lazy">${m.nome}</span>
      <span class="cal-info">${m.dataInfo}</span>
    </div>
  `).join("") + `
    <div class="cal-item reveal" style="--mc-rgb: 254,206,0">
      <span class="cal-status-label">Fechamento</span>
      <span class="cal-nome"><span class="cal-dot"></span>🏆 Grande Final ESERGIPANO</span>
      <span class="cal-info">Dezembro (data a definir)</span>
    </div>
  `;
}

/* ---------------- NOTÍCIAS ---------------- */
const ETIQUETAS_NOTICIA = {
  inscricoes: "Inscrições",
  datas: "Datas",
  resultado: "Resultado",
  regulamento: "Regulamento",
  modalidade: "Nova modalidade",
  final: "Grande Final"
};

function renderNoticias() {
  const grid = document.getElementById("noticiasGrid");
  grid.innerHTML = DB.noticias.map(n => `
    <article class="noticia-card reveal">
      <span class="noticia-tag">${ETIQUETAS_NOTICIA[n.tipo] || n.tipo}</span>
      <h3 class="noticia-titulo">${n.titulo}</h3>
      <p class="noticia-resumo">${n.resumo}</p>
      <span class="noticia-data">${n.data}</span>
    </article>
  `).join("");
}

/* ---------------- PATROCINADORES (grade estática) ---------------- */
function renderPatrocinadores() {
  const grid = document.getElementById("sponsorsGrid");
  if (!grid) return;

  grid.innerHTML = DB.patrocinadores.map(p => `
    <div class="sponsor-item">
      ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">` : ""}
        <img src="${p.logo}" alt="${p.nome}" loading="lazy">
      ${p.link ? "</a>" : ""}
    </div>
  `).join("");
}

/* ---------------- ANIMAÇÃO AO ROLAR A PÁGINA ---------------- */
function initReveal() {
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("in-view");
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
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
    link.addEventListener("click", () => { menu.classList.remove("open"); botao.setAttribute("aria-expanded", "false"); });
  });
}

/* ---------------- INICIALIZAÇÃO ---------------- */
document.addEventListener("DOMContentLoaded", async () => {
  await carregarDados();
  renderHero();
  renderNextCard();
  renderModalidades();
  renderCalendario();
  renderNoticias();
  renderPatrocinadores();
  initMenuMobile();
  // reveal precisa rodar depois que os cards existirem no DOM
  requestAnimationFrame(initReveal);
});

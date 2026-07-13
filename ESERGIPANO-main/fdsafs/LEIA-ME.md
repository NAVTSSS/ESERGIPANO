# ESERGIPANO 2026 — Estrutura do projeto (Fase 2: Equipes + Estatísticas)

## O que mudou nesta rodada (correções que você pediu)

1. **Logo do header** — tirei o texto "ESERGIPANO2026" do lado da logo.
   Agora é só a logo, maior, e clicável (leva de volta ao topo da
   página / para a home).
2. **Carrossel de patrocinadores** — reescrito em JavaScript (antes
   era só CSS). O bug de "passar e depois travar com um vazio" era
   a animação perdendo a sincronia; agora o loop é calculado a cada
   frame e nunca para.
3. **TFT** — agora mostra "Agosto de 2026", igual ao League of
   Legends, em vez de "Mês que vem".
4. **Logos das modalidades** — troquei os emojis pelos logos oficiais
   de cada jogo nos cards da home e no calendário. Ficam em
   `assets/modalidades/`.
5. **Patrocinadores / Hall da Fama** — "Patrocinadores" agora rola até
   a seção corretamente (o header fixo estava cobrindo a âncora).
   "Hall da Fama" ganhou uma página própria (ainda simples, "em
   construção", já que os primeiros campeões só existirão depois da
   Grande Final).
6. **Equipes + Estatísticas** — as duas abas novas do menu, explicadas
   em detalhe mais abaixo.

## Estrutura de pastas

```
index.html                        → página inicial (hub multi-modalidade)

modalidades/
  valorant/index.html             → página do campeonato de Valorant
  cs2/index.html                  → (próxima fase) página do CS2
  ...                               cada modalidade nova ganha sua pasta aqui

equipes/
  index.html                      → hub com todas as equipes cadastradas
  time.html                       → página individual de uma equipe
                                     (o conteúdo muda pelo endereço, ex:
                                     time.html?slug=crab-esports)

estatisticas/
  index.html                      → ranking de equipes/jogadores, MVPs,
                                     sequências, saldo, confrontos diretos

hall-da-fama/
  index.html                      → página "em construção" por enquanto

assets/
  css/hub.css                     → visual da home e do cabeçalho
                                     compartilhado por TODAS as páginas
  css/campeonato.css              → visual compartilhado por toda página de
                                     campeonato (times, tabela, resultados...)
  css/paginas.css                 → visual das páginas de Equipes,
                                     Estatísticas e Hall da Fama
  js/hub-data.js                  → modalidades, notícias, patrocinadores (EDITE AQUI)
  js/hub.js                       → motor da home (não precisa mexer)
  js/valorant-data.js             → times, jogos e placares do Valorant (EDITE AQUI)
  js/teams-data.js                → organização, redes sociais e elenco de
                                     cada equipe (EDITE AQUI)
  js/teams-engine.js              → motor das páginas de Equipes (não mexe)
  js/estatisticas-engine.js        → motor do painel de Estatísticas (não mexe)
  js/firebase-config.js           → chaves do Firebase (ver GUIA-FIREBASE.md)
  modalidades/*.png               → logo oficial de cada modalidade
  *.png                           → logos (times, patrocinadores, campeonato)

GUIA-FIREBASE.md                  → passo a passo pra ligar o admin em tempo real
```

## Equipes — como funciona

Cada equipe tem duas partes de dado, em dois arquivos diferentes:

- **Resultado dos jogos** (vitórias, derrotas, saldo, aproveitamento):
  vem automaticamente de `assets/js/valorant-data.js` — você não
  edita nada disso na mão, é calculado a partir dos jogos e placares
  que você já cadastra ali.
- **Perfil da equipe** (organização, redes sociais, elenco):
  vem de `assets/js/teams-data.js`. É nesse arquivo que você:
  - preenche a descrição da organização;
  - adiciona os links de Instagram/Twitter/Discord/Twitch;
  - preenche o elenco, um jogador por linha:
    ```js
    elenco: [
      { nome: "NickDoJogador", funcao: "Duelista" },
    ]
    ```

O hub (`equipes/index.html`) lista todas as equipes automaticamente.
A página de cada equipe (`equipes/time.html?slug=...`) é uma só —
o conteúdo muda de acordo com o `slug` que vem no endereço, então
você não precisa criar um arquivo HTML novo pra cada time.

**Hoje só o Valorant tem equipes cadastradas.** Quando uma nova
modalidade ganhar sua própria base de times/jogos (no mesmo formato
do `valorant-data.js`), basta somar ela dentro de
`assets/js/teams-engine.js` (função `listaDeEquipes`) pra ela aparecer
no hub também.

## Estatísticas — como funciona

Tudo em `estatisticas/index.html` é **calculado automaticamente**, a
partir dos jogos finalizados (rodada, placar e MVP) já cadastrados em
`valorant-data.js`. Isso inclui:

- Ranking de equipes e de jogadores (por número de MVPs).
- MVP da rodada mais recente e MVP do campeonato.
- Maior sequência de vitórias.
- Melhor saldo de mapas/rounds.
- Taxa de vitória de cada equipe.
- Número de partidas disputadas na liga.
- Histórico de confrontos diretos entre equipes.

⚠️ Como ainda não existe uma base de estatísticas por jogador
(kills, assistências etc.), o "ranking de jogadores" por enquanto é
só por número de prêmios de MVP — é o único dado individual que já
existia nos jogos cadastrados. Se quiser estatísticas de jogador mais
completas (kills, ACS, etc.), me diga que eu construo a base de dados
pra isso na próxima fase.

## O que você edita no dia a dia (por enquanto)

- Modalidades, notícias, patrocinadores da home → `assets/js/hub-data.js`
- Resultados/times/jogos do Valorant → `assets/js/valorant-data.js`
- Organização, redes sociais e elenco das equipes → `assets/js/teams-data.js`

## Importante ao baixar/hospedar

Mantenha a estrutura de pastas **exatamente assim**. Baixe sempre a
pasta inteira (ou o .zip) e hospede tudo junto, com `assets`,
`modalidades`, `equipes`, `estatisticas` e `hall-da-fama` no mesmo
nível do `index.html`.

## O que vem nas próximas fases (você escolhe a ordem)

1. Painel administrativo novo ligado ao Firebase (cadastra sem mexer
   em código, aparece na hora pra todo mundo) — inclusive pra
   Equipes e Estatísticas.
2. Estrutura genérica de "campeonato por modalidade" reaproveitando o
   que já existe do Valorant, mas parametrizado por modalidade.
3. Base de estatísticas por jogador (kills, ACS, K/D etc.), não só MVP.
4. Sistema de notícias completo (não só destaque na home).
5. Calendário anual completo (página própria).
6. Hall da Fama de verdade (depois da primeira Grande Final).
7. Integrações: Discord, Twitch/YouTube, busca de times/jogadores,
   compartilhamento.
8. SEO (meta tags por página, sitemap, dados estruturados).

Me diga por qual dessas você quer seguir e eu construo.

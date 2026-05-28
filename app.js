const STORAGE_KEY = "allocwine.workspace.v1";

const initialState = {
  selectedClientId: "firadis",
  cuvees: [
    { id: "origine", name: "Origine", volume: 45000, price: 15, cost: 7.5, rarity: 4, image: 7 },
    { id: "solera", name: "Solera", volume: 30000, price: 22, cost: 9, rarity: 7, image: 9 },
    { id: "vignes-nuit", name: "Les Vignes de Nuit", volume: 1800, price: 49, cost: 15, rarity: 10, image: 10 },
    { id: "clos-ambre", name: "Clos Ambré", volume: 6200, price: 34, cost: 13, rarity: 8, image: 8 }
  ],
  markets: [
    {
      id: "japon",
      country: "Japon",
      image: 9,
      potential: 8,
      risk: 3,
      economic: 3,
      transport: 4,
      currency: 4,
      conflict: 2,
      useEconomicRisk: true,
      useTransportRisk: true,
      useCurrencyRisk: true,
      useConflictRisk: true,
      aiUpdatedAt: "",
      aiSignal: "Risque faible à modéré : marché stable, dépendance au transport longue distance.",
      context: "Marché prescripteur, stable, très sensible à la précision de l'allocation."
    },
    {
      id: "usa",
      country: "États-Unis",
      image: 8,
      potential: 10,
      risk: 5,
      economic: 5,
      transport: 6,
      currency: 6,
      conflict: 4,
      useEconomicRisk: true,
      useTransportRisk: true,
      useCurrencyRisk: true,
      useConflictRisk: true,
      aiUpdatedAt: "",
      aiSignal: "Risque moyen : surveiller devise, tarifs, coûts logistiques et tensions commerciales.",
      context: "Fort potentiel premium, mais coûts logistiques, devise et réglementation à surveiller."
    },
    {
      id: "uk",
      country: "Royaume-Uni",
      image: 8,
      potential: 7,
      risk: 4,
      economic: 4,
      transport: 4,
      currency: 5,
      conflict: 3,
      useEconomicRisk: true,
      useTransportRisk: true,
      useCurrencyRisk: true,
      useConflictRisk: true,
      aiUpdatedAt: "",
      aiSignal: "Risque modéré : pression économique et devise à intégrer dans les volumes.",
      context: "Bon réseau CHR et cavistes, pression prix plus visible sur les cuvées d'entrée."
    },
    {
      id: "france",
      country: "France",
      image: 7,
      potential: 6,
      risk: 2,
      economic: 2,
      transport: 2,
      currency: 1,
      conflict: 1,
      useEconomicRisk: true,
      useTransportRisk: true,
      useCurrencyRisk: false,
      useConflictRisk: true,
      aiUpdatedAt: "",
      aiSignal: "Risque faible : marché domestique, exposition logistique et devise limitée.",
      context: "Marché historique, utile pour l'image locale et la fidélité, marge parfois plus contenue."
    }
  ],
  clients: [
    {
      id: "firadis",
      name: "Firadis",
      marketId: "japon",
      margin: 8,
      history: 8,
      network: 9,
      payment: 8,
      strategicPotential: 9,
      objective: "Renforcer l'image gastronomie et préserver les cuvées rares."
    },
    {
      id: "grand-cru-selection",
      name: "Grand Cru Sélection",
      marketId: "usa",
      margin: 9,
      history: 8,
      network: 8,
      payment: 7,
      strategicPotential: 10,
      objective: "Accélérer la croissance premium avec un partenaire solide."
    },
    {
      id: "amathus",
      name: "Amathus",
      marketId: "uk",
      margin: 6,
      history: 7,
      network: 7,
      payment: 8,
      strategicPotential: 7,
      objective: "Maintenir une présence visible dans les restaurants et cavistes clés."
    },
    {
      id: "cavistes-france",
      name: "Cavistes France",
      marketId: "france",
      margin: 6,
      history: 7,
      network: 6,
      payment: 8,
      strategicPotential: 6,
      objective: "Conserver une base domestique fidèle sans sur-allouer les raretés."
    }
  ]
};

let state = normalizeState(loadState());

const dom = {
  tabs: document.querySelectorAll(".tab"),
  topRows: document.querySelector("#topRows"),
  cuveeRows: document.querySelector("#cuveeRows"),
  marketRows: document.querySelector("#marketRows"),
  clientCards: document.querySelector("#clientCards"),
  clientSelector: document.querySelector("#clientSelector"),
  clientRows: document.querySelector("#clientRows"),
  clientAnalysis: document.querySelector("#clientAnalysis"),
  strategicNarrative: document.querySelector("#strategicNarrative"),
  heroInsight: document.querySelector("#heroInsight"),
  metricStock: document.querySelector("#metricStock"),
  metricAllocated: document.querySelector("#metricAllocated"),
  metricMarket: document.querySelector("#metricMarket"),
  metricScore: document.querySelector("#metricScore"),
  clientMarket: document.querySelector("#clientMarket"),
  clientScore: document.querySelector("#clientScore"),
  clientVolume: document.querySelector("#clientVolume")
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : structuredClone(initialState);
  } catch {
    return structuredClone(initialState);
  }
}

function normalizeState(nextState) {
  nextState.markets = nextState.markets.map((market) => ({
    ...market,
    economic: market.economic ?? market.risk ?? 5,
    transport: market.transport ?? 5,
    currency: market.currency ?? 5,
    conflict: market.conflict ?? market.risk ?? 5,
    useEconomicRisk: market.useEconomicRisk ?? true,
    useTransportRisk: market.useTransportRisk ?? true,
    useCurrencyRisk: market.useCurrencyRisk ?? true,
    useConflictRisk: market.useConflictRisk ?? true,
    aiUpdatedAt: market.aiUpdatedAt ?? "",
    aiSignal: market.aiSignal ?? "Analyse IA à générer."
  }));
  return nextState;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("fr-FR");
}

function clamp(value, min = 0, max = 10) {
  return Math.max(min, Math.min(max, Number(value || 0)));
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const allocationEngine = {
  marketForClient(client) {
    return state.markets.find((market) => market.id === client.marketId) || state.markets[0];
  },

  grossMargin(cuvee) {
    if (!Number(cuvee.price)) return 0;
    return ((Number(cuvee.price) - Number(cuvee.cost)) / Number(cuvee.price)) * 10;
  },

  score(cuvee, client) {
    const market = this.marketForClient(client);
    const margin = this.grossMargin(cuvee) * 0.52 + Number(client.margin) * 0.48;
    const brandFit = Number(cuvee.image) * 0.34 + Number(market.image) * 0.36 + Number(client.network) * 0.30;
    const relationship = Number(client.history) * 0.55 + Number(client.payment) * 0.45;
    const riskPenalty = this.riskPenalty(market);
    const rarityBonus = Number(cuvee.rarity) >= 8 && Number(client.strategicPotential) >= 8 ? 0.28 : 0;

    return clamp(
      margin * 0.31 +
        brandFit * 0.26 +
        relationship * 0.17 +
        Number(market.potential) * 0.12 +
        Number(client.strategicPotential) * 0.14 -
        riskPenalty +
        rarityBonus
    );
  },

  riskPenalty(market) {
    const activeRisks = [
      market.useEconomicRisk ? Number(market.economic) * 0.30 : 0,
      market.useTransportRisk ? Number(market.transport) * 0.25 : 0,
      market.useCurrencyRisk ? Number(market.currency) * 0.20 : 0,
      market.useConflictRisk ? Number(market.conflict) * 0.25 : 0
    ];
    return activeRisks.reduce((sum, value) => sum + value, 0) * 0.18;
  },

  volume(cuvee, score) {
    const rarity = Number(cuvee.rarity);
    const baseRatio = rarity >= 9 ? 0.065 : rarity >= 7 ? 0.11 : 0.17;
    const scoreRatio = clamp(score / 10, 0.1, 1);
    return Math.max(12, Math.round(Number(cuvee.volume) * baseRatio * scoreRatio));
  },

  recommendation(cuvee, client) {
    const score = this.score(cuvee, client);
    return {
      cuvee,
      client,
      market: this.marketForClient(client),
      score,
      volume: this.volume(cuvee, score),
      decision: decisionForScore(score),
      analysis: analysisFor(cuvee, client, this.marketForClient(client), score)
    };
  },

  byClient(client) {
    return state.cuvees
      .map((cuvee) => this.recommendation(cuvee, client))
      .sort((a, b) => b.score - a.score);
  },

  global() {
    return state.clients
      .flatMap((client) => this.byClient(client))
      .sort((a, b) => b.score - a.score);
  }
};

function decisionForScore(score) {
  if (score >= 7.8) return { label: "Prioritaire", tone: "high" };
  if (score >= 6.4) return { label: "Contrôler", tone: "medium" };
  return { label: "Limiter", tone: "low" };
}

function analysisFor(cuvee, client, market, score) {
  if (score >= 7.8) {
    return `${client.name} peut défendre ${cuvee.name} avec un bon équilibre entre marge, image et potentiel ${market.country}.`;
  }
  if (score >= 6.4) {
    return `${cuvee.name} reste pertinente, avec une allocation mesurée et un suivi du risque ${market.country}.`;
  }
  return `Allocation prudente conseillée : le couple marge, risque et potentiel ne justifie pas un volume élevé.`;
}

function render() {
  persist();
  renderDashboard();
  renderCuvees();
  renderMarkets();
  renderClients();
  renderClientView();
}

function renderDashboard() {
  const global = allocationEngine.global();
  const totalStock = state.cuvees.reduce((sum, cuvee) => sum + Number(cuvee.volume || 0), 0);
  const top = global.slice(0, 8);
  const allocated = top.reduce((sum, row) => sum + row.volume, 0);
  const avg = top.length ? top.reduce((sum, row) => sum + row.score, 0) / top.length : 0;
  const marketWeights = global.reduce((acc, row) => {
    acc[row.market.country] = (acc[row.market.country] || 0) + row.score;
    return acc;
  }, {});
  const bestMarket = Object.entries(marketWeights).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const best = global[0];

  dom.metricStock.textContent = formatNumber(totalStock);
  dom.metricAllocated.textContent = formatNumber(allocated);
  dom.metricMarket.textContent = bestMarket;
  dom.metricScore.textContent = avg ? avg.toFixed(1) : "-";

  dom.heroInsight.innerHTML = best
    ? `<span>Meilleure opportunité</span><strong>${best.score.toFixed(1)}</strong><p>${escapeHtml(best.client.name)} sur ${escapeHtml(best.market.country)} pour ${escapeHtml(best.cuvee.name)}.</p>`
    : `<span>Meilleure opportunité</span><strong>-</strong><p>Ajoutez des données pour obtenir une recommandation.</p>`;

  dom.strategicNarrative.textContent = best
    ? `${best.client.name} ressort comme priorité actuelle sur ${best.market.country}. Le volume conseillé pour ${best.cuvee.name} est de ${formatNumber(best.volume)} bouteilles, car le score combine image, historique et potentiel sans exposition excessive au risque.`
    : "Ajoutez des cuvées, marchés et clients pour générer une lecture stratégique.";

  dom.topRows.innerHTML = top.map(renderRecommendationRow).join("") || emptyRow(6);
}

function renderCuvees() {
  dom.cuveeRows.innerHTML = state.cuvees
    .map((cuvee) => `
      <tr>
        <td>${input("cuvee", cuvee.id, "name", cuvee.name)}</td>
        <td>${input("cuvee", cuvee.id, "volume", cuvee.volume, "number")}</td>
        <td>${input("cuvee", cuvee.id, "price", cuvee.price, "number")}</td>
        <td>${input("cuvee", cuvee.id, "cost", cuvee.cost, "number")}</td>
        <td>${input("cuvee", cuvee.id, "rarity", cuvee.rarity, "number")}</td>
        <td>${input("cuvee", cuvee.id, "image", cuvee.image, "number")}</td>
        <td><button class="danger-action" type="button" data-delete="cuvee" data-id="${cuvee.id}">Supprimer</button></td>
      </tr>
    `)
    .join("") || emptyRow(7);
}

function renderMarkets() {
  dom.marketRows.innerHTML = state.markets
    .map((market) => `
      <tr>
        <td>${input("market", market.id, "country", market.country)}</td>
        <td>${input("market", market.id, "image", market.image, "number")}</td>
        <td>${input("market", market.id, "potential", market.potential, "number")}</td>
        <td>${criterionControl("market", market.id, "useEconomicRisk", "economic", market.useEconomicRisk, market.economic)}</td>
        <td>${criterionControl("market", market.id, "useTransportRisk", "transport", market.useTransportRisk, market.transport)}</td>
        <td>${criterionControl("market", market.id, "useCurrencyRisk", "currency", market.useCurrencyRisk, market.currency)}</td>
        <td>${criterionControl("market", market.id, "useConflictRisk", "conflict", market.useConflictRisk, market.conflict)}</td>
        <td>
          <button class="secondary-action compact-action" type="button" data-ai-market="${market.id}">Noter par IA</button>
          <small class="ai-signal">${escapeHtml(market.aiSignal)}</small>
          ${market.aiUpdatedAt ? `<small class="ai-date">Mis à jour ${escapeHtml(market.aiUpdatedAt)}</small>` : ""}
        </td>
        <td>${input("market", market.id, "context", market.context)}</td>
        <td><button class="danger-action" type="button" data-delete="market" data-id="${market.id}">Supprimer</button></td>
      </tr>
    `)
    .join("") || emptyRow(10);
}

function renderClients() {
  dom.clientCards.innerHTML = state.clients
    .map((client) => {
      const market = allocationEngine.marketForClient(client);
      const rows = allocationEngine.byClient(client);
      const total = rows.reduce((sum, row) => sum + row.volume, 0);
      const avg = rows.length ? rows.reduce((sum, row) => sum + row.score, 0) / rows.length : 0;
      return `
        <article class="client-card">
          <header>
            <div>
              <h4>${escapeHtml(client.name)}</h4>
              <p>${escapeHtml(market?.country || "-")} · ${escapeHtml(client.objective)}</p>
            </div>
            <span class="score-pill ${decisionForScore(avg).tone}">${avg.toFixed(1)}</span>
          </header>
          <dl>
            <div><dt>Volume</dt><dd>${formatNumber(total)} bt</dd></div>
            <div><dt>Historique</dt><dd>${client.history}/10</dd></div>
            <div><dt>Potentiel</dt><dd>${client.strategicPotential}/10</dd></div>
          </dl>
          <button class="secondary-action" type="button" data-view-client="${client.id}">Voir recommandations</button>
        </article>
      `;
    })
    .join("") || `<div class="empty-state">Ajoutez un client pour lancer les recommandations.</div>`;
}

function renderClientView() {
  const selectedClient = state.clients.find((client) => client.id === state.selectedClientId) || state.clients[0];
  if (!selectedClient) {
    dom.clientSelector.innerHTML = "";
    dom.clientRows.innerHTML = emptyRow(6);
    return;
  }

  state.selectedClientId = selectedClient.id;
  const market = allocationEngine.marketForClient(selectedClient);
  const rows = allocationEngine.byClient(selectedClient);
  const avg = rows.length ? rows.reduce((sum, row) => sum + row.score, 0) / rows.length : 0;
  const total = rows.reduce((sum, row) => sum + row.volume, 0);

  dom.clientSelector.innerHTML = state.clients
    .map((client) => `<option value="${client.id}" ${client.id === selectedClient.id ? "selected" : ""}>${escapeHtml(client.name)}</option>`)
    .join("");
  dom.clientMarket.textContent = market?.country || "-";
  dom.clientScore.textContent = avg ? avg.toFixed(1) : "-";
  dom.clientVolume.textContent = `${formatNumber(total)} bt`;
  dom.clientRows.innerHTML = rows.map(renderClientRecommendationRow).join("") || emptyRow(6);
  const activeRisks = riskLabels(market);
  dom.clientAnalysis.innerHTML = `
    <strong>Analyse automatique</strong>
    <p>${escapeHtml(selectedClient.name)} reçoit une proposition calibrée pour ${escapeHtml(market?.country || "-")}. ${escapeHtml(market?.context || "")} Critères de risque actifs : ${escapeHtml(activeRisks)}. ${escapeHtml(market?.aiSignal || "")} Les cuvées rares sont volontairement limitées afin de préserver l'image et la rareté, tout en donnant assez de volume aux partenaires capables de créer de la demande durable.</p>
  `;
}

function renderRecommendationRow(row) {
  return `
    <tr>
      <td>${escapeHtml(row.cuvee.name)}</td>
      <td>${escapeHtml(row.client.name)}</td>
      <td>${escapeHtml(row.market.country)}</td>
      <td><span class="score-pill ${row.decision.tone}">${row.score.toFixed(1)}</span></td>
      <td>${formatNumber(row.volume)} bt</td>
      <td><span class="decision ${row.decision.tone}">${row.decision.label}</span></td>
    </tr>
  `;
}

function renderClientRecommendationRow(row) {
  return `
    <tr>
      <td>${escapeHtml(row.cuvee.name)}</td>
      <td>${formatNumber(row.cuvee.volume)} bt</td>
      <td><span class="score-pill ${row.decision.tone}">${row.score.toFixed(1)}</span></td>
      <td>${formatNumber(row.volume)} bt</td>
      <td><span class="decision ${row.decision.tone}">${row.decision.label}</span></td>
      <td>${escapeHtml(row.analysis)}</td>
    </tr>
  `;
}

function input(type, id, field, value, inputType = "text") {
  return `<input type="${inputType}" value="${escapeHtml(value)}" data-edit="${type}" data-id="${id}" data-field="${field}" ${inputType === "number" ? 'min="0" max="1000000" step="0.1"' : ""}>`;
}

function criterionControl(type, id, toggleField, valueField, checked, value) {
  return `
    <label class="criterion-cell">
      <input type="checkbox" ${checked ? "checked" : ""} data-edit="${type}" data-id="${id}" data-field="${toggleField}">
      <span>Inclure</span>
      <strong class="ai-score">${Number(value || 0).toFixed(1)}</strong>
      <small>note IA</small>
    </label>
  `;
}

function riskLabels(market) {
  const labels = [];
  if (market?.useEconomicRisk) labels.push("contexte économique et aléas");
  if (market?.useTransportRisk) labels.push("transport et tarifs");
  if (market?.useCurrencyRisk) labels.push("taux de change");
  if (market?.useConflictRisk) labels.push("conflits actuels et risque géopolitique");
  return labels.length ? labels.join(", ") : "aucun risque externe activé";
}

function emptyRow(colspan) {
  return `<tr><td class="empty-state" colspan="${colspan}">Aucune donnée pour le moment.</td></tr>`;
}

function updateField(target) {
  const collection = `${target.dataset.edit}s`;
  const record = state[collection].find((item) => item.id === target.dataset.id);
  if (!record) return;

  const numericFields = ["volume", "price", "cost", "rarity", "image", "potential", "risk", "economic", "transport", "currency", "conflict", "margin", "history", "network", "payment", "strategicPotential"];
  record[target.dataset.field] = target.type === "checkbox" ? target.checked : numericFields.includes(target.dataset.field) ? Number(target.value) : target.value;
  render();
}

function deleteRecord(type, id) {
  const collection = `${type}s`;
  state[collection] = state[collection].filter((item) => item.id !== id);
  if (type === "client" && state.selectedClientId === id) {
    state.selectedClientId = state.clients[0]?.id || "";
  }
  render();
}

function showTab(tabId) {
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.toggle("active", panel.id === tabId));
  dom.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabId));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function addCuvee() {
  state.cuvees.push({ id: createId("cuvee"), name: "Nouvelle cuvée", volume: 1200, price: 24, cost: 9, rarity: 6, image: 7 });
  render();
}

function addMarket() {
  state.markets.push({
    id: createId("market"),
    country: "Nouveau marché",
    image: 6,
    potential: 6,
    risk: 5,
    economic: 5,
    transport: 5,
    currency: 5,
    conflict: 5,
    useEconomicRisk: true,
    useTransportRisk: true,
    useCurrencyRisk: true,
    useConflictRisk: true,
    aiUpdatedAt: "",
    aiSignal: "Analyse IA à générer.",
    context: "Contexte à préciser."
  });
  render();
}

function runMarketAi(marketId) {
  const market = state.markets.find((item) => item.id === marketId);
  if (!market) return;

  const aiNotes = estimateMarketRisks(market);
  market.economic = aiNotes.economic;
  market.transport = aiNotes.transport;
  market.currency = aiNotes.currency;
  market.conflict = aiNotes.conflict;
  market.aiSignal = aiNotes.signal;
  market.aiUpdatedAt = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  render();
}

function runAllMarketAi() {
  state.markets.forEach((market) => {
    const aiNotes = estimateMarketRisks(market);
    market.economic = aiNotes.economic;
    market.transport = aiNotes.transport;
    market.currency = aiNotes.currency;
    market.conflict = aiNotes.conflict;
    market.aiSignal = aiNotes.signal;
    market.aiUpdatedAt = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  });
  render();
}

function estimateMarketRisks(market) {
  const text = `${market.country} ${market.context}`.toLowerCase();
  let economic = 4.5;
  let transport = 4.5;
  let currency = 4.5;
  let conflict = 3.5;

  if (text.includes("france") || text.includes("domestique")) {
    economic -= 1.4;
    transport -= 2.2;
    currency -= 3.2;
    conflict -= 1.5;
  }
  if (text.includes("japon")) {
    economic -= 0.6;
    transport += 1.0;
    currency += 0.6;
    conflict -= 0.5;
  }
  if (text.includes("états-unis") || text.includes("usa") || text.includes("united states")) {
    economic += 0.8;
    transport += 1.2;
    currency += 1.0;
    conflict += 0.7;
  }
  if (text.includes("royaume-uni") || text.includes("uk")) {
    economic += 0.5;
    transport += 0.3;
    currency += 0.9;
    conflict += 0.2;
  }

  if (text.includes("tarif") || text.includes("douane") || text.includes("réglementation")) transport += 0.8;
  if (text.includes("devise") || text.includes("change")) currency += 0.9;
  if (text.includes("pression prix") || text.includes("ralentissement")) economic += 0.8;
  if (text.includes("conflit") || text.includes("géopolitique") || text.includes("tension")) conflict += 1.4;

  const notes = {
    economic: clamp(economic, 1, 10),
    transport: clamp(transport, 1, 10),
    currency: clamp(currency, 1, 10),
    conflict: clamp(conflict, 1, 10)
  };
  const globalRisk = notes.economic + notes.transport + notes.currency + notes.conflict;
  const tone = globalRisk >= 26 ? "élevé" : globalRisk >= 18 ? "modéré" : "contenu";
  const strongest = Object.entries(notes).sort((a, b) => b[1] - a[1])[0];
  const labels = {
    economic: "contexte économique",
    transport: "transport et tarifs",
    currency: "taux de change",
    conflict: "conflits actuels et géopolitique"
  };

  return {
    ...notes,
    signal: `IA allocation : risque ${tone}. Principal facteur détecté : ${labels[strongest[0]]} (${strongest[1].toFixed(1)}/10). Les notes sont recalculées à partir du pays, du contexte marché et des signaux de coût/risque saisis.`
  };
}

function addClient() {
  state.clients.push({
    id: createId("client"),
    name: "Nouveau client",
    marketId: state.markets[0]?.id || "",
    margin: 6,
    history: 5,
    network: 6,
    payment: 7,
    strategicPotential: 6,
    objective: "Objectif à préciser."
  });
  render();
}

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-edit]")) updateField(event.target);
});

document.addEventListener("click", (event) => {
  const tabButton = event.target.closest("[data-tab]");
  const openTabButton = event.target.closest("[data-open-tab]");
  const deleteButton = event.target.closest("[data-delete]");
  const viewClientButton = event.target.closest("[data-view-client]");
  const aiMarketButton = event.target.closest("[data-ai-market]");

  if (tabButton) showTab(tabButton.dataset.tab);
  if (openTabButton) showTab(openTabButton.dataset.openTab);
  if (deleteButton) deleteRecord(deleteButton.dataset.delete, deleteButton.dataset.id);
  if (aiMarketButton) runMarketAi(aiMarketButton.dataset.aiMarket);
  if (viewClientButton) {
    state.selectedClientId = viewClientButton.dataset.viewClient;
    render();
    showTab("client-view");
  }
});

dom.clientSelector.addEventListener("change", (event) => {
  state.selectedClientId = event.target.value;
  render();
});

document.querySelector("#addCuvee").addEventListener("click", addCuvee);
document.querySelector("#addMarket").addEventListener("click", addMarket);
document.querySelector("#addClient").addEventListener("click", addClient);
document.querySelector("#analyzeMarkets").addEventListener("click", runAllMarketAi);

render();

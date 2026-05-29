const STORAGE_KEY = "allocwine.workspace.v1";

const initialState = {
  selectedClientId: "firadis",
  previousSales: [],
  previousSalesFileName: "",
  previousSalesImportedAt: "",
  cuvees: [
    {
      id: "origine",
      name: "Origine",
      volume: 45000,
      price: 15,
      cost: 7.5,
      rarity: 4,
      image: 7,
      cuveeAiUpdatedAt: "",
      cuveeAiSignal: "Analyse IA à générer à partir des sources vin."
    },
    {
      id: "solera",
      name: "Solera",
      volume: 30000,
      price: 22,
      cost: 9,
      rarity: 7,
      image: 9,
      cuveeAiUpdatedAt: "",
      cuveeAiSignal: "Analyse IA à générer à partir des sources vin."
    },
    {
      id: "vignes-nuit",
      name: "Les Vignes de Nuit",
      volume: 1800,
      price: 49,
      cost: 15,
      rarity: 10,
      image: 10,
      cuveeAiUpdatedAt: "",
      cuveeAiSignal: "Analyse IA à générer à partir des sources vin."
    },
    {
      id: "clos-ambre",
      name: "Clos Ambré",
      volume: 6200,
      price: 34,
      cost: 13,
      rarity: 8,
      image: 8,
      cuveeAiUpdatedAt: "",
      cuveeAiSignal: "Analyse IA à générer à partir des sources vin."
    }
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
  salesFile: document.querySelector("#salesFile"),
  importStatus: document.querySelector("#importStatus"),
  historyRows: document.querySelector("#historyRows"),
  historyClients: document.querySelector("#historyClients"),
  historyQuantity: document.querySelector("#historyQuantity"),
  historyMargin: document.querySelector("#historyMargin"),
  historyInsight: document.querySelector("#historyInsight"),
  historyRowsTable: document.querySelector("#historyRowsTable"),
  clearHistory: document.querySelector("#clearHistory"),
  clientMarket: document.querySelector("#clientMarket"),
  clientScore: document.querySelector("#clientScore"),
  clientVolume: document.querySelector("#clientVolume"),
  clientPreviousVolume: document.querySelector("#clientPreviousVolume"),
  clientPreviousMargin: document.querySelector("#clientPreviousMargin"),
  clientProjectedMargin: document.querySelector("#clientProjectedMargin")
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
  nextState.previousSales = Array.isArray(nextState.previousSales) ? nextState.previousSales : [];
  nextState.previousSalesFileName = nextState.previousSalesFileName ?? "";
  nextState.previousSalesImportedAt = nextState.previousSalesImportedAt ?? "";
  nextState.cuvees = nextState.cuvees.map((cuvee) => ({
    ...cuvee,
    rarity: cuvee.rarity ?? 5,
    image: cuvee.image ?? 5,
    cuveeAiUpdatedAt: cuvee.cuveeAiUpdatedAt ?? "",
    cuveeAiSignal: cuvee.cuveeAiSignal ?? "Analyse IA à générer à partir des sources vin."
  }));
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

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €";
}

function clamp(value, min = 0, max = 10) {
  return Math.max(min, Math.min(max, Number(value || 0)));
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
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

function salesForClient(client) {
  const clientName = normalizeText(client.name);
  return state.previousSales.filter((row) => {
    const saleClient = normalizeText(row.clientName);
    return saleClient === clientName || saleClient.includes(clientName) || clientName.includes(saleClient);
  });
}

function findClientForImportedName(importedName) {
  const imported = normalizeText(importedName);
  return state.clients.find((client) => {
    const existing = normalizeText(client.name);
    return existing === imported || existing.includes(imported) || imported.includes(existing);
  });
}

function articleMatchesCuvee(articleCode, cuveeName) {
  const article = normalizeText(articleCode);
  const cuvee = normalizeText(cuveeName);
  if (!article || !cuvee) return false;
  return article.includes(cuvee) || cuvee.includes(article) || cuvee.split(" ").some((part) => part.length > 3 && article.includes(part));
}

function saleMatchesCuvee(row, cuvee) {
  const importedCode = normalizeText(cuvee.importedCode);
  const rowCode = normalizeText(row.articleCode);
  const rowName = normalizeText(row.cuveeName);
  const cuveeName = normalizeText(cuvee.name);
  return (
    (importedCode && rowCode && importedCode === rowCode) ||
    (rowName && (rowName === cuveeName || rowName.includes(cuveeName) || cuveeName.includes(rowName))) ||
    (rowCode && articleMatchesCuvee(rowCode, cuvee.name))
  );
}

function previousVolumeForCuvee(client, cuvee) {
  const rows = salesForClient(client);
  const matchedRows = rows.filter((row) => saleMatchesCuvee(row, cuvee));
  if (matchedRows.length) {
    return matchedRows.reduce((sum, row) => sum + Number(row.quantity || 0), 0);
  }
  return 0;
}

function previousVolumeLabelForCuvee(client, cuvee) {
  const matchedVolume = previousVolumeForCuvee(client, cuvee);
  if (matchedVolume) return `${formatNumber(matchedVolume)} u.`;

  const rows = salesForClient(client);
  const total = rows.reduce((sum, row) => sum + Number(row.quantity || 0), 0);
  return total ? `${formatNumber(total)} u. client` : "-";
}

function previousMarginForClient(client) {
  return salesForClient(client).reduce((sum, row) => sum + Number(row.margin || 0), 0);
}

function projectedMarginForRecommendation(row) {
  return Math.max(0, Number(row.cuvee.price || 0) - Number(row.cuvee.cost || 0)) * Number(row.volume || 0);
}

function projectedMarginForClient(rows) {
  return rows.reduce((sum, row) => sum + projectedMarginForRecommendation(row), 0);
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
    const historySignal = this.historySignal(client, cuvee);
    const relationship = Number(client.history) * 0.40 + Number(client.payment) * 0.35 + historySignal.score * 0.25;
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

  historySignal(client, cuvee) {
    const rows = salesForClient(client);
    if (!rows.length) {
      return { score: Number(client.history || 5), quantity: 0, margin: 0, turnover: 0, matchedArticle: false };
    }

    const totalQuantity = rows.reduce((sum, row) => sum + Number(row.quantity || 0), 0);
    const totalMargin = rows.reduce((sum, row) => sum + Number(row.margin || 0), 0);
    const totalTurnover = rows.reduce((sum, row) => sum + Number(row.turnover || 0), 0);
    const articleRows = rows.filter((row) => row.articleCode && articleMatchesCuvee(row.articleCode, cuvee.name));
    const articleQuantity = articleRows.reduce((sum, row) => sum + Number(row.quantity || 0), 0);
    const marginRate = totalTurnover ? totalMargin / totalTurnover : 0;
    const quantityScore = clamp(Math.log10(Math.max(totalQuantity, 1)) * 2.2, 1, 10);
    const marginScore = clamp(marginRate * 10, 1, 10);
    const articleBonus = articleRows.length ? 1.1 + clamp(articleQuantity / 120, 0, 1.4) : 0;

    return {
      score: clamp(quantityScore * 0.45 + marginScore * 0.35 + Number(client.history || 5) * 0.20 + articleBonus, 1, 10),
      quantity: totalQuantity,
      margin: totalMargin,
      turnover: totalTurnover,
      matchedArticle: articleRows.length > 0
    };
  },

  volume(cuvee, score) {
    const rarity = Number(cuvee.rarity);
    const baseRatio = rarity >= 9 ? 0.065 : rarity >= 7 ? 0.11 : 0.17;
    const scoreRatio = clamp(score / 10, 0.1, 1);
    return Math.max(12, Math.round(Number(cuvee.volume) * baseRatio * scoreRatio));
  },

  recommendation(cuvee, client) {
    const score = this.score(cuvee, client);
    const historySignal = this.historySignal(client, cuvee);
    return {
      cuvee,
      client,
      market: this.marketForClient(client),
      score,
      volume: this.volume(cuvee, score),
      decision: decisionForScore(score),
      analysis: analysisFor(cuvee, client, this.marketForClient(client), score, historySignal),
      historySignal
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

function analysisFor(cuvee, client, market, score, historySignal) {
  const historyText = historySignal?.quantity
    ? ` L'historique N-1 indique ${formatNumber(historySignal.quantity)} unités vendues/allouées à ce client, avec ${formatCurrency(historySignal.margin)} de marge.`
    : "";
  if (score >= 7.8) {
    return `${client.name} peut défendre ${cuvee.name} avec un bon équilibre entre marge, image et potentiel ${market.country}.${historyText}`;
  }
  if (score >= 6.4) {
    return `${cuvee.name} reste pertinente, avec une allocation mesurée et un suivi du risque ${market.country}.${historyText}`;
  }
  return `Allocation prudente conseillée : le couple marge, risque et potentiel ne justifie pas un volume élevé.${historyText}`;
}
function render() {
  persist();
  renderDashboard();
  renderCuvees();
  renderMarkets();
  renderClients();
  renderHistory();
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

function renderHistory() {
  const rows = state.previousSales;
  const totalQuantity = rows.reduce((sum, row) => sum + Number(row.quantity || 0), 0);
  const totalMargin = rows.reduce((sum, row) => sum + Number(row.margin || 0), 0);
  const clients = new Set(rows.map((row) => normalizeText(row.clientName)).filter(Boolean));

  dom.historyRows.textContent = formatNumber(rows.length);
  dom.historyClients.textContent = formatNumber(clients.size);
  dom.historyQuantity.textContent = formatNumber(totalQuantity);
  dom.historyMargin.textContent = formatCurrency(totalMargin);
  dom.importStatus.textContent = state.previousSalesFileName
    ? `${state.previousSalesFileName} importé le ${state.previousSalesImportedAt}.`
    : "Aucun fichier importé pour le moment.";
  dom.historyInsight.textContent = rows.length
    ? "L'IA utilise maintenant l'historique N-1 pour ajuster les scores : volumes passés, marge réelle, fidélité et articles déjà attribués."
    : "Les ventes N-1 permettront de pondérer les recommandations avec l'historique réel, les volumes déjà alloués, la marge et la fidélité client.";
  dom.historyRowsTable.innerHTML = rows.slice(0, 60).map((row) => `
    <tr>
      <td>${escapeHtml(row.clientName)}</td>
      <td>${escapeHtml(row.countryName || "-")}</td>
      <td>${escapeHtml(row.articleCode || "-")}</td>
      <td>${escapeHtml(row.cuveeName || "-")}</td>
      <td>${formatCurrency(row.turnover)}</td>
      <td>${formatCurrency(row.margin)}</td>
      <td>${formatNumber(row.quantity)}</td>
    </tr>
  `).join("") || emptyRow(7);
}

function renderCuvees() {
  dom.cuveeRows.innerHTML = state.cuvees
    .map((cuvee) => `
      <tr>
        <td>${input("cuvee", cuvee.id, "name", cuvee.name)}</td>
        <td>${input("cuvee", cuvee.id, "volume", cuvee.volume, "number")}</td>
        <td>${input("cuvee", cuvee.id, "price", cuvee.price, "number")}</td>
        <td>${input("cuvee", cuvee.id, "cost", cuvee.cost, "number")}</td>
        <td>${aiScoreBlock(cuvee.rarity)}</td>
        <td>${aiScoreBlock(cuvee.image)}</td>
        <td>
          <button class="secondary-action compact-action" type="button" data-ai-cuvee="${cuvee.id}">Noter par IA</button>
          <small class="ai-signal">${escapeHtml(cuvee.cuveeAiSignal)}</small>
          ${cuvee.cuveeAiUpdatedAt ? `<small class="ai-date">Mis à jour ${escapeHtml(cuvee.cuveeAiUpdatedAt)}</small>` : ""}
        </td>
        <td><button class="danger-action" type="button" data-delete="cuvee" data-id="${cuvee.id}">Supprimer</button></td>
      </tr>
    `)
    .join("") || emptyRow(8);
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
      const previousRows = salesForClient(client);
      const previousQuantity = previousRows.reduce((sum, row) => sum + Number(row.quantity || 0), 0);
      const previousMargin = previousMarginForClient(client);
      const projectedMargin = projectedMarginForClient(rows);
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
            <div><dt>Marge N</dt><dd>${formatCurrency(projectedMargin)}</dd></div>
            <div><dt>N-1</dt><dd>${previousQuantity ? `${formatNumber(previousQuantity)} u.` : "Non importé"}</dd></div>
            <div><dt>Marge N-1</dt><dd>${previousMargin ? formatCurrency(previousMargin) : "-"}</dd></div>
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
    dom.clientRows.innerHTML = emptyRow(7);
    return;
  }

  state.selectedClientId = selectedClient.id;
  const market = allocationEngine.marketForClient(selectedClient);
  const rows = allocationEngine.byClient(selectedClient);
  const avg = rows.length ? rows.reduce((sum, row) => sum + row.score, 0) / rows.length : 0;
  const total = rows.reduce((sum, row) => sum + row.volume, 0);
  const previousRows = salesForClient(selectedClient);
  const previousTotal = previousRows.reduce((sum, row) => sum + Number(row.quantity || 0), 0);
  const previousMargin = previousMarginForClient(selectedClient);
  const projectedMargin = projectedMarginForClient(rows);

  dom.clientSelector.innerHTML = state.clients
    .map((client) => `<option value="${client.id}" ${client.id === selectedClient.id ? "selected" : ""}>${escapeHtml(client.name)}</option>`)
    .join("");
  dom.clientMarket.textContent = market?.country || "-";
  dom.clientScore.textContent = avg ? avg.toFixed(1) : "-";
  dom.clientVolume.textContent = `${formatNumber(total)} bt`;
  dom.clientPreviousVolume.textContent = previousTotal ? `${formatNumber(previousTotal)} u.` : "-";
  dom.clientPreviousMargin.textContent = previousMargin ? formatCurrency(previousMargin) : "-";
  dom.clientProjectedMargin.textContent = projectedMargin ? formatCurrency(projectedMargin) : "-";
  dom.clientRows.innerHTML = rows.map(renderClientRecommendationRow).join("") || emptyRow(7);
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
  const previousVolume = previousVolumeLabelForCuvee(row.client, row.cuvee);
  return `
    <tr>
      <td>${escapeHtml(row.cuvee.name)}</td>
      <td>${formatNumber(row.cuvee.volume)} bt</td>
      <td><span class="score-pill ${row.decision.tone}">${row.score.toFixed(1)}</span></td>
      <td>${formatNumber(row.volume)} bt</td>
      <td>${previousVolume}</td>
      <td><span class="decision ${row.decision.tone}">${row.decision.label}</span></td>
      <td>${escapeHtml(row.analysis)}</td>
    </tr>
  `;
}

function input(type, id, field, value, inputType = "text") {
  return `<input type="${inputType}" value="${escapeHtml(value)}" data-edit="${type}" data-id="${id}" data-field="${field}" ${inputType === "number" ? 'min="0" max="1000000" step="0.1"' : ""}>`;
}

function aiScoreBlock(value) {
  return `
    <div class="ai-score-cell">
      <strong class="ai-score">${Number(value || 0).toFixed(1)}</strong>
      <small>note IA</small>
    </div>
  `;
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
  state.cuvees.push({
    id: createId("cuvee"),
    name: "Nouvelle cuvée",
    volume: 1200,
    price: 24,
    cost: 9,
    rarity: 5,
    image: 5,
    cuveeAiUpdatedAt: "",
    cuveeAiSignal: "Analyse IA à générer à partir des sources vin."
  });
  render();
}

function runCuveeAi(cuveeId) {
  const cuvee = state.cuvees.find((item) => item.id === cuveeId);
  if (!cuvee) return;

  const profile = estimateCuveeProfile(cuvee);
  cuvee.rarity = profile.rarity;
  cuvee.image = profile.image;
  cuvee.cuveeAiSignal = profile.signal;
  cuvee.cuveeAiUpdatedAt = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  render();
}

function runAllCuveeAi() {
  state.cuvees.forEach((cuvee) => {
    const profile = estimateCuveeProfile(cuvee);
    cuvee.rarity = profile.rarity;
    cuvee.image = profile.image;
    cuvee.cuveeAiSignal = profile.signal;
    cuvee.cuveeAiUpdatedAt = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  });
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

function estimateCuveeProfile(cuvee) {
  const name = String(cuvee.name || "").toLowerCase();
  const volume = Number(cuvee.volume || 0);
  const price = Number(cuvee.price || 0);
  const margin = price ? ((price - Number(cuvee.cost || 0)) / price) * 10 : 4;
  let rarity = 5;
  let image = 5;

  if (volume <= 2500) rarity += 3.2;
  else if (volume <= 8000) rarity += 1.8;
  else if (volume <= 25000) rarity += 0.8;
  else rarity -= 1.0;

  if (price >= 45) image += 2.4;
  else if (price >= 30) image += 1.5;
  else if (price >= 20) image += 0.7;

  image += clamp(margin, 0, 10) * 0.12;

  if (name.includes("clos") || name.includes("vignes") || name.includes("nuit") || name.includes("solera")) {
    rarity += 0.8;
    image += 1.0;
  }
  if (name.includes("origine") || name.includes("tradition")) {
    rarity -= 0.6;
    image += 0.3;
  }

  const finalProfile = {
    rarity: clamp(rarity, 1, 10),
    image: clamp(image, 1, 10)
  };
  const sourcePlan = "sources prévues : Wine-Searcher, Vivino, sites importateurs, fiches domaine, presse vin et historiques de prix";
  const strongest = finalProfile.rarity >= finalProfile.image ? `rareté (${finalProfile.rarity.toFixed(1)}/10)` : `image (${finalProfile.image.toFixed(1)}/10)`;

  return {
    ...finalProfile,
    signal: `IA cuvée : facteur dominant ${strongest}. Simulation locale aujourd'hui, connectable ensuite aux recherches web (${sourcePlan}).`
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

async function handleSalesFile(file) {
  if (!file) return;
  dom.importStatus.textContent = "Lecture du fichier Excel...";
  try {
    const rows = await parseXlsxSalesFile(file);
    state.previousSales = rows;
    state.previousSalesFileName = file.name;
    state.previousSalesImportedAt = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const marketCount = createMarketsFromImportedSales(rows);
    const cuveeCount = createCuveesFromImportedSales(rows);
    const createdCount = createClientsFromImportedSales(rows);
    render();
    showTab("history");
    dom.importStatus.textContent = `${file.name} importé le ${state.previousSalesImportedAt}. ${createdCount} client(s), ${marketCount} marché(s), ${cuveeCount} cuvée(s) créé(s). Données existantes enrichies.`;
  } catch (error) {
    dom.importStatus.textContent = `Import impossible : ${error.message}`;
  }
}

function createClientsFromImportedSales(rows) {
  const existingImportedIds = new Set(state.clients.filter((client) => client.importedFromHistory).map((client) => client.id));
  const grouped = rows.reduce((acc, row) => {
    const key = normalizeText(row.clientName);
    if (!key) return acc;
    if (!acc[key]) {
      acc[key] = { name: row.clientName.trim(), country: row.countryName || "", quantity: 0, margin: 0, turnover: 0 };
    }
    if (row.countryName && !acc[key].country) acc[key].country = row.countryName;
    acc[key].quantity += Number(row.quantity || 0);
    acc[key].margin += Number(row.margin || 0);
    acc[key].turnover += Number(row.turnover || 0);
    return acc;
  }, {});

  let created = 0;
  Object.values(grouped).forEach((item) => {
    const existingClient = findClientForImportedName(item.name);
    const marketId = marketIdForCountry(item.country);
    if (existingClient) {
      existingImportedIds.delete(existingClient.id);
      existingClient.importedName = item.name;
      if (marketId) existingClient.marketId = marketId;
      existingClient.history = Math.max(Number(existingClient.history || 5), importedHistoryScore(item.quantity));
      existingClient.margin = Math.max(Number(existingClient.margin || 5), importedMarginScore(item.margin, item.turnover));
      return;
    }

    state.clients.push({
      id: uniqueImportedClientId(item.name),
      name: item.name,
      marketId: marketId || state.markets[0]?.id || "",
      margin: importedMarginScore(item.margin, item.turnover),
      history: importedHistoryScore(item.quantity),
      network: 5,
      payment: 6,
      strategicPotential: importedPotentialScore(item.quantity, item.margin),
      objective: "Client créé automatiquement depuis les ventes N-1.",
      importedFromHistory: true
    });
    created += 1;
  });
  state.clients = state.clients.filter((client) => !existingImportedIds.has(client.id));
  return created;
}

function createMarketsFromImportedSales(rows) {
  const countries = Array.from(new Set(rows.map((row) => row.countryName).filter(Boolean)));
  let created = 0;
  countries.forEach((country) => {
    if (marketIdForCountry(country)) return;
    const market = {
      id: uniqueMarketId(country),
      country,
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
      aiSignal: "Marché créé automatiquement depuis l'historique importé. À noter par IA.",
      context: "Marché importé depuis les ventes N-1."
    };
    const aiNotes = estimateMarketRisks(market);
    Object.assign(market, {
      economic: aiNotes.economic,
      transport: aiNotes.transport,
      currency: aiNotes.currency,
      conflict: aiNotes.conflict,
      aiSignal: aiNotes.signal
    });
    state.markets.push(market);
    created += 1;
  });
  return created;
}

function createCuveesFromImportedSales(rows) {
  const grouped = rows.reduce((acc, row) => {
    const name = row.cuveeName || row.articleCode;
    const key = normalizeText(name);
    if (!key) return acc;
    if (!acc[key]) {
      acc[key] = { name: String(name).trim(), code: row.articleCode || "", quantity: 0, turnover: 0, margin: 0 };
    }
    if (row.articleCode && !acc[key].code) acc[key].code = row.articleCode;
    acc[key].quantity += Number(row.quantity || 0);
    acc[key].turnover += Number(row.turnover || 0);
    acc[key].margin += Number(row.margin || 0);
    return acc;
  }, {});

  let created = 0;
  Object.values(grouped).forEach((item) => {
    const existing = findCuveeForImportedName(item.name, item.code);
    const avgPrice = item.quantity ? item.turnover / item.quantity : 20;
    const avgCost = item.quantity ? Math.max(0, (item.turnover - item.margin) / item.quantity) : Math.max(1, avgPrice * 0.55);
    if (existing) {
      existing.importedCode = item.code || existing.importedCode || "";
      existing.volume = Math.max(Number(existing.volume || 0), Math.round(item.quantity || 0));
      if (!Number(existing.price)) existing.price = roundOne(avgPrice);
      if (!Number(existing.cost)) existing.cost = roundOne(avgCost);
      return;
    }

    const cuvee = {
      id: uniqueCuveeId(item.name),
      name: item.name,
      importedCode: item.code,
      volume: Math.max(12, Math.round(item.quantity || 0)),
      price: roundOne(avgPrice),
      cost: roundOne(avgCost),
      rarity: 5,
      image: 5,
      cuveeAiUpdatedAt: "",
      cuveeAiSignal: "Cuvée créée automatiquement depuis l'historique importé."
    };
    const profile = estimateCuveeProfile(cuvee);
    cuvee.rarity = profile.rarity;
    cuvee.image = profile.image;
    cuvee.cuveeAiSignal = profile.signal;
    state.cuvees.push(cuvee);
    created += 1;
  });
  return created;
}

function importedHistoryScore(quantity) {
  return clamp(Math.log10(Math.max(Number(quantity || 0), 1)) * 2.3, 3, 9);
}

function importedMarginScore(margin, turnover) {
  const rate = Number(turnover) ? Number(margin || 0) / Number(turnover) : 0;
  return clamp(rate * 10, 3, 9);
}

function importedPotentialScore(quantity, margin) {
  return clamp(importedHistoryScore(quantity) * 0.65 + clamp(Math.log10(Math.max(Number(margin || 0), 1)) * 1.5, 2, 9) * 0.35, 3, 9);
}

function uniqueImportedClientId(name) {
  const base = `client-${normalizeText(name).replace(/\s+/g, "-").slice(0, 42) || "importe"}`;
  let id = base;
  let suffix = 2;
  while (state.clients.some((client) => client.id === id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

function marketIdForCountry(country) {
  const target = normalizeText(country);
  if (!target) return "";
  return state.markets.find((market) => normalizeText(market.country) === target)?.id || "";
}

function uniqueMarketId(country) {
  const base = `market-${normalizeText(country).replace(/\s+/g, "-").slice(0, 42) || "importe"}`;
  let id = base;
  let suffix = 2;
  while (state.markets.some((market) => market.id === id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

function findCuveeForImportedName(name, code) {
  const targetName = normalizeText(name);
  const targetCode = normalizeText(code);
  return state.cuvees.find((cuvee) => {
    const cuveeName = normalizeText(cuvee.name);
    const cuveeCode = normalizeText(cuvee.importedCode);
    return (
      (targetCode && cuveeCode && targetCode === cuveeCode) ||
      cuveeName === targetName ||
      (targetName && (cuveeName.includes(targetName) || targetName.includes(cuveeName)))
    );
  });
}

function uniqueCuveeId(name) {
  const base = `cuvee-${normalizeText(name).replace(/\s+/g, "-").slice(0, 42) || "importee"}`;
  let id = base;
  let suffix = 2;
  while (state.cuvees.some((cuvee) => cuvee.id === id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

function roundOne(value) {
  return Math.round(Number(value || 0) * 10) / 10;
}

async function parseXlsxSalesFile(file) {
  const entries = readZipEntries(await file.arrayBuffer());
  const sharedStrings = entries["xl/sharedStrings.xml"] ? parseSharedStrings(await readZipText(entries["xl/sharedStrings.xml"])) : [];
  const sheetEntry = entries["xl/worksheets/sheet1.xml"];
  if (!sheetEntry) throw new Error("la première feuille Excel est introuvable.");

  const tableHeaders = entries["xl/tables/table1.xml"] ? parseTableHeaders(await readZipText(entries["xl/tables/table1.xml"])) : [];
  const headers = tableHeaders.length ? tableHeaders : ["Nom + Prénom Client", "Code article", "TOTAL(Mt Ht)", "TOTAL(Marge)", "TOTAL(Quantité)"];
  const sheet = new DOMParser().parseFromString(await readZipText(sheetEntry), "application/xml");
  const rows = Array.from(sheet.getElementsByTagName("row"));

  return rows
    .map((row) => rowToSales(row, headers, sharedStrings))
    .filter((row) => row.clientName && (row.turnover || row.margin || row.quantity));
}

function rowToSales(row, headers, sharedStrings) {
  const cells = {};
  Array.from(row.getElementsByTagName("c")).forEach((cell) => {
    const ref = cell.getAttribute("r") || "";
    const column = ref.match(/[A-Z]+/)?.[0];
    if (column) cells[column] = cellValue(cell, sharedStrings);
  });

  const columns = columnNames(headers.length);
  const values = columns.reduce((acc, column, index) => {
    acc[headers[index] || column] = cells[column] ?? "";
    return acc;
  }, {});

  return {
    clientName: String(values["Nom + Prénom Client"] || values.A || "").trim(),
    countryName: String(values["Pays - Lib"] || values["Pays-Lib"] || "").trim(),
    articleCode: String(values["Cuvée - Code"] || values["Cuvée-Code"] || values["Code article"] || values.B || "").trim(),
    cuveeName: String(values["Cuvée - Lib"] || values["Cuvée-Lib"] || "").trim(),
    turnover: parseImportedNumber(values["TOTAL(Mt Ht)"] ?? values.C ?? values.E),
    margin: parseImportedNumber(values["TOTAL(Marge)"] ?? values.D ?? values.F),
    quantity: parseImportedNumber(values["TOTAL(Quantité)"] ?? values.E ?? values.G)
  };
}

function columnNames(count) {
  const columns = [];
  for (let i = 0; i < count; i += 1) {
    let n = i;
    let name = "";
    do {
      name = String.fromCharCode(65 + (n % 26)) + name;
      n = Math.floor(n / 26) - 1;
    } while (n >= 0);
    columns.push(name);
  }
  return columns;
}

function cellValue(cell, sharedStrings) {
  const value = cell.getElementsByTagName("v")[0]?.textContent ?? "";
  if (cell.getAttribute("t") === "s") return sharedStrings[Number(value)] ?? "";
  if (cell.getAttribute("t") === "inlineStr") return cell.getElementsByTagName("t")[0]?.textContent ?? "";
  return value;
}

function parseImportedNumber(value) {
  const number = Number(String(value ?? "").replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(number) ? number : 0;
}

function parseSharedStrings(xmlText) {
  const xml = new DOMParser().parseFromString(xmlText, "application/xml");
  return Array.from(xml.getElementsByTagName("si")).map((item) =>
    Array.from(item.getElementsByTagName("t")).map((node) => node.textContent || "").join("")
  );
}

function parseTableHeaders(xmlText) {
  const xml = new DOMParser().parseFromString(xmlText, "application/xml");
  return Array.from(xml.getElementsByTagName("tableColumn")).map((column) => column.getAttribute("name") || "");
}

function readZipEntries(buffer) {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  let eocd = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 66000); i -= 1) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("format XLSX non reconnu.");

  const entries = {};
  const totalEntries = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);
  for (let i = 0; i < totalEntries; i += 1) {
    if (view.getUint32(offset, true) !== 0x02014b50) break;
    const compression = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const uncompressedSize = view.getUint32(offset + 24, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = new TextDecoder().decode(bytes.slice(offset + 46, offset + 46 + nameLength));
    entries[name] = { buffer, compression, compressedSize, uncompressedSize, localOffset };
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

async function readZipText(entry) {
  const bytes = new Uint8Array(entry.buffer);
  const view = new DataView(entry.buffer);
  const localOffset = entry.localOffset;
  if (view.getUint32(localOffset, true) !== 0x04034b50) throw new Error("entrée XLSX invalide.");
  const nameLength = view.getUint16(localOffset + 26, true);
  const extraLength = view.getUint16(localOffset + 28, true);
  const start = localOffset + 30 + nameLength + extraLength;
  const compressed = bytes.slice(start, start + entry.compressedSize);
  let output;
  if (entry.compression === 0) {
    output = compressed;
  } else if (entry.compression === 8 && "DecompressionStream" in window) {
    const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    output = new Uint8Array(await new Response(stream).arrayBuffer());
  } else {
    throw new Error("compression Excel non supportée par ce navigateur.");
  }
  return new TextDecoder("utf-8").decode(output);
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
  const aiCuveeButton = event.target.closest("[data-ai-cuvee]");

  if (tabButton) showTab(tabButton.dataset.tab);
  if (openTabButton) showTab(openTabButton.dataset.openTab);
  if (deleteButton) deleteRecord(deleteButton.dataset.delete, deleteButton.dataset.id);
  if (aiMarketButton) runMarketAi(aiMarketButton.dataset.aiMarket);
  if (aiCuveeButton) runCuveeAi(aiCuveeButton.dataset.aiCuvee);
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

dom.salesFile.addEventListener("change", (event) => {
  handleSalesFile(event.target.files[0]);
  event.target.value = "";
});

dom.clearHistory.addEventListener("click", () => {
  state.previousSales = [];
  state.previousSalesFileName = "";
  state.previousSalesImportedAt = "";
  render();
});

document.querySelector("#addCuvee").addEventListener("click", addCuvee);
document.querySelector("#addMarket").addEventListener("click", addMarket);
document.querySelector("#addClient").addEventListener("click", addClient);
document.querySelector("#analyzeCuvees").addEventListener("click", runAllCuveeAi);
document.querySelector("#analyzeMarkets").addEventListener("click", runAllMarketAi);

render();


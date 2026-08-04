const API_PATH = 'api/parkingAvailability';
const FETCH_TIMEOUT_MS = 90_000;

const STATUS_MESSAGES = [
  'Et øyeblikk...',
  'Snart klar...',
];

let loadingInterval = null;
let loadingStartTime = null;
let currentMessage = 'Henter data';

async function fetchParking(signal) {
  const response = await fetch(API_PATH, { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

function formatTimestamp(iso) {
  return new Date(iso).toLocaleString('nb-NO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatSpaces(n) {
  return n === null ? '\u00C5pen' : String(n);
}

function renderParkingItem(item) {
  const { lat, lon } = item.coordinates;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}`;
  return (
    `<div class="parking-item">` +
    `<span><a href="${mapsUrl}" title="Vis i Google Maps">${escapeHtml(item.area)}</a></span>` +
    `<span>${escapeHtml(formatSpaces(item.availableSpaces))}</span>` +
    `</div>`
  );
}

function renderItems(items) {
  const lastUpdated = items.length
    ? `<p>Sist oppdatert ${escapeHtml(formatTimestamp(items[0].timestamp))}</p>`
    : '';
  return (
    `<h3>Antall ledige plasser</h3>` +
    `<ul>${items.map((item) => `<li>${renderParkingItem(item)}</li>`).join('')}</ul>` +
    lastUpdated
  );
}

function showLoading() {
  loadingStartTime = Date.now();
  currentMessage = 'Henter data';
  document.getElementById('app').innerHTML =
    '<p class="loading"><span id="loading-msg"></span><span class="spinner"></span></p>';
  updateLoading();
  loadingInterval = setInterval(updateLoading, 1000);
}

function stopLoading() {
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }
}

function updateLoading() {
  const msgEl = document.getElementById('loading-msg');
  if (!msgEl) return;
  const elapsed = Math.floor((Date.now() - loadingStartTime) / 1000);
  if (elapsed >= 10 && elapsed % 10 === 0) {
    currentMessage = STATUS_MESSAGES[Math.floor(Math.random() * STATUS_MESSAGES.length)];
  }
  msgEl.textContent = `${currentMessage} (${elapsed}s) `;
}

function showError(err) {
  document.getElementById('app').innerHTML =
    `<h5>Feil</h5>` +
    `<p class="error">${escapeHtml(err.message || String(err))}</p>` +
    `<button id="retry-btn">Pr\u00F8v igjen</button>`;
  document.getElementById('retry-btn').addEventListener('click', load);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

async function load() {
  showLoading();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const items = await fetchParking(controller.signal);
    clearTimeout(timeout);
    stopLoading();
    document.getElementById('app').innerHTML = renderItems(items);
  } catch (err) {
    clearTimeout(timeout);
    stopLoading();
    if (err.name === 'AbortError') {
      showError(new Error('Forespørselen tok for lang tid. Pr\u00F8v igjen.'));
    } else {
      showError(err);
    }
  }
}

load();

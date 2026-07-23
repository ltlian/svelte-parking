const API_PATH = 'api/parkingAvailability';
const FETCH_TIMEOUT_MS = 90_000;

async function fetchParking(signal) {
  const response = await fetch(API_PATH, { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

function formatTimestamp(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
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
  document.getElementById('app').innerHTML =
    '<p class="loading">Henter data<span class="spinner"></span></p>';
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
    document.getElementById('app').innerHTML = renderItems(items);
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      showError(new Error('Forespørselen tok for lang tid. Pr\u00F8v igjen.'));
    } else {
      showError(err);
    }
  }
}

load();

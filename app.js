// install service worker


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("SW registrado"))
    .catch(err => console.error("SW error:", err));
}


// SPA Tabs
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "history") loadHistory();
  if (id === "individual") renderIndividual();
}

let stats = {
  puntos: 0,
  rebotes: 0,
  tapas: 0,
  asistencias: 0,
  robos: 0,
  perdidas: 0,
  faltas: 0
};

// Render live stats
function renderLive() {
  const box = document.getElementById("live-stats");
  box.innerHTML = `
    <p><b>Puntos:</b> ${stats.puntos}</p>
    <p><b>Rebotes:</b> ${stats.rebotes}</p>
    <p><b>Tapas:</b> ${stats.tapas}</p>
    <p><b>Asistencias:</b> ${stats.asistencias}</p>
    <p><b>Robos:</b> ${stats.robos}</p>
    <p><b>Perdidas:</b> ${stats.perdidas}</p>
    <p><b>Faltas:</b> ${stats.faltas}</p>
  `;
}
renderLive();

// Add stats
function addStat(type, value) {
  stats[type] += value;
  renderLive();
}

// Reset
function resetLive() {
  stats = { puntos:0, rebotes:0, tapas:0, asistencias:0, robos:0, perdidas:0, faltas:0 };
  renderLive();
}

// Export
function exportLive() {
  const txt =
`Puntos: ${stats.puntos}
Rebotes: ${stats.rebotes}
Tapas: ${stats.tapas}
Asistencias: ${stats.asistencias}
Robos: ${stats.robos}
Perdidas: ${stats.perdidas}
Faltas: ${stats.faltas}`;

  navigator.clipboard.writeText(txt);
  alert("📋 Copiado para compartir!");
}

// Save match
function saveLive() {

  
const rival = prompt("Ingrese el nombre del equipo rival:");

  if (!rival || rival.trim() === "") {
    alert("⚠️ Debe ingresar un nombre válido.");
    return;
  }

  const list = JSON.parse(localStorage.getItem("partidos") || "[]");
  list.push({
    fecha: new Date().toLocaleString(),
    rival: rival.trim(),
    stats: { ...stats }
  });
  localStorage.setItem("partidos", JSON.stringify(list));
  alert("💾 Partido guardado!");
}

// Individual tab
function renderIndividual() {
  const div = document.getElementById("ind-stats");
  
  div.innerHTML = `
    <p><b>Puntos:</b> ${stats.puntos}</p>
    <p><b>Rebotes:</b> ${stats.rebotes}</p>
    <p><b>Tapas:</b> ${stats.tapas}</p>
    <p><b>Asistencias:</b> ${stats.asistencias}</p>
    <p><b>Robos:</b> ${stats.robos}</p>
    <p><b>Perdidas:</b> ${stats.perdidas}</p>
    <p><b>Faltas:</b> ${stats.faltas}</p>
  `;
}

function exportIndividual() {
  exportLive();
}

// Historial
function loadHistory() {
  const box = document.getElementById("hist-content");
  const list = JSON.parse(localStorage.getItem("partidos") || "[]");

  if (list.length === 0) {
    box.innerHTML = "<p>No hay partidos guardados.</p>";
    return;
  }

  box.innerHTML = list.map(p => `
    <div class="panel">
      <p><b>${p.fecha}</b> — Rival: <b>${p.rival}</b></p>
      <pre>${JSON.stringify(p.stats, null, 2)}</pre>
    </div>
  `).join("");
}
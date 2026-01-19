const API = "http://localhost:5000/api";

window.onload = () => {
  loadBlueprints();
  loadContracts();
};

function createBlueprint() {
  const name = document.getElementById("bpName").value;

  fetch(`${API}/blueprints`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      fields: [
        { type: "TEXT", label: "Employee Name", x: 10, y: 20 },
        { type: "DATE", label: "Joining Date", x: 10, y: 60 }
      ]
    })
  }).then(() => loadBlueprints());
}

function loadBlueprints() {
  fetch(`${API}/blueprints`)
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("blueprintSelect");
      select.innerHTML = "";
      data.forEach(bp => {
        const opt = document.createElement("option");
        opt.value = bp.id;
        opt.textContent = bp.name;
        select.appendChild(opt);
      });
    });
}

function createContract() {
  const name = document.getElementById("contractName").value;
  const blueprintId = document.getElementById("blueprintSelect").value;

  fetch(`${API}/contracts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, blueprintId })
  }).then(() => loadContracts());
}

function loadContracts() {
  fetch(`${API}/contracts`)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("contractsTable");
      table.innerHTML = "";
      data.forEach(c => {
        table.innerHTML += `
          <tr>
            <td>${c.name}</td>
            <td>${c.blueprintName}</td>
            <td>${c.status}</td>
            <td>
              <button onclick="changeStatus('${c.id}','APPROVED')">Approve</button>
              <button onclick="changeStatus('${c.id}','SENT')">Send</button>
              <button onclick="changeStatus('${c.id}','SIGNED')">Sign</button>
              <button onclick="changeStatus('${c.id}','LOCKED')">Lock</button>
            </td>
          </tr>`;
      });
    });
}

function changeStatus(id, status) {
  fetch(`${API}/contracts/${id}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nextStatus: status })
  }).then(() => loadContracts());
}

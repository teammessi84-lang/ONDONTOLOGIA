import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDJ5u-eNDrun9-XfLS-A8MFjn3e69E_Jhs",
  authDomain: "odontos-f856c.firebaseapp.com",
  databaseURL: "https://odontos-f856c-default-rtdb.firebaseio.com",
  projectId: "odontos-f856c",
  storageBucket: "odontos-f856c.firebasestorage.app",
  messagingSenderId: "941253430623",
  appId: "1:941253430623:web:ff9741c350073a77103aea"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.guardarPacienteFirebase = function (paciente) {
  push(ref(db, "pacientes"), paciente);
  console.log("Paciente guardado en Firebase");
};

window.cargarPacientesFirebase = function () {
  const pacientesRef = ref(db, "pacientes");

  onValue(pacientesRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      console.log("No hay pacientes en Firebase");
      return;
    }

    const lista = Object.entries(data).map(([firebaseId, p], index) => ({
      id: index + 1,
      firebaseId: firebaseId,
      nombre: p.nombre || "",
      dni: p.dni || "",
      nacimiento: p.nacimiento || "",
      genero: p.genero || "",
      telefono: p.telefono || "",
      email: p.email || "",
      alergias: p.alergias || "Ninguna",
      fecha: p.fecha || ""
    }));

    window.pacientes = lista;

    if (typeof pacientes !== "undefined") {
      pacientes = lista;
    }

    if (typeof renderPacientes === "function") renderPacientes();
    if (typeof renderDashboard === "function") renderDashboard();
    if (typeof poblarSelectPaciente === "function") poblarSelectPaciente();
    if (typeof poblarSelectHC === "function") poblarSelectHC();
    if (typeof renderAgenda === "function") renderAgenda();
    if (typeof renderEstadisticas === "function") renderEstadisticas();

    console.log("Pacientes cargados desde Firebase:", lista);
  });
};
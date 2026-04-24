// 🔔 TOAST
function mostrarToast(mensaje) {
  let toast = document.createElement("div");
  toast.className = "toast-custom";
  toast.innerText = mensaje;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

// 🔍 BUSCADOR
let serviciosData = [];

fetch('data/servicios.json')
  .then(res => res.json())
  .then(data => {
    serviciosData = data;
    renderServicios(data);
  });

function renderServicios(data) {
  let contenedor = document.getElementById("contenedor");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  data.forEach(servicio => {
    contenedor.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">

          <img src="${servicio.imagen}" class="card-img-top">

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${servicio.nombre}</h5>
            <p class="card-text">${servicio.descripcion}</p>

            <div class="mt-auto">
              <button class="btn btn-primary w-100 mb-2" onclick="verDetalle(${servicio.id})">
                Ver más
              </button>

              <button class="btn btn-outline-warning w-100" onclick="toggleFavorito(${servicio.id})">
                ⭐ Favorito
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  });
}

// 🔍 FILTRAR
function filtrarServicios() {
  let texto = document.getElementById("buscador").value.toLowerCase();

  let filtrados = serviciosData.filter(s =>
    s.nombre.toLowerCase().includes(texto)
  );

  renderServicios(filtrados);
}

// 📄 DETALLE
function verDetalle(id) {
  localStorage.setItem("servicioSeleccionado", id);
  window.location.href = "detalle.html";
}

// ⭐ FAVORITOS (AGREGAR / QUITAR)
function toggleFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
    mostrarToast("❌ Eliminado de favoritos");
  } else {
    favoritos.push(id);
    mostrarToast("⭐ Agregado a favoritos");
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// 📄 MOSTRAR DETALLE
fetch('data/servicios.json')
  .then(res => res.json())
  .then(data => {

    let contenedor = document.getElementById("detalle");
    if (!contenedor) return;

    let id = localStorage.getItem("servicioSeleccionado");
    let servicio = data.find(s => s.id == id);

    if (!servicio) {
      contenedor.innerHTML = "<p>No encontrado</p>";
      return;
    }

    contenedor.innerHTML = `
  <!-- 🎯 HERO -->
  <div class="detalle-hero p-5 text-white">
    <div class="container">
      <span class="badge bg-warning text-dark mb-3">Curso</span>
      <h1 class="fw-bold">${servicio.nombre}</h1>
      <p class="lead">${servicio.descripcion}</p>

      <button class="btn btn-light mt-3" onclick="toggleFavorito(${servicio.id})">
        ⭐ Guardar en favoritos
      </button>
    </div>
  </div>

  <!-- 📦 CONTENIDO -->
  <div class="container mt-5">
    <div class="row">

      <!-- IZQUIERDA -->
      <div class="col-md-8">

        <h3>📘 Sobre este curso</h3>
        <p>
          Este curso está diseñado para brindarte conocimientos prácticos y actualizados.
          Aprenderás paso a paso con ejemplos reales.
        </p>

        <h4 class="mt-4">📚 Lo que aprenderás</h4>
        <ul>
          <li>Conceptos fundamentales</li>
          <li>Buenas prácticas</li>
          <li>Desarrollo profesional</li>
        </ul>

      </div>

      <!-- DERECHA -->
      <div class="col-md-4">

        <div class="card shadow">
          <img src="${servicio.imagen}" class="card-img-top">

          <div class="card-body text-center">
            <h5>${servicio.nombre}</h5>

            <button class="btn btn-primary w-100 mt-3">
              Inscribirse
            </button>

            <p class="mt-3 text-muted">Acceso inmediato</p>
          </div>
        </div>

      </div>

    </div>
  </div>
`;
  });

// ⭐ MOSTRAR FAVORITOS
fetch('data/servicios.json')
  .then(res => res.json())
  .then(data => {

    let contenedor = document.getElementById("favoritos");
    if (!contenedor) return;

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let filtrados = data.filter(s => favoritos.includes(s.id));

    if (filtrados.length === 0) {
      contenedor.innerHTML = `
        <div class="text-center">
          <h4>No tienes favoritos</h4>
          <a href="servicios.html" class="btn btn-primary mt-3">
            Explorar
          </a>
        </div>
      `;
      return;
    }

    filtrados.forEach(servicio => {
      contenedor.innerHTML += `
        <div class="col-md-4">
          <div class="card shadow-sm">
            <img src="${servicio.imagen}" class="card-img-top">

            <div class="card-body">
              <h5>${servicio.nombre}</h5>
              <p>${servicio.descripcion}</p>

              <button class="btn btn-danger w-100" onclick="toggleFavorito(${servicio.id})">
                Quitar
              </button>
            </div>
          </div>
        </div>
      `;
    });
  });

// 📩 FORM
function validarFormulario() {
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let mensaje = document.getElementById("mensaje").value;

  if (!nombre || !correo || !mensaje) {
    mostrarToast("⚠️ Completa todos los campos");
    return false;
  }

  if (!correo.includes("@")) {
    mostrarToast("Correo inválido");
    return false;
  }

  mostrarToast("✅ Mensaje enviado");
  return true;
}
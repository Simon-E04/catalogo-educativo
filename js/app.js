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

// 🔄 VARIABLES GLOBALES
let serviciosData = [];

// 📦 CARGAR DATOS UNA SOLA VEZ
fetch('data/servicios.json')
  .then(res => res.json())
  .then(data => {
    serviciosData = data;

    renderServicios(serviciosData);
    renderDestacados(serviciosData);
    renderDetalle(serviciosData);
    renderFavoritos(serviciosData);
  });

// 🔍 RENDER SERVICIOS
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

              <button class="btn btn-danger w-100 mt-2" onclick="eliminarServicio(${servicio.id})">
                Eliminar
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

// ➕ AGREGAR SERVICIO (CRUD)
function agregarServicio() {
  let nombre = document.getElementById("nuevoNombre").value;
  let descripcion = document.getElementById("nuevoDescripcion").value;
  let imagen = document.getElementById("nuevaImagen").value;

  if (!nombre || !descripcion || !imagen) {
    mostrarToast("Completa todos los campos");
    return;
  }

  let nuevo = {
    id: Date.now(),
    nombre,
    descripcion,
    imagen
  };

  serviciosData.push(nuevo);
  renderServicios(serviciosData);

  mostrarToast("Servicio agregado");
}

// ❌ ELIMINAR SERVICIO (CRUD)
function eliminarServicio(id) {
  serviciosData = serviciosData.filter(s => s.id !== id);
  renderServicios(serviciosData);
  mostrarToast("Servicio eliminado");
}

// 📄 DETALLE
function verDetalle(id) {
  localStorage.setItem("servicioSeleccionado", id);
  window.location.href = "detalle.html";
}

// ⭐ FAVORITOS
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

// 📄 RENDER DETALLE
function renderDetalle(data) {
  let contenedor = document.getElementById("detalle");
  if (!contenedor) return;

  let id = localStorage.getItem("servicioSeleccionado");
  let servicio = data.find(s => s.id == id);

  if (!servicio) {
    contenedor.innerHTML = "<p>No encontrado</p>";
    return;
  }

  contenedor.innerHTML = `
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

  <div class="container mt-5">
    <div class="row">

      <div class="col-md-8">
        <h3>📘 Sobre este curso</h3>
        <p>Curso práctico y actualizado.</p>

        <h4 class="mt-4">📚 Lo que aprenderás</h4>
        <ul>
          <li>Conceptos fundamentales</li>
          <li>Buenas prácticas</li>
          <li>Desarrollo profesional</li>
        </ul>
      </div>

      <div class="col-md-4">
        <div class="card shadow">
          <img src="${servicio.imagen}" class="card-img-top">
          <div class="card-body text-center">
            <h5>${servicio.nombre}</h5>
            <button class="btn btn-primary w-100 mt-3">Inscribirse</button>
            <p class="mt-3 text-muted">Acceso inmediato</p>
          </div>
        </div>
      </div>

    </div>
  </div>
  `;
}

// ⭐ RENDER FAVORITOS
function renderFavoritos(data) {
  let contenedor = document.getElementById("favoritos");
  if (!contenedor) return;

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let filtrados = data.filter(s => favoritos.includes(s.id));

  contenedor.innerHTML = "";

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
}

// 🏠 HOME DINÁMICO
function renderDestacados(data) {
  let contenedor = document.getElementById("destacados");
  if (!contenedor) return;

  let primeros = data.slice(0, 3);

  primeros.forEach(servicio => {
    contenedor.innerHTML += `
      <div class="col-md-4">
        <div class="card shadow-sm">
          <img src="${servicio.imagen}" class="card-img-top">
          <div class="card-body">
            <h5>${servicio.nombre}</h5>
            <p>${servicio.descripcion}</p>
          </div>
        </div>
      </div>
    `;
  });
}

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
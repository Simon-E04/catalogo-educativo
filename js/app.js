// Cargar servicios
fetch('data/servicios.json')
  .then(res => res.json())
  .then(data => {

    let contenedor = document.getElementById("contenedor");

    if (!contenedor) return; // evita errores

    data.forEach(servicio => {
      contenedor.innerHTML += `
  <div class="col-md-4">
    <div class="card h-100 shadow-sm">

      <img src="${servicio.imagen}" class="card-img-top">

      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${servicio.nombre}</h5>
        <p class="card-text">${servicio.descripcion}</p>

        <button class="btn btn-primary mt-auto" onclick="verDetalle(${servicio.id})">
          Ver más
        </button>
      </div>

    </div>
  </div>
`;
    });
  });


// Función para ir a detalle
function verDetalle(id) {
  localStorage.setItem("servicioSeleccionado", id);
  window.location.href = "detalle.html";
}


// Mostrar detalle
fetch('data/servicios.json')
  .then(res => res.json())
  .then(data => {

    let contenedor = document.getElementById("detalle");

    if (!contenedor) return;

    let id = localStorage.getItem("servicioSeleccionado");

    let servicio = data.find(s => s.id == id);

    if (!servicio) {
      contenedor.innerHTML = "<p>No se encontró el servicio</p>";
      return;
    }

    contenedor.innerHTML = `
  <h2 class="mb-3">${servicio.nombre}</h2>
  
  <img src="${servicio.imagen}" class="img-fluid rounded mb-3">

  <p>${servicio.descripcion}</p>

  <button class="btn btn-primary mt-3" onclick="agregarFavorito(${servicio.id})">
    ⭐ Agregar a favoritos
  </button>
`;
  });


function agregarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (!favoritos.includes(id)) {
    favoritos.push(id);
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  alert("Agregado a favoritos");
}

fetch('data/servicios.json')
  .then(res => res.json())
  .then(data => {

    let contenedor = document.getElementById("favoritos");

    if (!contenedor) return;

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let filtrados = data.filter(s => favoritos.includes(s.id));

    if (filtrados.length === 0) {
      contenedor.innerHTML = `
  <div class="text-center mt-5">
    <h4>No tienes favoritos aún</h4>
    <a href="servicios.html" class="btn btn-primary mt-3">
      Explorar servicios
    </a>
  </div>
`;
      return;
    }

    filtrados.forEach(servicio => {
      contenedor.innerHTML += `
  <div class="col-md-4">
    <div class="card h-100 shadow-sm">

      <img src="${servicio.imagen}" class="card-img-top">

      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${servicio.nombre}</h5>
        <p class="card-text">${servicio.descripcion}</p>

        <button class="btn btn-outline-primary mt-auto" onclick="verDetalle(${servicio.id})">
          Ver más
        </button>
      </div>

    </div>
  </div>
`;
    });
  });

function validarFormulario() {

  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let mensaje = document.getElementById("mensaje").value;

  // Validar campos vacíos
  if (nombre === "" || correo === "" || mensaje === "") {
    alert("Todos los campos son obligatorios");
    return false;
  }

  // Validar correo
  if (!correo.includes("@")) {
    alert("Correo inválido");
    return false;
  }

  // Si todo está bien
  alert("✅ Mensaje enviado correctamente");

  return true;
}
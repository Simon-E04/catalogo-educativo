// Cargar servicios
fetch('data/servicios.json')
  .then(res => res.json())
  .then(data => {

    let contenedor = document.getElementById("contenedor");

    if (!contenedor) return; // evita errores

    data.forEach(servicio => {
      contenedor.innerHTML += `
        <div>
          <h3>${servicio.nombre}</h3>
          <p>${servicio.descripcion}</p>
          <button onclick="verDetalle(${servicio.id})">Ver más</button>
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
      <h2>${servicio.nombre}</h2>
      <img src="${servicio.imagen}">
      <p>${servicio.descripcion}</p>
      <button onclick="agregarFavorito(${servicio.id})">
    Agregar a favoritos
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
      contenedor.innerHTML = "<p>No tienes favoritos</p>";
      return;
    }

    filtrados.forEach(servicio => {
      contenedor.innerHTML += `
        <div>
          <h3>${servicio.nombre}</h3>
          <p>${servicio.descripcion}</p>
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
  alert("Mensaje enviado correctamente");

  return true;
}
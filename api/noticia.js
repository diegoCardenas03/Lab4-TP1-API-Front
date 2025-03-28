CKEDITOR.replace('contenidoHTML');

// Captura el evento submit del formulario
document.getElementById("noticia-form").addEventListener("submit", function (e) {
  e.preventDefault();
  guardarNoticia();
});

// Cargar empresas al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  cargarEmpresas();
});

function cargarEmpresas() {
  fetch("http://localhost:8080/api/empresas")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener las empresas");
      }
      return response.json();
    })
    .then((empresas) => {
      const selectEmpresa = document.getElementById("idEmpresa");
      empresas.forEach((empresa) => {
        const option = document.createElement("option");
        option.value = empresa.id;
        option.textContent = empresa.denominacion;
        selectEmpresa.appendChild(option);
      });
    })
    .catch((error) => console.error("Error al cargar empresas:", error));
}

function guardarNoticia() {
  const titulo = document.getElementById("titulo").value;
  const resumen = document.getElementById("resumen").value;
  const imagen = document.getElementById("imagen").value;
  const contenidoHTML = CKEDITOR.instances.contenidoHTML.getData();
  const publicada = document.getElementById("publicada").checked;
  const fechaPublicacion = document.getElementById("fechaPublicacion").value;
  const idEmpresa = document.getElementById("idEmpresa").value;

  const noticia = {
    titulo: titulo,
    resumen: resumen,
    imagen: imagen,
    contenidoHTML: contenidoHTML,
    publicada: publicada,
    fechaPublicacion: fechaPublicacion,
    idEmpresa: idEmpresa,
  };
  
  fetch("http://localhost:8080/api/noticias", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noticia),
  })
    .then((response) => {
      if (response.ok) {
        alert("Noticia guardada correctamente en el servidor.");
        console.log(noticia);
        window.location.href = 'index.html';
      } else {
        alert("Error al guardar la noticia.");
      }
    })
    .catch((error) => console.error("Error:", error));
}
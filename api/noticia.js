// Inicializa CKEditor
CKEDITOR.replace('contenidoHTML');

// Captura el evento submit del formulario
document.getElementById("noticia-form").addEventListener("submit", function (e) {
  e.preventDefault();
  guardarNoticia();
});

function guardarNoticia() {
  // Recopilar los datos del formulario o el editor
  const titulo = document.getElementById("titulo").value;
  const resumen = document.getElementById("resumen").value;
  const imagen = document.getElementById("imagen").value;
  const contenidoHTML = CKEDITOR.instances.contenidoHTML.getData();
  const publicada = document.getElementById("publicada").checked;
  const fechaPublicacion = document.getElementById("fechaPublicacion").value;
  const idEmpresa = document.getElementById("idEmpresa").value;

  // Crear el objeto de noticia
  const noticia = {
    titulo: titulo,
    resumen: resumen,
    imagen: imagen,
    contenidoHTML: contenidoHTML,
    publicada: publicada,
    fechaPublicacion: fechaPublicacion,
    idEmpresa: idEmpresa,
  };

  // Hacer la petición al servidor
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
      } else {
        alert("Error al guardar la noticia.");
      }
    })
    .catch((error) => console.error("Error:", error));
}
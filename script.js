// Inicializa TinyMCE
tinymce.init({
    selector: "#contenidoHTML",
    plugins: [
      "advlist autolink lists link image charmap preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
    ],
    toolbar:
      "undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help",
    height: 300,
  });
  
  // Captura el evento submit del formulario
  document.getElementById("noticia-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Obtén los valores del formulario
    const noticia = {
      id: Date.now(), // Genera un ID único temporal
      titulo: document.getElementById("titulo").value,
      resumen: document.getElementById("resumen").value,
      imagen: document.getElementById("imagen").value,
      contenidoHTML: tinymce.get("contenidoHTML").getContent(),
      publicada: document.getElementById("publicada").checked,
      fechaPublicacion: document.getElementById("fechaPublicacion").value,
      idEmpresa: document.getElementById("idEmpresa").value,
    };
  
    // Muestra los datos en consola (puedes enviarlos al backend aquí)
    console.log("Noticia guardada:", noticia);
  
    // Simula el envío al backend (puedes usar fetch o Axios aquí)
    alert("Noticia guardada correctamente!");
  });
  function guardarNoticia() {
    // Recopilar los datos del formulario o el editor
    const titulo = document.getElementById("titulo").value;
    const resumen = document.getElementById("resumen").value;
    const imagen = document.getElementById("imagen").value;
    const contenidoHTML = tinymce.get("editorHtml").getContent();
    const publicada = document.getElementById("publicada").checked;
    const fechaPublicacion = document.getElementById("fechaPublicacion").value;
    const idEmpresa = document.getElementById("idEmpresa").value;
  
    // Crear el objeto de noticia
    const noticia = {
      titulo: titulo,
      resumen: resumen,
      imagen: imagen,
      contenidoHtml: contenidoHTML,
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
        } else {
          alert("Error al guardar la noticia.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }
  
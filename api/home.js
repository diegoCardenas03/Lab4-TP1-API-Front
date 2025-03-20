// URL del endpoint del backend
const apiEmpresaUrl = 'http://localhost:8080/api/empresas/';
const apiNoticiasUrl = 'http://localhost:8080/api/noticias';

// Función para obtener el parámetro "id" de la URL
function obtenerParametroId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Devuelve el valor del parámetro "id"
}

// Función para cargar los datos de la empresa
async function cargarEmpresa() {
    const id = obtenerParametroId(); // Obtén el ID de la URL
    console.log('id: ', id);
    try {
      const response = await fetch(`${apiEmpresaUrl}${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la empresa');
      }
      const empresa = await response.json();
  
      // Completa las secciones de la página con los datos de la empresa
      document.querySelector('.navbar-brand small').innerHTML = `${empresa.denominacion} <br> Empresa`;
  
      // Actualiza el teléfono
      const telefonoElemento = document.querySelector('.help-box a');
      telefonoElemento.textContent = empresa.telefono;
      telefonoElemento.href = `callto:${empresa.telefono}`;
  
      // Actualiza el horario
      const horarioElemento = document.querySelector('.help-box small');
      horarioElemento.innerHTML = `<span>Horario:</span> ${empresa.horarioDeAtencion}`;
  
      // Sección "Quienes Somos"
      document.querySelector('section.well2 .col p').textContent = empresa.quienesSomos;
  
      // Pie de página
      document.querySelector('footer .rights').innerHTML = `${empresa.denominacion} &#169; <span id="copyright-year"></span>`;
    } catch (error) {
      console.error('Error al cargar la empresa:', error);
    }
  }

// // Función para configurar el mapa
// function configurarMapa(latitud, longitud) {
//   const iframe = document.querySelector('footer .map iframe');
//   iframe.src = `https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=${latitud},${longitud}`;
// }

// Función para cargar las últimas 5 noticias en el slider
// Función para cargar las últimas 5 noticias en el slider
async function cargarNoticias() {
    try {
      const response = await fetch(apiNoticiasUrl);
      if (!response.ok) {
        throw new Error('Error al obtener las noticias');
      }
  
      const noticias = await response.json();
  
      console.log('Noticias obtenidas:', noticias);
  
      if (noticias.length === 0) {
        console.warn('El array de noticias está vacío.');
        return;
      }
  
      // Selecciona todos los elementos existentes en el slider
      const slides = document.querySelectorAll('#camera > div');
  
      // Itera sobre las noticias y actualiza el contenido de los slides
      noticias.forEach((noticia, index) => {
        if (index < slides.length) {
          const slide = slides[index];
  
          // Actualiza la imagen de fondo
          slide.setAttribute('data-src', noticia.imagen);
  
          // Actualiza el título de la noticia
          const titulo = slide.querySelector('em > a');
          if (titulo) {
            titulo.textContent = noticia.titulo;
            titulo.href = `detalle.html?id=${noticia.idEmpresa}`;
          }
  
          // Actualiza el resumen de la noticia
          const resumen = slide.querySelector('.wrap > p');
          if (resumen) {
            resumen.textContent = noticia.resumen;
          }
  
          // Actualiza el enlace del botón
          const boton = slide.querySelector('.wrap > a');
          if (boton) {
            boton.href = `detalle.html?id=${noticia.idEmpresa}`;
          }
        }
      });
    } catch (error) {
      console.error('Error al cargar las noticias:', error);
    }
  }

// Llama a las funciones al cargar la página
window.onload = () => {
    cargarEmpresa();
    cargarNoticias();
};
// URL del endpoint del backend
const apiEmpresaUrl = 'http://localhost:8080/api/empresas/';
const apiNoticiaUrl = 'http://localhost:8080/api/noticias/';

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


    // Pie de página
    document.querySelector('footer .rights').innerHTML = `${empresa.denominacion} &#169; <span id="copyright-year"></span>`;
  } catch (error) {
    console.error('Error al cargar la empresa:', error);
  }
}

// Función para cargar los datos de la noticia
async function cargarNoticia() {
  const id = obtenerParametroId(); // Obtén el ID de la URL
  console.log('ID de la noticia:', id);

  try {
    const response = await fetch(`${apiNoticiaUrl}${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la noticia');
    }

    const noticia = await response.json();

    console.log('Noticia obtenida:', noticia);

    // Reemplaza los campos en el HTML
    document.querySelector('#imagenPrincipal').style.backgroundImage = `url('${noticia.imagen}')`;

    const tituloElementos = document.querySelectorAll('h2, #imagenPrincipal div');
    tituloElementos.forEach(el => el.textContent = noticia.titulo);

    document.querySelector('main .well4 .fecha').textContent = `Fecha Publicacion: ${noticia.fechaPublicacion}`;
    document.querySelector('main .well4 .row .terms-list dt').textContent = noticia.resumen;
    document.querySelector('main .well4 .row .terms-list dd').innerHTML = noticia.contenidoHTML;

    const fechaElemento = document.querySelector('main .well4 h2 + span');
    if (fechaElemento) {
      fechaElemento.textContent = `Fecha Publicacion: ${noticia.fechaPublicacion}`;
    }
  } catch (error) {
    console.error('Error al cargar la noticia:', error);
  }
}


// Llama a las funciones al cargar la página
window.onload = () => {
  cargarEmpresa();
  cargarNoticia();
};
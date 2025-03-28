const apiEmpresaUrl = 'http://localhost:8080/api/empresas/';
const apiNoticiaUrl = 'http://localhost:8080/api/noticias/';

function obtenerParametroId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function cargarEmpresa() {
  const id = obtenerParametroId();
  console.log('id: ', id);
  try {
    const response = await fetch(`${apiEmpresaUrl}${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la empresa');
    }
    const empresa = await response.json();

    // aca completa las secciones de la página con los datos de la empresa
    document.querySelector('.navbar-brand small').innerHTML = `${empresa.denominacion} <br> Empresa`;

    const telefonoElemento = document.querySelector('.help-box a');
    telefonoElemento.textContent = empresa.telefono;
    telefonoElemento.href = `callto:${empresa.telefono}`;

    const horarioElemento = document.querySelector('.help-box small');
    horarioElemento.innerHTML = `<span>Horario:</span> ${empresa.horarioDeAtencion}`;

    document.querySelector('footer .rights').innerHTML = `${empresa.denominacion} &#169; <span id="copyright-year"></span>`;
  } catch (error) {
    console.error('Error al cargar la empresa:', error);
  }
}

async function cargarNoticia() {
  const id = obtenerParametroId(); 
  console.log('ID de la noticia:', id);

  try {
    const response = await fetch(`${apiNoticiaUrl}${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la noticia');
    }

    const noticia = await response.json();

    console.log('Noticia obtenida:', noticia);

    document.querySelector('#imagenPrincipal').style.backgroundImage = `url('${noticia.imagen}')`;

    const tituloElementos = document.querySelectorAll('h2, #imagenPrincipal div');
    tituloElementos.forEach(el => el.textContent = noticia.titulo);

    document.querySelector('main .well4 .fecha').textContent = `Fecha Publicacion: ${noticia.fechaPublicacion}`;
    document.querySelector('main .well4 .row .terms-list dt').textContent = noticia.resumen;
    document.querySelector('main .well4 .row .terms-list dd').innerHTML = noticia.contenidoHTML;

    // boton p/ eliminar noticia
    const eliminarBoton = document.createElement('button');
    eliminarBoton.textContent = 'Eliminar Noticia';
    eliminarBoton.className = 'btn btn-danger btn-sm';
    eliminarBoton.style.marginTop = '10px';
    eliminarBoton.onclick = () => eliminarNoticia(id);

    const container = document.querySelector('main .well4 .container');
    container.appendChild(eliminarBoton);

  } catch (error) {
    console.error('Error al cargar la noticia:', error);
  }
}

async function eliminarNoticia(id) {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta noticia?');
  if (!confirmacion) return;

  try {
    const response = await fetch(`${apiNoticiaUrl}delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Noticia eliminada correctamente.');
      window.location.href = './';
    } else {
      alert('Error al eliminar la noticia.');
    }
  } catch (error) {
    console.error('Error al eliminar la noticia:', error);
  }
}

window.onload = () => {
  cargarEmpresa();
  cargarNoticia();
};
const apiEmpresaUrl = 'http://localhost:8080/api/empresas/';
const apiNoticiasUrl = 'http://localhost:8080/api/noticias';

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

    document.querySelector('.navbar-brand small').innerHTML = `${empresa.denominacion}`;

    const telefonoElemento = document.querySelector('.help-box a');
    telefonoElemento.textContent = empresa.telefono;
    telefonoElemento.href = `callto:${empresa.telefono}`;

    const horarioElemento = document.querySelector('.help-box small');
    horarioElemento.innerHTML = `<span>Horario:</span> ${empresa.horarioDeAtencion}`;

    document.querySelector('section.well2 .col p').textContent = empresa.quienesSomos;

    document.querySelector('footer .rights').innerHTML = `${empresa.denominacion} &#169; <span id="copyright-year"></span>`;
  } catch (error) {
    console.error('Error al cargar la empresa:', error);
  }
}

async function cargarNoticias() {
  try {
    const idEmpresa = obtenerParametroId();

    if (!idEmpresa) {
      console.error('No se encontró el ID de la empresa en la URL.');
      return;
    }

    const response = await fetch(`${apiNoticiasUrl}?idEmpresa=${idEmpresa}`);
    if (!response.ok) {
      throw new Error('Error al obtener las noticias');
    }

    const noticias = await response.json();

    console.log('Noticias obtenidas:', noticias);

    if (noticias.length === 0) {
      console.warn('No hay noticias relacionadas con esta empresa.');
      return;
    }

    const slider = document.querySelector('#camera');

    if (!slider) {
      console.error('No se encontró el contenedor del slider.');
      return;
    }

    slider.innerHTML = '';

    // max 5 noticias
    const noticiasLimitadas = noticias.slice(0, 5);

    noticiasLimitadas.forEach((noticia) => {
      const slide = document.createElement('div');
      slide.setAttribute('data-src', noticia.imagen);

      const fechaPublicacion = new Date(noticia.fechaPublicacion).toLocaleDateString();

      slide.innerHTML = `
        <div class="camera_caption fadeIn">
          <div class="jumbotron">
            <em>
              <a href="detalle.html?id=${noticia.id}">${noticia.titulo}</a>
            </em>
            <p><small>Publicado el: ${fechaPublicacion}</small></p>
            <div class="wrap">
              <p>${noticia.resumen}</p>
              <a href="detalle.html?id=${noticia.id}" class="btn-link fa-angle-right"></a>
            </div>
          </div>
        </div>
      `;

      slider.appendChild(slide);
    });

    if (typeof jQuery !== 'undefined' && jQuery().camera) {
      jQuery('#camera').camera({
        height: '50%',
        loader: 'bar',
        pagination: true,
        thumbnails: false,
        hover: false,
        playPause: false,
        navigation: noticiasLimitadas.length > 1, // los botones de navegacion solo salen si hay mas de 1 noticia publicada
        fx: 'simpleFade'
      });
    } else {
      console.error('El plugin Camera no está disponible.');
    }
  } catch (error) {
    console.error('Error al cargar las noticias:', error);
  }
}

async function iniciarMap() {
  try {
    const id = obtenerParametroId();
    console.log('ID de la empresa:', id);

    const response = await fetch(`${apiEmpresaUrl}${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la empresa');
    }

    const empresa = await response.json();
    console.log('Datos de la empresa para el mapa:', empresa);

    const coord = { lat: parseFloat(empresa.latitud), lng: parseFloat(empresa.longitud) };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: coord
    });

    const marker = new google.maps.Marker({
      position: coord,
      map: map
    });

    const infoContent = `
        <div class="informacionEmpresa">
            <h3>${empresa.denominacion}</h3>
            <p><strong>Teléfono:</strong> <a href="tel:${empresa.telefono}">${empresa.telefono}</a></p>
            <p><strong>Domicilio:</strong> ${empresa.domicilio}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${empresa.email}">${empresa.email}</a></p>
        </div>
      `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  } catch (error) {
    console.error('Error al inicializar el mapa:', error);
  }
}

window.iniciarMap = async function () {
  try {
    const id = obtenerParametroId();
    console.log('ID de la empresa:', id);

    const response = await fetch(`${apiEmpresaUrl}${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la empresa');
    }

    const empresa = await response.json();
    console.log('Datos de la empresa para el mapa:', empresa);

    const coord = { lat: parseFloat(empresa.latitud), lng: parseFloat(empresa.longitud) };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: coord
    });

    const marker = new google.maps.Marker({
      position: coord,
      map: map
    });

    const infoContent = `
      <div class="informacionEmpresa">
          <h3>${empresa.denominacion}</h3>
          <p><strong>Teléfono:</strong> <a href="tel:${empresa.telefono}">${empresa.telefono}</a></p>
          <p><strong>Domicilio:</strong> ${empresa.domicilio}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${empresa.email}">${empresa.email}</a></p>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });

    infoWindow.open(map, marker);

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  } catch (error) {
    console.error('Error al inicializar el mapa:', error);
  }
};

window.onload = () => {
  cargarEmpresa();
  cargarNoticias();
  iniciarMap();
};
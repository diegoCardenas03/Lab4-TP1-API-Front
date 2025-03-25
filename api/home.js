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

async function iniciarMap() {
  try {
    const id = obtenerParametroId(); // Obtén el ID de la URL
    console.log('ID de la empresa:', id);

    // Realiza la solicitud al backend para obtener los datos de la empresa
    const response = await fetch(`${apiEmpresaUrl}${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la empresa');
    }

    const empresa = await response.json();
    console.log('Datos de la empresa para el mapa:', empresa);

    // Obtén las coordenadas de la empresa
    const coord = { lat: parseFloat(empresa.latitud), lng: parseFloat(empresa.longitud) };

    // Inicializa el mapa con las coordenadas de la empresa
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: coord
    });

    // Agrega un marcador en las coordenadas de la empresa
    const marker = new google.maps.Marker({
      position: coord,
      map: map
    });

    // Contenido de la ventana de información
    const infoContent = `
        <div class="informacionEmpresa">
            <h3>${empresa.denominacion}</h3>
            <p><strong>Teléfono:</strong> <a href="tel:${empresa.telefono}">${empresa.telefono}</a></p>
            <p><strong>Domicilio:</strong> ${empresa.domicilio}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${empresa.email}">${empresa.email}</a></p>
        </div>
      `;

    // Ventana de información
    const infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });

    // Muestra la ventana de información al hacer clic en el marcador
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  } catch (error) {
    console.error('Error al inicializar el mapa:', error);
  }
}

window.iniciarMap = async function () {
  try {
    const id = obtenerParametroId(); // Obtén el ID de la URL
    console.log('ID de la empresa:', id);

    // Realiza la solicitud al backend para obtener los datos de la empresa
    const response = await fetch(`${apiEmpresaUrl}${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la empresa');
    }

    const empresa = await response.json();
    console.log('Datos de la empresa para el mapa:', empresa);

    // Obtén las coordenadas de la empresa
    const coord = { lat: parseFloat(empresa.latitud), lng: parseFloat(empresa.longitud) };

    // Inicializa el mapa con las coordenadas de la empresa
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15, // Nivel de zoom
      center: coord // Centra el mapa en las coordenadas de la empresa
    });

    // Agrega un marcador en las coordenadas de la empresa
    const marker = new google.maps.Marker({
      position: coord,
      map: map
    });

    // Contenido del cuadro de información (InfoWindow)
    const infoContent = `
      <div class="informacionEmpresa">
          <h3>${empresa.denominacion}</h3>
          <p><strong>Teléfono:</strong> <a href="tel:${empresa.telefono}">${empresa.telefono}</a></p>
          <p><strong>Domicilio:</strong> ${empresa.domicilio}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${empresa.email}">${empresa.email}</a></p>
      </div>
    `;

    // Crea la ventana de información
    const infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });

    // Muestra la ventana de información al cargar el mapa
    infoWindow.open(map, marker);

    // También muestra la ventana de información al hacer clic en el marcador
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  } catch (error) {
    console.error('Error al inicializar el mapa:', error);
  }
};

// Llama a las funciones al cargar la página
window.onload = () => {
  cargarEmpresa();
  cargarNoticias();
  iniciarMap();

};
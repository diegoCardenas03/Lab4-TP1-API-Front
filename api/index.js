// URL del endpoint de tu backend que devuelve las empresas
const apiUrl = 'http://localhost:8080/api/empresas';

// Función para cargar las empresas
async function cargarEmpresas() {
  try {
    // Realiza la petición al backend
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al obtener las empresas');
    }

    // Convierte la respuesta a JSON
    const empresas = await response.json();

    // Verifica los datos en la consola
    console.log(empresas);

    // Obtén la tabla donde se mostrarán las empresas
    const tabla = document.getElementById('empresaTable');

    // Itera sobre las empresas y crea las filas dinámicamente
    empresas.forEach(empresa => {
      const fila = document.createElement('tr');

      // Columna de la denominación de la empresa
      const columnaEmpresa = document.createElement('td');
      columnaEmpresa.textContent = empresa.denominacion;
      fila.appendChild(columnaEmpresa);

      // Columna del enlace
      const columnaEnlace = document.createElement('td');
      const enlace = document.createElement('a');
      enlace.href = `home.html?id=${empresa.id}`;
      enlace.textContent = 'URL PAGINA HOME';
      columnaEnlace.appendChild(enlace);
      fila.appendChild(columnaEnlace);

      // Agrega la fila a la tabla
      tabla.appendChild(fila);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Llama a la función al cargar la página
window.onload = cargarEmpresas;
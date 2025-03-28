const apiUrl = 'http://localhost:8080/api/empresas';

// Función para cargar las empresas
async function cargarEmpresas() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al obtener las empresas');
    }

    const empresas = await response.json();

    console.log(empresas);

    const tabla = document.getElementById('empresaTable');

    // itera sobre las empresas y crea las filas
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

      // Columna del botón eliminar
      const columnaEliminar = document.createElement('td');
      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.onclick = () => eliminarEmpresa(empresa.id);
      columnaEliminar.appendChild(botonEliminar);
      fila.appendChild(columnaEliminar);

      tabla.appendChild(fila);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function eliminarEmpresa(id) {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta empresa?');
  if (!confirmacion) return;

  try {
    const response = await fetch(`${apiUrl}/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Empresa eliminada correctamente.');
      location.reload(); // Recarga la página para actualizar la lista
    } else {
      alert('Error al eliminar la empresa.');
    }
  } catch (error) {
    console.error('Error al eliminar la empresa:', error);
  }
}

window.onload = cargarEmpresas;
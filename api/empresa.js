document.getElementById('registrarEmpresa').addEventListener('click', async () => {
    const form = document.getElementById('empresaForm');
    const formData = new FormData(form);

    const data = {
        denominacion: formData.get('denominacion'),
        telefono: formData.get('telefono'),
        horarioDeAtencion: formData.get('horarioDeAtencion'),
        quienesSomos: formData.get('quienesSomos'),
        latitud: parseFloat(formData.get('latitud')),
        longitud: parseFloat(formData.get('longitud')),
        domicilio: formData.get('domicilio'),
        email: formData.get('email')
    };

    try {
        const response = await fetch('http://localhost:8080/api/empresas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Empresa registrada con éxito');
            form.reset();
        } else {
            alert('Error al registrar la empresa');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
});
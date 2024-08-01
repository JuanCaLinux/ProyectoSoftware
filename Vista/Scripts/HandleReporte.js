function CargarReportes() {
    const usuarioId = localStorage.getItem('userId');
    if (usuarioId) {
        fetch(`/api/registrar-gasto?usuarioId=${usuarioId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Cargar opciones en el <select>
                    const select = document.getElementById('buscarReporte');
                    data.data.forEach(gasto => {
                        const option = document.createElement('option');
                        option.value = gasto.id; // Asume que 'id' es el identificador del gasto
                        option.textContent = `${gasto.id}`; // Personaliza el texto del option
                        select.appendChild(option);
                    });

                    // Manejar el cambio en el <select>
                    select.addEventListener('change', (event) => {
                        const selectedId = event.target.value;
                        if (selectedId) {
                            const selectedGasto = data.data.find(gasto => gasto.id == selectedId);
                            mostrarEnTabla(selectedGasto);
                        }
                    });
                } else {
                    console.error('Error al cargar los reportes:', data.message);
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }
}

function mostrarEnTabla(gasto) {
    const tbody = document.querySelector('.resultados tbody');
    tbody.innerHTML = ''; // Limpiar contenido anterior

    if (gasto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${gasto.categoria}</td>
            <td>${gasto.cantidad}</td>
            <td>${gasto.fecha}</td>
            <td>${gasto.descripcion}</td>
            <td>${gasto.id}</td>
        `;
        tbody.appendChild(row);
    }
}
function eliminarGasto(gastoId) {
    fetch(`/api/registrar-gasto?gastoId=${gastoId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Gasto eliminado con éxito');

                location.reload()

                CargarReportes();
            } else {
                console.error('Error al eliminar el gasto:', data.message);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud de eliminación:', error);
        });
}


document.addEventListener('DOMContentLoaded', () => {
    CargarReportes();

    document.getElementById('eliminarReporte').addEventListener('click', () => {
        const select = document.getElementById('buscarReporte');
        const selectedId = select.value;
        if (selectedId) {
            eliminarGasto(selectedId);
        } else {
            console.error('No se ha seleccionado ningún gasto para eliminar');
        }
    });
    // Manejar el clic en el botón de eliminar

});






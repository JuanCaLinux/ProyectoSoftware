document.addEventListener('DOMContentLoaded', function() {
    const usuarioId = localStorage.getItem('userId');
    if (!usuarioId) {
        alert('Usuario no autenticado');
        return;
    }

    fetch(`/api/categoria?usuarioId=${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const categoriaSelect = document.getElementById('categoria');
                data.data.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id;
                    option.textContent = categoria.nombre;
                    categoriaSelect.appendChild(option);
                });
            } else {
                alert('Error al cargar las categorías: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error al cargar las categorías:', error);
            alert('Error al cargar las categorías: ' + error.message);
        });
});












document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    const cantidad = document.getElementById('cantidad').value;
    const fecha = document.getElementById('fecha').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;

    // Obtén el ID del usuario desde el almacenamiento local
    const usuarioId = localStorage.getItem('userId');
    console.log('ID del usuario obtenido de localStorage:', usuarioId);

    if (!usuarioId) {
        alert('Usuario no autenticado');
        return;
    }

    console.log(cantidad,fecha, descripcion, categoria,usuarioId)

    fetch('/api/registrar-gasto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cantidad, fecha, descripcion, categoria, usuarioId })
    })
        .then(response => response.text().then(text => {

            try {
                return JSON.parse(text);
            } catch (err) {
                throw new Error(`No es JSON: ${text}`);
            }
        }))
        .then(data => {
            console.log(data);

            if (data.success) {
                alert('Gasto registrado exitosamente');
                document.getElementById('formulario').reset();
            } else {
                alert('Error al registrar el gasto: ' + (data.message || 'Error desconocido'));
            }
        })
        .catch(error => {
            console.error('Error al intentar registrar el gasto:', error);
            alert('Error al intentar registrar el gasto: ' + error.message);
        });
});

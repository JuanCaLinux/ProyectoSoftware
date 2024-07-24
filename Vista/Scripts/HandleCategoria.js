// Obtener datos del backend y actualizar la interfaz de usuario
document.addEventListener('DOMContentLoaded', () => {
    const usuarioId = localStorage.getItem('userId');

    if (usuarioId) {
        fetch(`/categoria?usuarioId=${usuarioId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    let tableBody = document.querySelector('.tabla tbody');
                    tableBody.innerHTML = ''; // Limpiar tabla existente

                    data.data.forEach(categoria => {
                        let row = document.createElement('tr');
                        row.setAttribute('data-id', categoria.id); // Almacena el ID en un atributo de datos

                        row.innerHTML = `
                            <td class="categoria"><input type="text"  value="${categoria.nombre}"></td>
                            <td class="monto"><input type="number"  value="${categoria.presupuesto}"></td>
                            <td class="id"><input type="hidden"  value="${categoria.id}"></td>
                            <td><button class="edit-button" onclick="editarFila(this)">Editar</button></td>
                        `;

                        tableBody.appendChild(row);
                    });
                }
            });
    }
});


document.getElementById("guardar").addEventListener("click",()=> {
    // Función para obtener el contenido de las celdas y enviarlo al servidor
    const usuarioId = localStorage.getItem('userId');
    let count = 0
    let categorias = [];
    console.log(usuarioId)
    if (usuarioId) {
                    let tableBody = document.querySelector('.tabla tbody');
                    let filas = tableBody.querySelectorAll('tr');


                    filas.forEach(fila => {
                        const categoria = fila.querySelector('.categoria input').value;
                        const monto = fila.querySelector('.monto input').value;
                        const id = fila.querySelector('.id input').value;

                        if (categoria && monto) {  // Asegúrate de que ambos campos no estén vacíos
                            categorias.push({id,categoria, monto,usuarioId });
                        }
                        count ++;
                    });

                    categorias.map(categoria=>{
                        console.log(categoria)
                    })
                    // console.log(data.data[0].nombre)
                    fetch(`/categoria?usuarioId=${usuarioId}`, {
                    method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({categorias})
                }).then(response => response.json())
                        .then(data=>{
                            if(data.success) {
                                alert("categorias guardadas correctamente")
                            }else{
                                alert("error, ingrese todos los campos")
                            }
                    })
                }
})



        /*let tableBody = document.querySelector('.tabla tbody');
        let filas = tableBody.querySelectorAll('tr');
        let categorias = [];


        filas.forEach(fila => {
            const categoria = fila.querySelector('.categoria input').value;
            const monto = fila.querySelector('.monto input').value;

            if (categoria && monto) {  // Asegúrate de que ambos campos no estén vacíos
                categorias.push({ categoria, monto });
            }
        });


        // Enviar datos al servidor
        fetch('/categoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categorias)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Categorías guardadas exitosamente');
                } else {
                    alert('Hubo un error al guardar las categorías');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
})*/
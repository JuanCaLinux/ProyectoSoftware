

document.getElementById("formRegister").addEventListener("submit", function(event){
    event.preventDefault()

    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const email = document.getElementById("email").value
    const telefono = document.getElementById("telefono").value
    const usuario = document.getElementById("usuario").value
    const password = document.getElementById("password").value

    fetch("/Register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre,apellido,email,telefono,usuario,password })
    })
        .then(response => {
            if (!response.ok) {
                // Si la respuesta no es exitosa, intenta extraer el mensaje de error
                return response.json().then(errorResponse => {
                    throw new Error(errorResponse.message || 'Error desconocido');
                });
            }
            return response.json()
        })
        .then(data => {
            if (data.success) {
            window.location.href = 'index.html';
            alert("usuario registrado correctamente.")
            } else {
            alert('Error');
            }
    }).catch(error => {
        console.error('Error:', error);
        alert('Error al intentar Registrarse');
    });
})



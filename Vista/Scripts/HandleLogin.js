document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al intentar iniciar sesión');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                window.location.href = 'menu.html';
            } else {
                alert('Email o contraseña incorrectos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al intentar iniciar sesión');
        });
});

document.querySelector('.register').addEventListener('click', function() {
    // Redirige a la página de registro cuando se hace clic en el botón de registrarse
    window.location.href = 'register.html';
});
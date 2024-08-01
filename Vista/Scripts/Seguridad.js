document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        // Si no hay usuario logueado, redirige al login
        window.location.href = 'index.html';
    }

    // Manejo del botón de cerrar sesión
    document.getElementById('logoutButton').addEventListener('click', function() {
        // Eliminar la información de sesión del localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('role');

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = 'index.html';
    });
});
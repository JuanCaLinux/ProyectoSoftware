document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('graficoGastos').getContext('2d');

    const datos = {
        labels: ['COMIDA', 'TRANSPORTE', 'ENTRETENIMIENTO'],
        datasets: [{
            data: [400000, 150000, 100000],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
    };

    const config = {
        type: 'pie',
        data: datos,
    };

    const graficoGastos = new Chart(ctx, config);

    document.getElementById('generarInforme').addEventListener('click', function() {
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;
        alert(`Generando informe desde ${fechaInicio} hasta ${fechaFin}`);
    });

    document.getElementById('buscarGasto').addEventListener('click', function() {
        const categoria = document.getElementById('categoria').value;
        const monto = document.getElementById('monto').value;
        const fecha = document.getElementById('fecha').value;
        alert(`Buscando gasto en categoría ${categoria} de ${monto} en fecha ${fecha}`);
    });
});

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Cargar el archivo HTML
const html = fs.readFileSync(path.resolve(__dirname, '../personalizarPresupuesto.html'), 'utf8');

let dom;
let document;

beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;

    // Cargar el script y exponer funciones globales
    const scriptContent = fs.readFileSync(path.resolve(__dirname, 'CrudCustomizeBudget.js'), 'utf8');
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);

    // Exponer funciones globales para pruebas
    dom.window.editarFila = dom.window.editarFila || function() {};
    dom.window.guardarFila = dom.window.guardarFila || function() {};
    dom.window.agregarCategoria = dom.window.agregarCategoria || function() {};
});

describe('editarFila', () => {
    test('should replace text with input fields and change button text to "Guardar"', () => {
        const button = document.createElement('button');
        button.innerText = 'Editar';

        const row = document.createElement('tr');
        const categoriaCell = document.createElement('td');
        categoriaCell.classList.add('categoria');
        categoriaCell.innerText = 'ALIMENTO';
        const montoCell = document.createElement('td');
        montoCell.classList.add('monto');
        montoCell.innerText = '400,000';

        row.appendChild(categoriaCell);
        row.appendChild(montoCell);
        const buttonCell = document.createElement('td');
        buttonCell.appendChild(button);
        row.appendChild(buttonCell);
        document.querySelector('.tabla tbody').appendChild(row);

        // Llamar a la función editarFila
        dom.window.editarFila(button);

        expect(categoriaCell.querySelector('input').value).toBe('ALIMENTO');
        expect(montoCell.querySelector('input').value).toBe('400,000');
        expect(button.innerText).toBe('Guardar');
    });
});

describe('guardarFila', () => {
    test('should replace input fields with text and change button text to "Editar"', () => {
        const button = document.createElement('button');
        button.innerText = 'Guardar';

        const row = document.createElement('tr');
        const categoriaCell = document.createElement('td');
        categoriaCell.classList.add('categoria');
        categoriaCell.innerHTML = '<input type="text" value="ALIMENTO">';
        const montoCell = document.createElement('td');
        montoCell.classList.add('monto');
        montoCell.innerHTML = '<input type="text" value="400,000">';

        row.appendChild(categoriaCell);
        row.appendChild(montoCell);
        const buttonCell = document.createElement('td');
        buttonCell.appendChild(button);
        row.appendChild(buttonCell);
        document.querySelector('.tabla tbody').appendChild(row);

        // Llamar a la función guardarFila
        dom.window.guardarFila(button);

        expect(categoriaCell.innerText).toBe('ALIMENTO');
        expect(montoCell.innerText).toBe('400,000');
        expect(button.innerText).toBe('Editar');
    });
});

test('should add a new row with input fields and an Editar button', async () => {
    // Configura el entorno para la prueba
    document.body.innerHTML = `
        <table class="tabla">
            <tbody></tbody>
        </table>
        <button id="agregar-categoria">Agregar Categoría</button>
    `;
    const { agregarCategoria } = require('./CrudCustomizeBudget.js');

    // Ejecuta la función que estás probando
    agregarCategoria();

    // Espera a que el DOM se actualice
    await new Promise(r => setTimeout(r, 100)); // Ajusta el tiempo de espera si es necesario

    // Verifica el resultado
    const tableBody = document.querySelector('.tabla tbody');
    const newRow = tableBody.querySelector('tr');
    const editButton = newRow.querySelector('button');

    expect(editButton).not.toBeNull();
    expect(editButton.innerText).toBe('Editar');
});

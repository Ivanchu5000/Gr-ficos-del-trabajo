const selectModo = document.getElementById('selectModo');
const selectMaximosRelativos = document.getElementById('selectMaximosRelativos');
const pi = Math.PI;
let arrayDenominadores = [];

//Array numeros especiales: 7, 113, 33102, 33215

let myChart = null; // Variable global para almacenar la instancia de Chart.js

selectModo.addEventListener('change', () => {
    if(selectModo.value == 'normal'){
        document.getElementById('txtMultiplo').classList.add('hidden');
        document.getElementById('minimo').classList.remove('hidden');
        selectMaximosRelativos.classList.add('hidden');
    }
    if(selectModo.value == 'multiplos'){
        document.getElementById('txtMultiplo').classList.remove('hidden');
        document.getElementById('minimo').classList.add('hidden');
        selectMaximosRelativos.classList.add('hidden');
    }
    if(selectModo.value == 'maximosRelativos'){
        document.getElementById('txtMultiplo').classList.add('hidden');
        document.getElementById('minimo').classList.remove('hidden');
        selectMaximosRelativos.classList.remove('hidden');
    }
});

function crearGrafico(){
    if(selectModo.value == 'normal'){
        errorPi()
    }
    if(selectModo.value == 'aproximacion'){
        errorPiAproximacion()
    }
    if(selectModo.value == 'multiplos'){
        errorPiMultiplos()
    }
    if(selectModo.value == 'maximosRelativos'){
        errorPiMaximosRelativos(selectMaximosRelativos.value)
    }
    if(selectModo.value == 'grafico4'){
        grafico4();
    }
}

function grafico4(){
    let min = parseInt(document.getElementById('minimo').value);
    let max = parseInt(document.getElementById('maximo').value);
    const pi = Math.PI;
    let ejex = [];
    let ejey = [];

    for(let i = Math.floor(2*min)/2; i<=max; i+=pi/2){
        ejex.push(i);
        if(Math.floor(i/pi)===i/pi){
            ejey.push(0);
        }
        else{
            ejey.push(1/2);
        }
    }

    graficar(ejex,ejey);
}

function errorPi() {
    let min = parseInt(document.getElementById('minimo').value);
    let max = parseInt(document.getElementById('maximo').value);
    if(min>=max || isNaN(min) || isNaN(max)){
        return;
    }
    const pi = Math.PI;
    let ejex = [];
    let ejey = [];
    arrayDenominadores = [];
    
    for (let i = min; i <= max; i++) {
        let denominador1 = parseInt(i / pi);
        let denominador2 = denominador1 + 1;
        let error1 = Math.abs(pi-i/denominador1);
        let error2 = Math.abs(pi-i/denominador2);
        let denominador = 0;
        if(error1<=error2){
            denominador = denominador1;
        }
        else{
            denominador = denominador2;
        }
        let error = Math.abs(pi - (i / denominador));
        let errorRelativo = error * i;
        ejex.push(i);
        ejey.push(errorRelativo);
        arrayDenominadores.push(denominador);
    }       

    console.log(arrayDenominadores);
    console.log(ejex, ejey);
    
    graficar(ejex,ejey);
}
function errorPiAproximacion() {
    let min = parseInt(document.getElementById('minimo').value);
    let max = parseInt(document.getElementById('maximo').value);
    const pi = Math.PI;
    let ejex = [];
    let ejey = [];
    let ejex2 = [];
    let ejey2 = [];
    arrayDenominadores = [];
    
    for (let i = min; i <= max; i++) {
        let denominador1 = parseInt(i / pi);
        let denominador2 = denominador1 + 1;
        let error1 = Math.abs(pi-i/denominador1);
        let error2 = Math.abs(pi-i/denominador2);
        let denominador = 0;
        if(error1<=error2){
            denominador = denominador1;
        }
        else{
            denominador = denominador2;
        }
        let error = Math.abs(pi - (i / denominador));
        let errorRelativo = error * i;
        ejex.push(i);
        ejey.push(errorRelativo);
        arrayDenominadores.push(denominador);
    }
    let k;
    if(Math.floor(2*min/Math.PI)%2===0){
        k=0;
    }
    else{
        k=1;
    }
    for (let i = Math.floor(2*min/Math.PI)*(Math.PI/2); i<=max; i+=Math.PI/2) {
        ejex2.push(i);
        if(k%2===0){
            ejey2.push(0);
        }
        else{
            ejey2.push(Math.pow(Math.PI,2)/2);
        }
        k++;
    }
        

    console.log(arrayDenominadores);
    console.log(ejex, ejey);
    
    graficar(ejex,ejey);
    graficar(ejex2, ejey2);
}

function errorPiMultiplos(){
    let multiplo = parseInt(document.getElementById('txtMultiplo').value);
    let max = parseInt(document.getElementById('maximo').value);
    const pi = Math.PI;
    let ejex = [];
    let ejey = [];
    arrayDenominadores = [];

    for (let i = multiplo; i <= max; i+=multiplo) {
        let denominador1 = parseInt(i / pi);
        let denominador2 = denominador1 + 1;
        let error1 = Math.abs(pi-i/denominador1);
        let error2 = Math.abs(pi-i/denominador2);
        let denominador = 0;
        if(error1<=error2){
            denominador = denominador1;
        }
        else{
            denominador = denominador2;
        }
        let error = Math.abs(pi - (i / denominador));
        let errorRelativo = error * i;
        ejex.push(i);
        ejey.push(errorRelativo);
        arrayDenominadores.push(denominador);
    }
    console.log(arrayDenominadores);
    console.log(ejex, ejey);

    graficar(ejex,ejey);
}

function errorPiMaximosRelativos(modo){
    cuenta = 0;
    arrayEspeciales = [];
    arrayNumeros = [];

    let min = parseInt(document.getElementById('minimo').value);
    let max = parseInt(document.getElementById('maximo').value);
    const pi = Math.PI;
    let ejex = [];
    let ejey = [];
    arrayDenominadores = [];
    arrayNumeros = [];
    let arrayUltimosErrores = [];

    for (let i = min; i <= max; i++) {
        let denominador1 = parseInt(i / pi);
        let denominador2 = denominador1 + 1;
        let error1 = Math.abs(pi-i/denominador1);
        let error2 = Math.abs(pi-i/denominador2);
        let denominador = 0;
        if(error1<=error2){
            denominador = denominador1;
        }
        else{
            denominador = denominador2;
        }
        let error = Math.abs(pi - (i / denominador));
        let errorRelativo = error * i;
        arrayUltimosErrores.push(errorRelativo);

        if(arrayUltimosErrores.length > 3){
            arrayUltimosErrores.splice(0, 1);
        }
        if(arrayUltimosErrores[1] > arrayUltimosErrores[0] && arrayUltimosErrores[1] > arrayUltimosErrores[2]){
            if(modo == 'normal'){
                ejex.push((i-1));
                ejey.push(arrayUltimosErrores[1]);
                arrayDenominadores.push(denominador);
            }
            if(modo == 'anteriores'){
                ejex.push((i-2));
                ejey.push(arrayUltimosErrores[0]);
                arrayDenominadores.push(denominador);
                /*
                encontrarNumeros(ejey);
                */
            }
            if(modo == 'posteriores'){
                ejex.push((i));
                ejey.push(arrayUltimosErrores[2]);
                arrayDenominadores.push(denominador);
            }
        }
    }

    let arrayConsola = [];
    for(let i = 0; i<ejex.length; i++){
        arrayConsola.push(`Número: ${ejex[i]}, denominador: ${arrayDenominadores[i]}, error: ${ejey[i]}`);
    }
    console.log(arrayConsola);
    console.log(arrayEspeciales);
    graficar(ejex,ejey);
}

let cuenta = 0;
let arrayEspeciales = [];
let arrayNumeros = [];

function arrayNumerosEspeciales() {
    // Si arrayEspeciales está vacío, agregamos cuenta
    if (arrayEspeciales.length === 0) {
        arrayEspeciales.push({ numero: cuenta, repeticiones: 1 });
        return;
    }

    // Verificar si cuenta ya está en arrayEspeciales
    let encontrado = arrayEspeciales.find(obj => obj.numero === cuenta);
    if (encontrado) {
        encontrado.repeticiones++;
        return;
    }

    // Buscar si cuenta - 1 está y tiene más de una repetición
    let anterior = arrayEspeciales.find(obj => obj.numero === cuenta - 1 && obj.repeticiones > 1);

    if (anterior) {
        let operacion = anterior.numero * anterior.repeticiones + cuenta;
        let encontrar106 = arrayEspeciales.find(obj => obj.numero === operacion + anterior.numero);
        anterior.repeticiones = 0;

        if(encontrar106){
            let operacion2 = encontrar106.numero * encontrar106.repeticiones + operacion;
            let encontrarOperacion2 = arrayEspeciales.find(obj => obj.numero === operacion2);

            if(encontrarOperacion2){
                encontrarOperacion2.repeticiones++;
            }
            else{
                arrayEspeciales.push({ numero: operacion2, repeticiones: 1});
            }

            encontrar106.repeticiones = 0;

        }

        else{
            let operacionExistente = arrayEspeciales.find(obj => obj.numero === operacion);
            if (operacionExistente) {
                operacionExistente.repeticiones++;
            } 
            else {
                  arrayEspeciales.push({ numero: operacion, repeticiones: 1 });
            }
        }
    } 
    else {
        arrayEspeciales.push({ numero: cuenta, repeticiones: 1 });
    }
}

function encontrarNumeros(arrayErrores) {
    if (arrayErrores.at(-1) > arrayErrores.at(-2)) {
        arrayNumeros.push(cuenta);
        arrayNumerosEspeciales();
        cuenta = 0;
        arrayEspeciales.sort((a, b) => a.numero - b.numero);
    }
    cuenta++;
}

function reset() {
    if(myChart) {
        myChart.destroy();
        myChart = null;
    }
}

function graficar(ejex, ejey) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Colores predefinidos para cada nuevo gráfico
    const colores = [
        'rgba(75, 192, 192, 1)',   // azul verdoso
        'rgba(255, 99, 132, 1)',   // rojo
        'rgba(54, 162, 235, 1)',   // azul
        'rgba(255, 206, 86, 1)',   // amarillo
        'rgba(153, 102, 255, 1)',  // violeta
        'rgba(255, 159, 64, 1)'    // naranja
    ];

    // Convertir ejex y ejey en pares {x, y}
    const dataXY = ejex.map((x, i) => ({ x: x, y: ejey[i] }));

    if (myChart) {
        // Creamos un nuevo dataset y lo añadimos
        const nuevoColor = colores[myChart.data.datasets.length % colores.length];
        myChart.data.datasets.push({
            label: 'Error relativo ' + (myChart.data.datasets.length + 1),
            data: dataXY,
            borderColor: nuevoColor,
            backgroundColor: nuevoColor.replace('1)', '0.2)'), // versión transparente
            borderWidth: 2,
            fill: true,
            showLine: true,
            pointRadius: 3
        });
        myChart.update({
            animation: false
        });
    } else {
        // Si no existe, la creamos
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Error relativo 1',
                    data: dataXY,
                    borderColor: colores[0],
                    backgroundColor: colores[0].replace('1)', '0.2)'),
                    borderWidth: 2,
                    fill: true,
                    showLine: true,
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                animation: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const index = context.dataIndex;
                                return 'Denominador: ' + arrayDenominadores[index];
                            }
                        }
                    }
                },
                layout: {
                    padding: 0
                },
                scales: {
                    x: {
                        type: 'linear',
                        offset: false,
                        grace: 0,
                        title: {
                            display: true,
                            text: 'Valores (X)'
                        }
                    },
                    y: {
                        grace: 0,
                        title: {
                            display: true,
                            text: 'Error Relativo'
                        }
                    }
                }
            }
        });
    }
}

document.addEventListener('keydown', event => {
    if(event.key === 'Enter'){
        crearGrafico();
    }
});
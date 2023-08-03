let inputMoneda = document.getElementById("inputMoneda");
let selectedMoneda = document.getElementById("selectMoneda");
let botonBuscar = document.getElementById("buscarMoneda");
let resultado = document.getElementById('resultado');
let myChart = null;
let chartDOM = document.getElementById('myChart')

getMonedaData();
async function getMonedaData() {

    try {
        const res = await fetch(`https://mindicador.cl/api/${selectedMoneda.value}`);
        const monedaData = await res.json();
        console.log(monedaData);
        return monedaData;

    } catch (error) {
        console.error("An error occurred while fetching data from the API:", error);
    }
}

botonBuscar.addEventListener("click", async () => {
    const monedaData = await getMonedaData();

    console.log(inputMoneda.value)
    console.log(selectedMoneda.value)
    console.log(monedaData.serie[0].valor);
    let conversion = (inputMoneda.value / monedaData.serie[0].valor).toFixed(2);
    resultado.innerHTML = `${conversion}`

    // Creamos las variables necesarias para el objeto de configuración
    const tipoDeGrafica = "line";
    const valorDeMoneda = monedaData.serie.map((moneda) => moneda.valor);
    const fechas = monedaData.serie.map((moneda) => moneda.fecha.slice(0, 10));
    const titulo = `Valor de ${selectedMoneda.value} en los últimos 10 días`;
    const colorDeLinea = "red";

    const config = {
        type: tipoDeGrafica,
        data: {
            labels: fechas.reverse(),
            datasets: [{
                label: titulo,
                backgroundColor: colorDeLinea,
                data: valorDeMoneda,
            }]
        }
    };

// Esto lo agregué porque no me dejaba hacer un Chart en el mismo lugar donde ya existe
// un Chart. Por lo mismo tuve que definir la variable myChart al principio.
if (myChart){
    myChart.destroy();
}    myChart = new Chart(chartDOM, config);
});
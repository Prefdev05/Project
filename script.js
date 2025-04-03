// Plugin personalizado para dibujar > y < como puntos
const arrowPointPlugin = {
    id: 'arrowPointPlugin',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            if (!meta.hidden) {
                meta.data.forEach((point, index) => {
                    // Obtener la posición del punto
                    const x = point.x;
                    const y = point.y;

                    // Determinar el símbolo a dibujar
                    const symbol = dataset.label === 'Vía Aérea' ? '>' : '<';

                    // Estilo del texto
                    ctx.save();
                    ctx.font = 'bold 16px Arial'; // Tamaño y fuente del símbolo
                    ctx.fillStyle = dataset.borderColor; // Color del símbolo
                    ctx.textAlign = 'center'; // Alineación horizontal
                    ctx.textBaseline = 'middle'; // Alineación vertical

                    // Dibujar el símbolo
                    ctx.fillText(symbol, x, y);
                    ctx.restore();
                });
            }
        });
    }
};

// Registrar el plugin
Chart.register(arrowPointPlugin);

// Obtén el contexto del canvas donde se dibujará el gráfico
const ctxDerecho = document.getElementById('oidoDerechoChart').getContext('2d');

// Crea el gráfico para el oído derecho
const oidoDerechoChart = new Chart(ctxDerecho, {
    type: 'line', // Tipo de gráfico: línea
    data: {
        labels: [250, 500, 1000, 2000, 4000, 6000, 8000], // Frecuencias en Hz
        datasets: [
            {
                label: 'Vía Aérea', // Etiqueta para la vía aérea
                data: [10, 25, 35, 45, 55, 65], // Valores de umbral en dB HL
                borderColor: 'blue', // Color de la línea
                fill: false, // No rellenar el área bajo la línea
                pointRadius: 0 // Ocultar los puntos predeterminados
            },
            {
                label: 'Vía Ósea', // Etiqueta para la vía ósea
                data: [30, 40, 50, 80, 55, 60], // Valores de umbral en dB HL
                borderColor: 'blue', // Color de la línea
                fill: false, // No rellenar el área bajo la línea
                pointRadius: 0 // Ocultar los puntos predeterminados
            }
        ]
    },
    options: {
        scales: {
            y: {
                reverse: true, // Invertir el eje Y
                min: -10, // Valor mínimo del eje Y
                max: 120, // Valor máximo del eje Y
                ticks: {
                    stepSize: 10, // Mostrar valores de 10 en 10
                    callback: function (value) {
                        return value + ''; // Agregar "dB" a los valores
                    }
                },
                title: {
                    display: true,
                    text: 'dB HL' // Etiqueta del eje Y
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Frecuencia (Hz)' // Etiqueta del eje X
                }
            }
        }
    }
});

// Obtén el contexto del canvas donde se dibujará el gráfico
const ctxIzquierdo = document.getElementById('oidoIzquierdoChart').getContext('2d');

// Crea el gráfico para el oído izquierdo
const oidoIzquierdoChart = new Chart(ctxIzquierdo, {
    type: 'line', // Tipo de gráfico: línea
    data: {
        labels: [250, 500, 1000, 2000, 4000, 6000, 8000], // Frecuencias en Hz
        datasets: [
            {
                label: 'Vía Aérea', // Etiqueta para la vía aérea
                data: [15, 25, 35, 45, 55, 65], // Valores de umbral en dB HL
                borderColor: 'red', // Color de la línea
                fill: false, // No rellenar el área bajo la línea
                pointRadius: 0 // Ocultar los puntos predeterminados
            },
            {
                label: 'Vía Ósea', // Etiqueta para la vía ósea
                data: [10, 20, 30, 40, 50, 60], // Valores de umbral en dB HL
                borderColor: 'red', // Color de la línea
                fill: false, // No rellenar el área bajo la línea
                pointRadius: 0 // Ocultar los puntos predeterminados
            }
        ]
    },
    options: {
        scales: {
            y: {
                reverse: true, // Invertir el eje Y
                min: -10, // Valor mínimo del eje Y
                max: 120, // Valor máximo del eje Y
                ticks: {
                    stepSize: 10, // Mostrar valores de 10 en 10
                    callback: function (value) {
                        return value + ''; // Agregar "dB" a los valores
                    }
                },
                title: {
                    display: true,
                    text: 'dB HL' // Etiqueta del eje Y
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Frecuencia (Hz)' // Etiqueta del eje X
                }
            }
        }
    }
});

// Obtén el contexto del canvas donde se dibujará el gráfico
const ctxLogoaudiometria = document.getElementById('logoaudiometriaChart').getContext('2d');

// Crea el gráfico para la logoaudiometría
const logoaudiometriaChart = new Chart(ctxLogoaudiometria, {
    type: 'line', // Tipo de gráfico: línea
    data: {
        labels: ['Oído Derecho', 'Oído Izquierdo'], // Etiquetas para cada oído
        datasets: [
            {
                label: 'OD', // Etiqueta para el oído derecho
                data: [85, 90], // Porcentajes de reconocimiento
                borderColor: 'blue', // Color de la línea
                fill: false // No rellenar el área bajo la línea
            },
            {
                label: 'OI', // Etiqueta para el oído izquierdo
                data: [80, 95], // Porcentajes de reconocimiento
                borderColor: 'red', // Color de la línea
                fill: false // No rellenar el área bajo la línea
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true, // Comenzar el eje Y desde 0
                max: 100, // Valor máximo del eje Y
                ticks: {
                    stepSize: 10, // Mostrar valores de 10 en 10
                    callback: function (value) {
                        return value + ' %'; // Agregar "%" a los valores
                    }
                },
                title: {
                    display: true,
                    text: 'Porcentaje (%)' // Etiqueta del eje Y
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Oído' // Etiqueta del eje X
                }
            }
        }
    }
});
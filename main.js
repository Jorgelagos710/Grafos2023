let datos = []
const tamanoCuadrado = 300
const canvas = document.querySelector("#diana1")
const cuadradoX = 0 // Borde izquierdo de la página

function Diana(canvas, tirosTotales)
{
  const ctx = canvas.getContext("2d")

  // Definimos el tamaño y la posición del cuadrado

  let cuadradoY = (canvas.height - tamanoCuadrado) / 2 // Posición en Y para centrar el cuadrado

  // Dibujamos el cuadrado

  ctx.beginPath()
  ctx.rect(cuadradoX, cuadradoY, tamanoCuadrado, tamanoCuadrado)
  ctx.fillStyle = "#fff" // Color blanco de relleno
  ctx.fill()
  ctx.lineWidth = 2 // Ancho del borde
  ctx.strokeStyle = "#000" // Color negro del borde
  ctx.stroke()

  // Definimos el tamaño y la posición de la diana

  const diametroCirculo = tamanoCuadrado // Diámetro de la diana (igual que el lado del cuadrado)
  var circuloX = cuadradoX + tamanoCuadrado / 2 // Posición en X para centrar la diana en el centro del cuadrado
  var circuloY = cuadradoY + tamanoCuadrado / 2 // Posición en Y para centrar la diana en el centro del cuadrado
  var radioCirculo = diametroCirculo / 2 // Radio de la diana

  // Dibujamos la diana

  ctx.beginPath()
  ctx.arc(circuloX, circuloY, radioCirculo, 0, Math.PI * 2)
  ctx.fillStyle = "#fff" // Color blanco de relleno
  ctx.fill()
  ctx.lineWidth = 2 // Ancho del borde
  ctx.strokeStyle = "#000" // Color negro del borde
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(circuloX, circuloY, radioCirculo * 0.8, 0, Math.PI * 2)
  ctx.fillStyle = "#f00" // Color rojo de relleno
  ctx.fill()
  ctx.beginPath()
  ctx.arc(circuloX, circuloY, radioCirculo * 0.6, 0, Math.PI * 2)
  ctx.fillStyle = "#fff" // Color blanco de relleno
  ctx.fill()
  ctx.beginPath()
  ctx.arc(circuloX, circuloY, radioCirculo * 0.4, 0, Math.PI * 2)
  ctx.fillStyle = "#f00" // Color rojo de relleno
  ctx.fill()
  ctx.beginPath()
  ctx.arc(circuloX, circuloY, radioCirculo * 0.2, 0, Math.PI * 2)
  ctx.fillStyle = "#fff" // Color blanco de relleno
  ctx.fill()

  // Simulación de 50 tiros aleatorios

  const datosNecesarios = {
    tirosTotales, cuadradoX, cuadradoY, ctx, circuloX, circuloY, radioCirculo
  }

  simularTiros(datosNecesarios) // Se invoca la funcion que simmula los tiros
}

const simularTiros = ({ tirosTotales, cuadradoX, cuadradoY, ctx, circuloX, circuloY, radioCirculo} ) =>
{
  let aciertos = 0 // Variable que almacena los aciertos a la diana

  for (let i = 0; i < tirosTotales; i++) // Cantidad de veces que se simula = tirosTotales
  {
    // Generamos una posición aleatoria dentro del área del cuadrado
    const tiroX = Math.floor(Math.random() * tamanoCuadrado) + cuadradoX // Eje X
    const tiroY = Math.floor(Math.random() * tamanoCuadrado) + cuadradoY // Eje Y

    // Dibujamos el tiro
    ctx.fillStyle = "#000" // El tiro es negro
    ctx.fillText(".", tiroX, tiroY)

    // Verificamos si el tiro dio en la diana
    const dx = tiroX - circuloX // Cateto X (Se posiciona en el centro)
    const dy = tiroY - circuloY // Cateto Y (Se posiciona en el centro)
    const distance = Math.sqrt(dx*dx + dy*dy) // Hipotenusa

    if (distance <= radioCirculo) // Cuando da en la diana...
    {
      ctx.fillStyle = "#f0f" // El tiro se vuelve magenta
      ctx.fillText(".", tiroX, tiroY)
      aciertos++ // Aumenta el acierto
    }
  }

 // Mostramos los resultados en el marcador
 const resultadoAciertoVsTiros = aciertos / tirosTotales // Aciertos a la diana entre Tiros Totales
 const resultadoPantalla = `${aciertos} / ${tirosTotales}` // La division pero en texto
 ctx.fillStyle = "#000" // Color negro para el texto
 ctx.fillText(resultadoPantalla + " = " + resultadoAciertoVsTiros + " La aproximacion de PI es igual a: " + 4*resultadoAciertoVsTiros, cuadradoX, cuadradoY + tamanoCuadrado + 20)
 datos.push(4 * resultadoAciertoVsTiros) // Se añade la aproximación de PI en el array datos
}

Diana(canvas, 600000) // Se invoca la funcion DIANA

const tirosTotales = 600000 // CANTIDAD DE TIROS

const datosSimularTanda = {
  tamanoCuadrado, canvas, cuadradoX, tirosTotales
 } // Array de datos para las simulaciones teóricas

const simularTanda = ({tamanoCuadrado, canvas, cuadradoX, tirosTotales}) => // Función de simulación de tiros teórica
{
  let aciertos = 0; // Contador de aciertos
  for (let i = 0; i < tirosTotales; i++)
  {
    let cuadradoY = (canvas.height - tamanoCuadrado) / 2 // Posición en Y para centrar el cuadrado
    const tiroX = Math.floor(Math.random() * tamanoCuadrado) + cuadradoX // Eje X
    const tiroY = Math.floor(Math.random() * tamanoCuadrado) + cuadradoY // Eje Y

    const diametroCirculo = tamanoCuadrado // Diámetro de la diana (igual que el lado del cuadrado)
    const circuloX = cuadradoX + tamanoCuadrado / 2 // Posición en X para centrar la diana en el centro del cuadrado
    const circuloY = cuadradoY + tamanoCuadrado / 2 // Posición en Y para centrar la diana en el centro del cuadrado
    const radioCirculo = diametroCirculo / 2 // Radio de la diana

    // Verificamos si el tiro dio en la diana
    const dx = tiroX - circuloX // Cateto X (se posiciona en el centro)
    const dy = tiroY - circuloY // Cateto Y (se posiciona en el centro)
    const distance = Math.sqrt(dx*dx + dy*dy) // Hipotenusa

    // console.log({dx, dy})

    if (distance <= radioCirculo) // Si está en la diana, contabiliza el acierto
    {
      aciertos++
    }
  }
  const resultadoAciertoVsTiros = aciertos / tirosTotales // Aciertos a la diana entre Tiros Totales
  datos.push(4 * resultadoAciertoVsTiros) // Se añade la aproximación de PI en el array datos
}

const tandasTotales = 1000 // CANTIDAD DE TANDAS

for (let i = 0; i < tandasTotales; i++) // Se invoca la función simularTanda las n veces que se estipule en tandasTotales
{
  simularTanda(datosSimularTanda)
}

// Gráfico

const labels = Array.from({ length: datos.length }, (_, i) => i + 1) // Crea labels dinámicos dependiendo del tamaño del array a utilizar (de 1 a n)

const ctx = document.getElementById('myChart').getContext('2d')
const chart = new Chart(ctx, {
    type: 'line', // Grafico de lineas
    data: {
        labels: labels, // Labels dinamicas
        datasets: [{
            label: 'Gráfico de resultados', // Titulo del Grafico
            data: datos, // Array con los datos
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color del fondo
            borderColor: 'rgba(255, 99, 132, 1)', // Color de las lineas
            borderWidth: 1 // Ancho del borde
        }]
    },
    options: {}
})

// Error Resultados Simulación

let promPI = 0 // Variable que va a almacenar el promedio de todos los datos del array "datos"
for (let i = 0; i < datos.length; i++) // Se suman todos los datos
{
  promPI += datos[i]
}
promPI /= datos.length // Se dividen por el tamaño del array
promPIText = `${promPI}` // Variable que contiene el promedio pero en texto
errorAbsoluto = `${Math.PI - promPI}` // Error absoluto en texto

document.getElementById("chart-description").innerHTML = "El promedio de todos los datos equivale a " + promPIText + ". Por lo tanto, de los datos mostrados, el error absoluto equivale a " + errorAbsoluto + ", por lo que podemos concluir que el experimento fue un exito."


// Tabla

const tabla = document.createElement("table") // Se crea el objeto tabla
tabla.style.border = "1px solid black" // Se le da un borde en negro de 1 pixel de ancho

tabla.classList.add("mi-tabla") // CSS que le da un margen a la tabla

const tablaOrden = tabla.insertRow() // Crea una celda
tablaOrden.insertCell().textContent = "Tabla de Datos" // La llena conn el titulo

datos.forEach((dato) => { // Funcion que crea un espacio en la tabla y lo llena con cada valor del array "datos"
  const fila = tabla.insertRow() // Crea la celda
  fila.insertCell().textContent = dato.toString() // La llena con el dato
 })

document.body.appendChild(tabla) // Lo agrega al final del cuerpo de la página
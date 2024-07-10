# Excuela Challenge

Este proyecto fue generado con Angular CLI versión `17.2.1`.

## Servidor de Prueba y Demo

Ejecuta `npm install` para instalar las dependencias del proyecto.

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias cualquier archivo fuente.

Demo: https://excuela-challenge.web.app

---

# Instrucciones de Uso

Aquí se detallaran las instrucciones de uso de cada uno de los componentes personalizables.

## Chart Component

El componente utiliza la librería `ng2-charts` para crear los gráficos, que a su vez utiliza `chart.js` para renderizarlos. 
Nota: Para más información de todas las posibles opciones por favor ver la documentación oficial de [ng2-charts](https://github.com/valor-software/ng2-charts) y [chart.js](http://www.chartjs.org/docs).

El componente de gráficos posee dos inputs:
  `chartType`: Indica el tipo de gráfico que se desea utilizar. Es un string que contiene como valor el nombre del gráfico, por ejemplo `pie` para un gráfico circular.
  `chartData`: Un objeto que contiene la configuración y data que utilizará el gráfico para renderizar.

  ### Ejemplo de uso

  ```typescript
    chartType: ChartType = 'bar';
    chartData: ChartConfiguration['data'] = {
      labels: ["Usuarios Gratuitos", "Usuarios de Paga", "Usuarios en Prueba"],
      datasets: [
        {
          data: [30, 55, 15]
        },
      ]
    };
  ```
  

 ```html
    <app-chart [chartType]="chartType" [chartData]="chartData"></app-chart>
  ```




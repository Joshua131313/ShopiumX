import React from 'react'
import Charts from "react-apexcharts"


const Chart = (props) => {

    const {
      charttype, 
      chartname='' ,
      xaxis=['one', 'two', 'three', 'four', 'five','six'], 
      data=[30, 69, 54, 50, 33, 12, 78],
      enabled=true,
      show=true,
      curve,
      color
      } = props
  
  const options = {
    chart: {
      height: '100%',
      id: 'area',
      toolbar: {
        show: false,
        tools: {
          zoom:false,
          pan: false,
          reset: false,
          zoomin: false,
        }
      }
    },
    yaxis: {
      show: show
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      x: 'Name',
      enabled: enabled
    },
    stroke: {
      curve
    },
    fill: {
      opacity: 1,
      colors: [color]
    },
    colors: [color],
    xaxis: {
      categories: xaxis,
      labels: {
        show: show
      },
      axisBorder: {
        show: show
      },
      axisTicks: {
        show: show
      }
    },

      grid: {
        show: false,
        padding: {
          top: 10,
          right: 0,
          bottom: 0,
          left: 15
      },  
      },
    responsive: [{
      breakpoint: 100,
      options: {
        chart: {
          width: '100%',
          height: '100%',
        },

      }
    }],
    plotOptions: {
      bar: {
        columnWidth: '60%'
      }
    }
  }

  const series = [
    {
    name: 'series1',
    data: data
  }, {
    name: 'series2',
    data: [20, 39, 34, 20, 13, 62, 30]
  }
]


  return (
    <div className="chart">
      <Charts options={options} series={series} type={charttype}/>

    </div>
  )
}
export default Chart
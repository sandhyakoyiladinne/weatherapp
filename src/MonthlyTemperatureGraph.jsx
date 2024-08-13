
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const MonthlyTemperatureGraph = ({ monthlyData, unit }) => {
  const getTemperatureData = () => {
    const labels = monthlyData.map(data => data.month);
    const data = monthlyData.map(data => data.avgTemp);
    return {
      labels,
      datasets: [
        {
          label: `Average Temperature (${unit})`,
          data,
          fill: false,
          backgroundColor: 'black', 
          borderColor: 'black', 
          pointBackgroundColor: 'darkviolet', 
          pointBorderColor: 'white', 
          pointHoverBackgroundColor: 'black', 
          pointHoverBorderColor: 'pink', 
          pointRadius: 5, 
          pointHoverRadius: 10, 
          pointHitRadius: 7, 
          color:'yellow',
        },
      ],
      options: {
        scales: {
          x: {
            grid: {
              color: 'red', 
            },
          },
          y: {
            grid: {
              color: 'red', 
            },
          },
        },
      },
    };
  };

  return (
    <div className="monthly-temperature-graph">
      <h2>Monthly Temperature Data</h2>
      <Line data={getTemperatureData()} />
    </div>
  );
};

export default MonthlyTemperatureGraph;


// import React, { useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart } from 'chart.js/auto';

// const MonthlyTemperatureGraph = ({ monthlyData, unit }) => {
//   const getTemperatureData = () => {
//     const labels = monthlyData.map(data => data.month);
//     const data = monthlyData.map(data => data.avgTemp);
//     return {
//       labels,
//       datasets: [
//         {
//           label: `Average Temperature (${unit})`,
//           data,
//           fill: false,
//           backgroundColor: 'black',
//           borderColor: 'black',
//           pointBackgroundColor: 'darkviolet',
//           pointBorderColor: 'white',
//           pointHoverBackgroundColor: 'black',
//           pointHoverBorderColor: 'pink',
//           pointRadius: 5,
//           pointHoverRadius: 10,
//           pointHitRadius: 7,
//         },
//       ],
//     };
//   };

//   const options = {
//     scales: {
//       x: {
//         grid: {
//           color: 'red',
//         },
//       },
//       y: {
//         grid: {
//           color: 'red',
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         labels: {
//           color: 'yellow', // Set the color of the legend labels
//         },
//       },
//     },
//   };

//   return (
//     <div className="monthly-temperature-graph">
//       <h2>Monthly Temperature Data</h2>
//       <Line data={getTemperatureData()} options={options} />
//     </div>
//   );
// };

// export default MonthlyTemperatureGraph;

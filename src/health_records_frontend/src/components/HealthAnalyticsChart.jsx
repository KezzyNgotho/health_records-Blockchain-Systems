import React from 'react';
import { Line } from 'react-chartjs-2';

const HealthAnalyticsChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Diabetes',
        data: [65, 59, 80, 81, 56, 55, 40], // Example data for diabetes
        borderColor: 'blue',
        borderWidth: 1,
      },
      {
        label: 'HIV',
        data: [30, 40, 55, 60, 45, 35, 25], // Example data for HIV
        borderColor: 'red',
        borderWidth: 1,
      },
      // Add more datasets for other diseases as needed
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h2>Health Analytics</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default HealthAnalyticsChart;

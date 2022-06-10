import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    ChartData,
    ScatterDataPoint,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
);

const FloorChart = () => {

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July'];
const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false //This will do the task
        }
    },
};
const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [1,2,9,4,3,2,6,7,4],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};
    return <Line options={options} data={data} />;
}

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

export default function ChartPanel({ repos }) {
  const data = {
    labels: repos.map(repo => repo.name).slice(0, 5),
    datasets: [
      {
        label: 'Stars',
        data: repos.map(repo => repo.stargazers_count).slice(0, 5),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#cbd5e1',
        },
        grid: {
          color: '#475569',
        },
      },
      y: {
        ticks: {
          color: '#cbd5e1',
        },
        grid: {
          color: '#475569',
        },
      },
    },
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-6 mt-8">
      <h3 className="text-xl font-semibold mb-4 text-slate-100">Top 5 Repositories by Stars</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
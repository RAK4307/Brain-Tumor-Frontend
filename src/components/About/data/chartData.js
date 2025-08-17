export const barChartData = {
  labels: ['Brain Tumor Cases Annually'],
  datasets: [
    {
      label: 'India',
      data: [50000], // Approximate number
      backgroundColor: 'rgba(52, 152, 219, 0.7)',
      borderColor: 'rgba(52, 152, 219, 1)',
      borderWidth: 1,
    },
    {
      label: 'World',
      data: [308000], // Approximate number
      backgroundColor: 'rgba(44, 62, 80, 0.7)',
      borderColor: 'rgba(44, 62, 80, 1)',
      borderWidth: 1,
    },
  ],
};

export const pieChartData = {
  labels: ['Successfully Treated', 'Non-Curable/Fatal'],
  datasets: [
    {
      data: [35, 65], // Approximate percentage
      backgroundColor: ['rgba(46, 204, 113, 0.8)', 'rgba(231, 76, 60, 0.8)'],
      borderColor: ['rgba(46, 204, 113, 1)', 'rgba(231, 76, 60, 1)'],
      borderWidth: 1,
    },
  ],
};
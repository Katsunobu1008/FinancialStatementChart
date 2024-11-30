// 資産の部（借方）と負債・純資産の部（貸方）のデータ定義
const balanceSheetData = {
  labels: ['資産の部（借方）', '負債・純資産の部（貸方）'],
  datasets: [
    {
      label: '純資産',
      data: [0, 130],
      backgroundColor: 'rgba(153, 102, 255, 0.8)',
    },
    {
      label: '流動負債',
      data: [0, 40],
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
    },
    {
      label: '固定負債',
      data: [0, 30],
      backgroundColor: 'rgba(255, 205, 86, 0.8)',
    },
    {
      label: '流動資産',
      data: [80, 0],
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
    },
    {
      label: '固定資産',
      data: [120, 0],
      backgroundColor: 'rgba(255, 159, 64, 0.8)',
    },
  ],
};

// バランスシートグラフの設定
const balanceSheetConfig = {
  type: 'bar',
  data: balanceSheetData,
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const datasetIndex = tooltipItem.datasetIndex;
            const value = tooltipItem.raw;
            const total = balanceSheetData.datasets.reduce((sum, dataset) => {
              return sum + dataset.data[tooltipItem.dataIndex];
            }, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.dataset.label}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'start',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 4,
        padding: 6,
        font: {
          size: 12,
          weight: 'bold',
        },
        formatter: function (value, context) {
          const total = balanceSheetData.datasets.reduce((sum, dataset) => {
            return sum + dataset.data[context.dataIndex];
          }, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        categoryPercentage: 1.0, // カテゴリー間の間隔をなくす
        barPercentage: 1.0, // バーの幅を最大に
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (value) {
            return `${value}`;
          },
        },
      },
    },
  },
  plugins: [ChartDataLabels],
};

// バランスシートグラフの描画
const balanceSheetCtx = document
  .getElementById('balanceSheetChart')
  .getContext('2d');
new Chart(balanceSheetCtx, balanceSheetConfig);

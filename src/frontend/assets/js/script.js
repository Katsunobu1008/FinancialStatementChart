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

// 損益計算書（PL）のデータ定義
const incomeStatementData = {
  labels: ['総売上高', '営業利益', '経常利益', '税引前当期純利益', '純利益'],
  datasets: [
    {
      label: '損益計算書',
      data: [500, 150, 100, 80, 60],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(54, 162, 235, 0.8)',
      ],
    },
  ],
};

// 利益率の計算
const sales = incomeStatementData.datasets[0].data[0];
const operatingProfitRate = (
  (incomeStatementData.datasets[0].data[1] / sales) *
  100
).toFixed(2);
const ordinaryProfitRate = (
  (incomeStatementData.datasets[0].data[2] / sales) *
  100
).toFixed(2);
const netProfitRate = (
  (incomeStatementData.datasets[0].data[4] / sales) *
  100
).toFixed(2);

// 損益計算書グラフの設定
const incomeStatementConfig = {
  type: 'bar',
  data: incomeStatementData,
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'start',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 4,
        padding: 6,
        font: {
          size: 12,
          weight: 'bold',
        },
        formatter: function (value, context) {
          if (context.dataIndex === 1) {
            return `営業利益率: ${operatingProfitRate}%`;
          } else if (context.dataIndex === 2) {
            return `経常利益率: ${ordinaryProfitRate}%`;
          } else if (context.dataIndex === 4) {
            return `純利益率: ${netProfitRate}%`;
          } else {
            return null;
          }
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        categoryPercentage: 0.6, // グラフの間隔を調整
        barPercentage: 0.8, // バーの幅を適切に調整
      },
      y: {
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

// 損益計算書グラフの描画
const incomeStatementCtx = document
  .getElementById('incomeStatementChart')
  .getContext('2d');
new Chart(incomeStatementCtx, incomeStatementConfig);

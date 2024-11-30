document.addEventListener('DOMContentLoaded', () => {
  // DOM要素の取得
  const currentAssetsInput = document.getElementById('currentAssets');
  const fixedAssetsInput = document.getElementById('fixedAssets');
  const currentLiabilitiesInput = document.getElementById('currentLiabilities');
  const fixedLiabilitiesInput = document.getElementById('fixedLiabilities');
  const netAssetsInput = document.getElementById('netAssets');

  const totalAssetsSpan = document.getElementById('totalAssets');
  const totalLiabilitiesAndNetAssetsSpan = document.getElementById(
    'totalLiabilitiesAndNetAssets'
  );

  // Chart.js データ定義
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

  // Chart.js グラフ設定
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
        x: { stacked: true, categoryPercentage: 1.0, barPercentage: 1.0 },
        y: { stacked: true, ticks: { callback: (value) => `${value}` } },
      },
    },
  };

  const balanceSheetCtx = document
    .getElementById('balanceSheetChart')
    .getContext('2d');
  const bsChart = new Chart(balanceSheetCtx, balanceSheetConfig);

  // 入力値に基づく更新処理
  const updateChart = () => {
    const currentAssets = parseFloat(currentAssetsInput.value) || 0;
    const fixedAssets = parseFloat(fixedAssetsInput.value) || 0;
    const currentLiabilities = parseFloat(currentLiabilitiesInput.value) || 0;
    const fixedLiabilities = parseFloat(fixedLiabilitiesInput.value) || 0;
    const netAssets = parseFloat(netAssetsInput.value) || 0;

    const totalAssets = currentAssets + fixedAssets;
    const totalLiabilitiesAndNetAssets =
      currentLiabilities + fixedLiabilities + netAssets;

    // 合計値の表示更新
    totalAssetsSpan.textContent = totalAssets;
    totalLiabilitiesAndNetAssetsSpan.textContent = totalLiabilitiesAndNetAssets;

    // Chart.js データ更新
    balanceSheetData.datasets[0].data = [0, netAssets];
    balanceSheetData.datasets[1].data = [0, currentLiabilities];
    balanceSheetData.datasets[2].data = [0, fixedLiabilities];
    balanceSheetData.datasets[3].data = [currentAssets, 0];
    balanceSheetData.datasets[4].data = [fixedAssets, 0];

    bsChart.update();
  };

  // 入力イベントの監視
  [
    currentAssetsInput,
    fixedAssetsInput,
    currentLiabilitiesInput,
    fixedLiabilitiesInput,
    netAssetsInput,
  ].forEach((input) => {
    input.addEventListener('input', updateChart);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // 損益計算書 DOM要素
  const grossProfitInput = document.getElementById('grossProfit');
  const operatingProfitInput = document.getElementById('operatingProfit');
  const ordinaryProfitInput = document.getElementById('ordinaryProfit');
  const netProfitInput = document.getElementById('netProfit');

  // 損益計算書データ定義
  const incomeStatementData = {
    labels: ['売上総利益', '営業利益', '経常利益', '純利益'],
    datasets: [
      {
        label: '損益計算書',
        data: [500, 150, 100, 60],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  // 損益計算書グラフ設定
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
            const sales = incomeStatementData.datasets[0].data[0];
            if (context.dataIndex === 1) {
              return `営業利益率: ${((value / sales) * 100).toFixed(2)}%`;
            } else if (context.dataIndex === 2) {
              return `経常利益率: ${((value / sales) * 100).toFixed(2)}%`;
            } else if (context.dataIndex === 3) {
              return `純利益率: ${((value / sales) * 100).toFixed(2)}%`;
            } else {
              return null;
            }
          },
        },
      },
      responsive: true,
      scales: {
        x: {
          categoryPercentage: 0.6,
          barPercentage: 0.8,
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

  const incomeStatementCtx = document
    .getElementById('incomeStatementChart')
    .getContext('2d');
  const incomeChart = new Chart(incomeStatementCtx, incomeStatementConfig);

  // グラフ更新ロジック
  const updateIncomeChart = () => {
    const grossProfit = parseFloat(grossProfitInput.value) || 0;
    const operatingProfit = parseFloat(operatingProfitInput.value) || 0;
    const ordinaryProfit = parseFloat(ordinaryProfitInput.value) || 0;
    const netProfit = parseFloat(netProfitInput.value) || 0;

    // グラフデータ更新
    incomeStatementData.datasets[0].data = [
      grossProfit,
      operatingProfit,
      ordinaryProfit,
      netProfit,
    ];
    incomeChart.update();
  };

  // 入力イベントを監視
  [
    grossProfitInput,
    operatingProfitInput,
    ordinaryProfitInput,
    netProfitInput,
  ].forEach((input) => {
    input.addEventListener('input', updateIncomeChart);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // キャッシュフロー DOM要素
  const operatingCFInput = document.getElementById('operatingCF');
  const investingCFInput = document.getElementById('investingCF');
  const financingCFInput = document.getElementById('financingCF');

  // キャッシュフローデータ定義
  const cashFlowData = {
    labels: ['営業CF', '投資CF', '財務CF'],
    datasets: [
      {
        label: 'キャッシュフロー',
        data: [200, -100, 150],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
      },
    ],
  };

  // キャッシュフローグラフ設定
  const cashFlowConfig = {
    type: 'bar',
    data: cashFlowData,
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
          align: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 4,
          padding: 6,
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      responsive: true,
      scales: {
        x: {
          categoryPercentage: 0.6,
          barPercentage: 0.8,
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

  const cashFlowCtx = document.getElementById('cashFlowChart').getContext('2d');
  const cfChart = new Chart(cashFlowCtx, cashFlowConfig);

  // グラフ更新ロジック
  const updateCashFlowChart = () => {
    const operatingCF = parseFloat(operatingCFInput.value) || 0;
    const investingCF = parseFloat(investingCFInput.value) || 0;
    const financingCF = parseFloat(financingCFInput.value) || 0;

    // グラフデータ更新
    cashFlowData.datasets[0].data = [operatingCF, investingCF, financingCF];
    cfChart.update();
  };

  // 入力イベントを監視
  [operatingCFInput, investingCFInput, financingCFInput].forEach((input) => {
    input.addEventListener('input', updateCashFlowChart);
  });
});

// chart.js — Chart.js 그래프 렌더링

const COLORS = ['#5b8fff','#2ecf96','#ff6b4a','#ffb94a','#b87fff'];

let priceChart = null;

function getMonthLabels() {
  const now = new Date();
  const months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ label:`${d.getFullYear()}.${d.getMonth()+1}`, year:d.getFullYear(), month:d.getMonth()+1 });
  }
  return months;
}

function renderChart(canvasId, apartments, selectedArea) {
  if (priceChart) { priceChart.destroy(); priceChart = null; }
  const months = getMonthLabels();

  const datasets = apartments.map((apt, i) => {
    const trades = apt.trades || [];
    const filtered = selectedArea === 'all' ? trades : trades.filter(t => Math.round(t.area) == selectedArea);
    const data = months.map(m => {
      const mt = filtered.filter(t => t.year === m.year && t.month === m.month);
      return mt.length ? Math.round(mt.reduce((s,t) => s + t.price, 0) / mt.length) : null;
    });
    const color = apt.color || COLORS[i % COLORS.length];
    return {
      label: apt.name,
      data,
      borderColor: color,
      backgroundColor: color + '18',
      tension: 0.35,
      fill: false,
      pointRadius: 4,
      pointHoverRadius: 7,
      spanGaps: true,
      pointBackgroundColor: color
    };
  });

  priceChart = new Chart(document.getElementById(canvasId), {
    type: 'line',
    data: { labels: months.map(m => m.label), datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#222228',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#9a9aaa',
          bodyColor: '#f0f0f0',
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y ? (ctx.parsed.y/10000).toFixed(2)+'억' : '거래없음'}`
          }
        }
      },
      scales: {
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#5a5a6a', callback: v => (v/10000).toFixed(0)+'억' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#5a5a6a', maxRotation: 45, autoSkip: false, font: { size: 11 } }
        }
      }
    }
  });
}

function getUniqueAreas(apartments) {
  return [...new Set((apartments || []).flatMap(a => (a.areas || [])))].sort((a,b) => a-b);
}

function destroyChart() {
  if (priceChart) { priceChart.destroy(); priceChart = null; }
}

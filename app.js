const apiUrl = 'URL_ВАШЕГО_APPS_SCRIPT'; // Замените на URL API Google Apps Script.

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderChart(data);
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
}

function renderChart(data) {
  const labels = data.slice(1).map(row => row[0]); // Даты.
  const values = data.slice(1).map(row => row[1]); // Значения.

  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Статистика',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }]
    }
  });
}

fetchData();

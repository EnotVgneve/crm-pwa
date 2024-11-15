const addDataButton = document.getElementById('addDataButton');
const viewChartButton = document.getElementById('viewChartButton');
const dataForm = document.getElementById('dataForm');
const saveDataButton = document.getElementById('saveData');
const chartCanvas = document.getElementById('chart').getContext('2d');

addDataButton.addEventListener('click', () => {
  dataForm.style.display = 'block';
});

saveDataButton.addEventListener('click', () => {
  const number = document.getElementById('number').value;
  const sum = document.getElementById('sum').value;
  if (number && sum) {
    fetch('https://script.google.com/macros/s/AKfycbzG8DhtlS3JrchXdsduAU9a1BlXsAmU7Exe1ppuGNNriKaF8wJ4Wr2_RSuZHc__H5y9sQ/exec', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      // Пример: Отправка новых данных в таблицу
      fetch('https://script.google.com/macros/s/AKfycbzG8DhtlS3JrchXdsduAU9a1BlXsAmU7Exe1ppuGNNriKaF8wJ4Wr2_RSuZHc__H5y9sQ/exec', {
        method: 'POST',
        body: JSON.stringify({ number, sum }),
        headers: { 'Content-Type': 'application/json' },
      }).then(response => {
        console.log('Data saved');
      }).catch(err => console.error(err));
    });
  }
});

viewChartButton.addEventListener('click', () => {
  fetch('https://script.google.com/macros/s/AKfycbzG8DhtlS3JrchXdsduAU9a1BlXsAmU7Exe1ppuGNNriKaF8wJ4Wr2_RSuZHc__H5y9sQ/exec', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    const labels = data.map(item => item[0]); // Дата
    const sums = data.map(item => item[2]); // Сумма
    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Сумма',
          data: sums,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      }
    });
  });
});

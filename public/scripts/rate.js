let btns = [];
function sendrev() {
  btns.forEach((btn, index) => {
    if (btn[0].checked) {
      $.ajax({

        url: "/rate",
        method: "POST",
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({ val: index + 1 }),
        success:(res) =>{updateChart()}
      });
    }
  })
  $("#subBtn").hide(50);
  $("#thx").show(80);
}
function updateChart() {
  const chartData = {
    type: 'bar',
    data: {
      labels: ["1", "2", "3", "4", "5"],
      datasets: [{
        label: 'Ratings',
        backgroundColor: 'rgba(161, 198, 247, 1)',
        borderColor: 'rgb(47, 128, 237)',
        data: [0, 0, 0, 0, 0],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    },
  }
  const ctx = document.getElementById("chart").getContext('2d');
  const myChart = new Chart(ctx, chartData);

  $.ajax({
    url: "/stateData",
    method: "GET",
    processData: false,
    success: (data) => {const chData = []
      for (let i = 1; i < 6; i++) {
        chData.push(data[i]);
      }
      chartData.data.datasets[0].data = chData;
      myChart = new Chart(ctx, chartData);}
  });
  
}
$(document).ready(() => {
  for (let i = 1; i < 6; i++) {
    btns.push($(`#${i}`));
  }
  updateChart();  

})

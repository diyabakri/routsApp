let btns = [];
function sendrevText(){
  const revText = $("#reviewText").val();
  if(revText === ""){
    alert("please write review text")
    return;
  }
  $.ajax({
    url: "/stateData",
    method: "POST",
    processData: false,
    contentType: 'application/json',
    data:JSON.stringify({ val: `${revText}` }),
    
  });
  $("#reviewText").hide(100);
  $("#reviewText")[0].value = "";
  $("#subBtnText").hide(50);
  $("#thxText").show(80);

}
function sendrev() {
  let found = false;
  btns.forEach((btn, index) => {
    if (btn[0].checked) {
      found = true;
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
  if(found){

    $("#subBtn").hide(50);
    $("#thx").show(80);
  }
  
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
  let myChart = new Chart(ctx, chartData);

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
function checkMobile(){
  
  const w = window.screen.availWidth;
  const h = window.screen.availHeight;
  
  $("body").css("background-repeat","no-repeat");
  $("body").css("background-attachment","fixed");
  $("body").css("background-position","center");
  
  if(h>w){
    $("body").removeClass("flex-row");
    $("body").addClass("flex-column");
    $("#rateArea").removeClass("h-50 w-50");
    $("#chartArea").removeClass("h-50 w-50");
    $("#rateArea").addClass("m-1");
    $("#chartArea").addClass("m-3");
  }

}
$(document).ready(() => {
  for (let i = 1; i < 6; i++) {
    btns.push($(`#${i}`));
  }
  updateChart();  
  checkMobile();
})

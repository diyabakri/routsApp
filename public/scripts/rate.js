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
      });
    }
  })
  $("#subBtn").hide(50);
  $("#thx").show(80);
}
$(document).ready(() => {
  for (let i = 1; i < 6; i++) {
    btns.push($(`#${i}`));
  }
})
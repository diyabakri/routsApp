function login(){
    const param = {}
    param.email = $("#EmailInput")[0].value;
    param.password = $("#passwordInput")[0].value;
    $.ajax({

        url: "/Login",
        method: "POST",
        contentType: 'application/json',
        processData :false,
        data: JSON.stringify(param),
        success: handelRes, 
    
    });
}
function handelRes(res){
    if(res.user){
        window.location.href ="/home"
    }else{
        alert("Login error check username or password");
    }
}
function checkMobile(){
  
    const w = window.screen.availWidth;
    const h = window.screen.availHeight;
    
    $("body").css("background-repeat","no-repeat");
    $("body").css("background-attachment","fixed");
    $("body").css("background-position","top");
    
    if(h>w){
      $("body").removeClass("flex-row");
      $("body").addClass("flex-column");
      $("#LoginArea").removeClass("w-50");
    }
  
}
$(document).ready( () => {
    checkMobile();
})
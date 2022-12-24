const { param } = require("jquery");

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
    if(res.uid){
        window.location.href ="/home"
    }else{
        alert(res);
    }
}
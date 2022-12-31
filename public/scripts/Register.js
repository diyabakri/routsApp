let inputs;
function machPasswords(){
    
    let pas = $("#password");
    let confPas = $("#confirmPass"); 
    if(pas[0].value !== confPas[0].value){
        $("#confirmError").show();
    }else{
        $("#confirmError").hide();
    }
}
function Register(){
    param = {};
    
    for(let i = 0 ; i < inputs.length ; i++){
        param[inputs[i].id] =inputs[i].value; 
    }

    useData(param);
}
function handle(res){
    if(res.uid){
        window.location.href ="/home"
    }else{
        alert(res)
    }
}

function useData(param){

    if(param.confirmPass === param.password){

    $.ajax({
        
        url: "/Signup",
        method: "POST",
        contentType: 'application/json',
        processData :false,
        data: JSON.stringify(param),
        success: handle, 

    });
}

}

$(document).ready(()=>{
    console.log("shit");
    inputs = $(".form-control")
})
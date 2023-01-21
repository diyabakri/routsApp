function ContactUs(){
    const email = $("#email").val();
    const msg = $("#msg").val();
    if(email === ""){
        alert("please enter your email");
        return;
    }
    if(msg === ""){
        alert("please write a contact massage");
      return;
    }
    $.ajax({
      url: "/stateContact",
      method: "POST",
      processData: false,
      contentType: 'application/json',
      data:JSON.stringify({ msg: `${msg}`,email:`${email}` }),
      
    });
    $("#email").hide(100);
    $("#emailLabel").hide(100);
    $("#msg").hide(50);
    $("#msgLabel").hide(50);
    $("#msgbtn").hide(50);
    $("#thx").show(80);
  
}

$(document).ready(()=>{
    $("body").css("background-repeat","no-repeat");
    $("body").css("background-attachment","fixed");
    $("body").css("background-position","center");
    
})
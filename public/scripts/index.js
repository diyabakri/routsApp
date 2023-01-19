
function GotoMap(){
    window.location.href = "/map"
}
function aboutUs(){
    window.location.href = "/aboutUs"

}
function contactUS(){
    window.location.href = "/contactUS"

}
function Rate(){
    window.location.href = "/Rate"

}
function checkMobile(){
  
    const w = window.screen.availWidth;
    const h = window.screen.availHeight;
    console.log("here")
    $("body").css("background-repeat","no-repeat");
    $("body").css("background-attachment","fixed");
    $("body").css("background-position","center");
    
    if(h>w){
    //   $("body").removeClass("flex-row");
    //   $("body").addClass("flex-column");
    //   $("#rateArea").removeClass("h-50 w-50");
    //   $("#chartArea").removeClass("h-50 w-50");
    //   $("#rateArea").addClass("m-1");
    //   $("#chartArea").addClass("m-3");
    }
  
}
$(document).ready(() => {
  checkMobile();

});
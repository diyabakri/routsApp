let id = 0;

function renderStop(stops){
    let StopsArea = $("#stopsPanel");
        let element = `
        <div id = "stop${id}">
            <div class="d-flex justify-content-center my-3 border-2 border-dark border-bottom">
            <label class="text-dark w-100 ">${stops[stops.length-1].addr}</label>
            <button class="btn btn-outline-dark mx-2 " onclick = "removeStop(${id})">X</button>
            </div>  
        <div>
        `;
    id++;
    StopsArea.append(element);

}
function addStop(){
    const Stop = $("#Stops")[0].value;
    if(Stop !== ""){
        waypts.push({addr:Stop,id:id});
        console.log(waypts);
        renderStop(waypts);
    }
}
function removeStop(id){
    $(`#stop${id}`).empty();
    for(let i =0 ; i < waypts.length ; i++){
        if(waypts[i].id === id){
            waypts.splice(i, 1);
            break;
        }
    }
    console.log(waypts);
}
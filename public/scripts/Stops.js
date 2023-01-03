const Cords = [];
let dis = [];
function renderStop(){
    let StopsArea = $("#stopsPanel");
    StopsArea.empty();
    let id = 0;
    waypts.forEach((stop)=>{
        stop.id = id;
        element = `
        <div id = "stop${id}">
            <div class="d-flex justify-content-center my-3 border-2 border-dark border-bottom">
            <label class="text-dark w-100 ">${stop.addr}</label>
            <button class="btn btn-outline-dark mx-2 " onclick = "removeStop(${id})">X</button>
            </div>  
        <div>
        `;
    id++;
    StopsArea.append(element);
    })
        

}
function minimum(arr){

    let min = arr[0];
    for(let i = 1; i < arr.length ; i++){
        if(arr[i] < min){
            min = arr[i]
        }
    }
    return min
}
function get_geolocation(address){
    dis = [];
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK)
    {
        
        const lat = results[0].geometry.location.lat();
        const lon = results[0].geometry.location.lng();
        if(Cords.length === 0){
            Cords.push([loc.lat,loc.lng]);
            Cords.push([lat,lon])
            waypts.push({addr:"Current location",id:0});
            waypts.push({addr:address,id:0});
            renderStop();
        }else{
            Cords.forEach((val,index)=>{distance([lat,lon],val)})
            let min = minimum(dis);
            if(min === 0){
                return;
            }
            let index = dis.indexOf(min);
            if(min > 1500){
                index = dis.length-1;
            }
            Cords.splice(index+1,0,[lat,lon]);
            waypts.splice(index+1,0,{addr:address,id:0})
            renderStop();
        }
        console.log(Cords);
    }
  });
} 
function distance(p1,p2){

    let lat1 = p1[0];
    let lat2 = p2[0];
    let lon1 = p1[1];
    let lon2 = p2[1];
    let dist = Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1))*6371; 
    dis.push(dist);
}
function addStop(){
    const Stop = $("#Stops")[0].value;
    $("#Stops")[0].value = "";
    get_geolocation(Stop);
}
function removeStop(id){
    $(`#stop${id}`).empty();
    for(let i =0 ; i < waypts.length ; i++){
        if(waypts[i].id === id){
            waypts.splice(i, 1);
            Cords.splice(i,1);
            break;
        }
    }
}
function rendeRoute(response){
    const ander = $("#routePanel");
    ander.empty();
    let stops = response.routes[0].legs;
    for(let i = 0 ; i < stops.length ; i++){
        let stop = stops[i];
        const param = {};
        param.distance = stop.distance.text;
        param.time = stop.duration.text;
        param.start = stop.start_address;
        param.end = stop.end_address;
        ander.append(`<div id = "route${i+1}">
        <div class="d-flex flex-column  justify-content-center my-3 border-2 border-dark border-bottom ">
            <label class="text-dark row fw-bold mx-1">Start: ${param.start}</label>
            <label class="text-dark row fw-bold mx-1">End:${param.end}</label>
            <label class="text-dark row fw-bold mx-1">Distance:${param.distance}</label>
            <label class="text-dark row fw-bold mx-1">Time:${param.time}</label>
            </div>  
        <div>`);
    }
}
let id = 0;
const Cords = [];
let dis = [];
function renderStop(stop){
    let StopsArea = $("#stopsPanel");
        let element = `
        <div id = "stop${id}">
            <div class="d-flex justify-content-center my-3 border-2 border-dark border-bottom">
            <label class="text-dark w-100 ">${stop.addr}</label>
            <button class="btn btn-outline-dark mx-2 " onclick = "removeStop(${id})">X</button>
            </div>  
        <div>
        `;
    id++;
    StopsArea.append(element);

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
            Cords.push([lat,lon])
            waypts.push({addr:address,id:id});
            renderStop({addr:address,id:id});
        }else{
            Cords.forEach((val,index)=>{distance([lat,lon],val)})
            let min = minimum(dis);
            if(min === 0){
                return;
            }
            let index = dis.indexOf(min);
            Cords.splice(index+1,0,[lat,lon]);
            waypts.splice(index+1,0,{addr:address,id:id})
            renderStop({addr:address,id:id});
        }
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
img = "";
status = "";
objects = [];
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function preload(){
    img = createVideo("video.mp3");
}

function draw(){
    image(video, 0, 0, 380, 380);

    
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            if(objects[i] == "person"){
                document.getElementById("status").innerHTML = "Baby Detected";
            img.stop();
            }
            if(objects[i] != "person"){
                document.getElementById("status").innerHTML = "Baby not Detected";
             img.play();
            }
            
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected = " + objects.length;
            fill("#FF0000");
            percent =  floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
 
         }

    

}
function modelLoaded(){
    console.log("model is loaded");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
   
}
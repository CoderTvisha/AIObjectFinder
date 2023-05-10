stat = "";
objectInput = "";
objects = [];

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600.500);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    objectInput = document.getElementById("object_input").value;
}

function modelLoaded() {
    console.log("model loaded");
    stat = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);

    objects = results;

}

function draw() {
    image(video, 0, 0, 600, 500);

    if (stat != "") {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == objectInput) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status_found").innerHTML = objectInput + " found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectInput + "Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("status_found").innerHTML = "Object Mentioned Not Found";
            }

        }


    }
}
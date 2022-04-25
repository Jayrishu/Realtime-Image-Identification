function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}
function modelLoaded(){
  console.log("Model is Ready");
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotResults);
}
var previous = "";
function gotResults(error,results){
  if (error) {
    console.error(error);
  } else {if ((previous != results[0].label)&&(results[0].confidence>0.5)) {
    console.log(results);
    previous = results[0].label;
    var synth = window.speechSynthesis;
    speakdata = "Object Detected is "+results[0].label;
    var utterthis = new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterthis);
    document.getElementById("result_object").innerHTML = results[0].label;
    document.getElementById("result_confidence").innerHTML = Math.round(results[0].confidence*100)+"%";
  }
    
  }
}




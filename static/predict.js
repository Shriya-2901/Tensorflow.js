$("#image-selector").change(function(){
    let reader= new FileReader();
    reader.onload=function(){
        let dataURL=reader.result;
        $("#selected-image").attr("src",dataURL);
        $("#prediction-list").empty();
    }
let file=$("#image-selector").prop('files')[0];
reader.readAsDataURL(file);
});

let model;
(async function(){
    console.log('Hello');
    model=await tf.loadModel('http://127.0.0.1:8080/tfjs-models/VGG16/model.json');
    $(".progress-bar").hide();
})();

$("#predict-button").click(async function(){
    let image=$("#selected-image").get(0);
    let tensor=tf.fromPixels(image)
    .resizeNearestNeighbour([224,224])
    .toFloat()
    .expandDims();
})
let predictions=await model.predict(tensor).data();
let top5=Array.from(predictions)
    .map(function(p,i){
        return{probability:p,
        classname:IMAGENET_CLASSES[i]};
    }).sort(function(a,b){
        return b.probability-a.probability;
    }).slice(0,5);

    $

//INIT

let slider = document.getElementById("timeline");
let output = document.getElementById("year");
let btnPlayStop = document.getElementById("btnPlayStop");
let firstYearTimeline = 1970;
output.innerHTML = firstYearTimeline +  +slider.value; // Display the default slider value
btnPlayStop.addEventListener("click", PlayStop);



//EVENTS

//Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = firstYearTimeline + +this.value;
    UpdateCharts(output.innerHTML);
}


var intervalTimeline;
var isPlaying = false;
function PlayStop() {
    if (!isPlaying) {
        btnPlayStop.innerHTML = '<i class="fa fa-pause"></i>';
        intervalTimeline = setInterval(function() {
            slider.value ++;
            output.innerHTML = firstYearTimeline +  +slider.value;
            UpdateCharts(output.innerHTML);
        }, 1000);
    } else {
        btnPlayStop.innerHTML = '<i class="fa fa-play"></i>';
        clearInterval(intervalTimeline);
    }

    isPlaying = !isPlaying;
}


//FUNCTIONS

function UpdateCharts(year)
{
    //ADD FUNCTION CHARTS HERE
    //chart1(year);
    //chart2(year);
}
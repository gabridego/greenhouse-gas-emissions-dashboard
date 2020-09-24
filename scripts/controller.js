//INIT

let slider = document.getElementById("timeline");
let output = document.getElementById("year");
let btnPlayStop = document.getElementById("btnPlayStop");
let iconPlayStop = document.getElementById("iconPlayStop");
let firstYearTimeline = 1970;
let intervalTimeline;
let isPlaying = false;

output.innerHTML = firstYearTimeline +  +slider.value; // Display the default slider value
btnPlayStop.addEventListener("mousedown", playStop);
// contrôle du bouton lecture en pressant la touche "Espace"
window.addEventListener("keypress", spacePlay);



//EVENTS

//Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = firstYearTimeline + +this.value;
    UpdateCharts(output.innerHTML);
}

function playStop() {
    console.log(isPlaying)
    if (!isPlaying) {
        iconPlayStop.className = "fa fa-pause text-white";
        intervalTimeline = setInterval(function() {
            slider.value ++;
            output.innerHTML = firstYearTimeline +  +slider.value;
            UpdateCharts(output.innerHTML);
        }, 1000);
    } else {
        iconPlayStop.className = "fa fa-play text-white";
        clearInterval(intervalTimeline);
    }

    isPlaying = !isPlaying;
}

function spacePlay(event) {
    console.log(isPlaying)
    if (event.which === 32)
        playStop()
}

//FUNCTIONS

function UpdateCharts(year)
{
    //ADD FUNCTION CHARTS HERE
    //chart1(year);
    //chart2(year);
}
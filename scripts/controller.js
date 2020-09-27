//INIT
let slider = document.getElementById("timeline");
let output = document.getElementById("year");
let btnPlayStop = document.getElementById("btnPlayStop");
let iconPlayStop = document.getElementById("iconPlayStop");
let firstYearTimeline = 1990;
let intervalTimeline;
let isPlaying = false;


//global parameters for charts and map
let currentFilter = "total_ghg";
let currentYear = 1990;



output.innerHTML = firstYearTimeline +  +slider.value; // Display the default slider value
btnPlayStop.addEventListener("mousedown", playStop);
// contrôle du bouton lecture en pressant la touche "Espace"
window.addEventListener("keypress", spacePlay);

//EVENTS

//Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    currentYear = output.innerHTML = firstYearTimeline + +this.value;
    
    UpdateCharts();
    
}

function playStop() {
    console.log(isPlaying)
    if (!isPlaying) {
        iconPlayStop.className = "fa fa-pause text-white";
        intervalTimeline = setInterval(function() {
            slider.value ++;
            currentYear = output.innerHTML = firstYearTimeline +  +slider.value;
            
            
            UpdateCharts();
            
            // Added Event dispatcher for data updating on the map (Event listener on update_map())
            
            d3.select('#tooltip-gas-emission').dispatch('dataUpdateEvent', {detail: output.innerHTML });
            
            // TODO : We need to add event listeners on other graphs following the same syntaxe
            
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

function UpdateCharts()
{
    //ADD FUNCTION CHARTS HERE
    //chart1(year);
    //chart2(year);
    update_map(currentYear, currentFilter);
}




//filters
$('#filters').on('click','a', function(){
    $(this).addClass('active').siblings().removeClass('active');
    currentFilter = $(this).attr("name");
    console.log(currentFilter);
    UpdateCharts();
 });
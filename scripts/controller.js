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
        if(slider.value == 26){
            slider.value = 0;
            currentYear = output.innerHTML = firstYearTimeline +  +slider.value;

            UpdateCharts();

            d3.select('#tooltip-gas-emission').dispatch('dataUpdateEvent', {detail: output.innerHTML });
        }

        iconPlayStop.className = "fa fa-pause text-white";
        intervalTimeline = setInterval(function() {
            slider.value ++;
            currentYear = output.innerHTML = firstYearTimeline +  +slider.value;

            UpdateCharts();

            // Added Event dispatcher for data updating on the map (Event listener on update_map())

            d3.select('#tooltip-gas-emission').dispatch('dataUpdateEvent', {detail: output.innerHTML });

            // TODO : We need to add event listeners on other graphs following the same syntaxe

            if(slider.value == 26) {
                playStop();
                return;
            }

        }, 1000);
    } else {
        iconPlayStop.className = "fa fa-play text-white";
        clearInterval(intervalTimeline);
    }


    isPlaying = !isPlaying;
}

function spacePlay(event) {
    if (event.which != 32)
        return;

    playStop()
    console.log(isPlaying)
    //if(event.target == document.body)
        event.preventDefault();
}

//FUNCTIONS

function UpdateCharts()
{
    //update titles
    update_titles();
    // update map
    update_legend(currentYear, currentFilter);
    update_map(currentYear, currentFilter);
    // update piechart
    update_piechart(piechart, currentYear, currentFilter);

    update_linechart(currentFilter);

}

function update_titles()
{
  let gas;
  switch (currentFilter) {
      case 'total_ghg':
          gas = 'à effet de serre';
          break;
      case 'co2':
          gas = 'CO2';
          break;
      case 'methane':
          gas = 'CH4';
          break;
      case 'nitrous_oxide':
          gas = 'N2O';
          break;
      default:
          console.log('Filter error in piechart: unknown gas');
  }
    document.getElementById("pieTitle").innerHTML = "Émissions de gaz " + gas + " par secteur et par continent";
    document.getElementById("carteTitle").innerHTML = "Émissions de gaz " + gas +" dans le monde";
    document.getElementById("barTitle").innerHTML = "Émissions de gaz " + gas +" par secteur";
}


//filters
$('#filters').on('click','a', function(){
    $(this).addClass('active').siblings().removeClass('active');
    currentFilter = $(this).attr("name");
    console.log(currentFilter);
    UpdateCharts();
 });

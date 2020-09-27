let currentFilter = "total_ghg";

$('#filters').on('click','a', function(){
    $(this).addClass('active').siblings().removeClass('active');
    currentFilter = $(this).attr("name");
    console.log(currentFilter);
    UpdateCharts();
 });
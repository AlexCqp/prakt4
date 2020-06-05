let arr = new Array();
var num;
var count = 0;
var myChart;
var countEr = 0;
async function loadContent(){
    isError = false;
    var url = "http://exercise.develop.maximaster.ru/service/cpu/"
    
    num = $('#info');
    
    
    $.ajax({
        url: url,
        success: function (response) {
            num.load (url);
            $('#post').html(response.responseText);
        },
        error: function (jqXHR, exception) {
            var msg = '';
            num.load (url);
            if (jqXHR.status == 503) {
                num.text('0');
                countEr++;
            } 

            $('#post').html(msg);
        },
    });
    var s = parseInt(num.text());
    if(count > 0){
    arr[count] = s;
    addData(myChart,arr[count], count);
    info(count, countEr);
    }
    count++;
}
function updateA(){
    let timerId = setInterval(() => loadContent(), 5000);
}
var perSent = 0;
function info(i, iR){

    var info = $('#showInfo');
    perSent = iR/i* 100;
    info.text(i +' всего | ' + perSent + ' % потеряно');

}
function addData(chart, data, i){
    chart.data.labels.push(i);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
function loadChart(num){
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: num,
        datasets: [{
            label: 'Запросы',
            data: num,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{ 
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}
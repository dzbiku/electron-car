// google chart, type eng.
google.charts.load('current', { 'packages': ['gauge'] });
google.charts.setOnLoadCallback(drawChartGas);
google.charts.setOnLoadCallback(drawChartEngine);
google.charts.setOnLoadCallback(drawChartFuel);

function drawChartGas() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Gas', 80]
    ]);

    var options = {
        width: 400, height: 200,
        redFrom: 180, redTo: 220,
        yellowFrom: 140, yellowTo: 180,
        greenFrom: 40, greenTo: 60,
        minorTicks: 20, max: 220
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div_gas'));

    chart.draw(data, options);

    setInterval(function () {
        data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 13000);
}

function drawChartEngine() {

    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Engine x100', 55]
    ]);

    var options = {
        width: 400, height: 200,
        redFrom: 45, redTo: 75,
        yellowFrom: 30, yellowTo: 45,
        minorTicks: 15, max: 75
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div_engine'));

    chart.draw(data, options);
    setInterval(function () {
        data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 5000);
}


function drawChartFuel() {

    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Fuel %', 68]
    ]);

    var options = {
        width: 400, height: 200,
        redFrom: 0, redTo: 10,
        yellowFrom: 10, yellowTo: 20,
        greenFrom: 90, greenTo: 100,
        minorTicks: 5,
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div_fuel'));

    chart.draw(data, options);    
    setInterval(function () {
        data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
        chart.draw(data, options);
    }, 26000);
}

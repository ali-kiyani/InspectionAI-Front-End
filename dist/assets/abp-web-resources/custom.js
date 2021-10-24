function renderCharts(selector, options){
    let chart = new ApexCharts(
        document.querySelector(selector),
        options
    );    
    chart.render();
    return chart;
}
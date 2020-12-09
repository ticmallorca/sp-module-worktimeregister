/* ------------------------------------------------------------------------------
 *
 *  # Echarts - Column and Waterfall charts
 *
 *  Demo JS code for echarts_columns_waterfalls.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var EchartsColumnsWaterfalls = function () {


    //
    // Setup module components
    //

    // Column and waterfall charts
    var _columnsWaterfallsExamples = function (data) {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define elements
        var columns_stacked_element = document.getElementById('columns_thermometer');


        //
        // Charts configuration
        //

        // Stacked columns
        if (columns_stacked_element) {

            // Initialize chart
            var columns_stacked = echarts.init(columns_stacked_element);


            //
            // Chart config
            //

            // Axis [ gener, febrer, ...]
            var labelAxisMonths = data.labelAxisMonths;

            // Legend [ hores fetes, vacances, ...]
            var labelLegend = data.labelLegend;


            var retData = [];
            var retLegend = [];

            for (const element in data.data) {
                var obj = data.data[element];

                var color = "";
                if (element === "01") color = "#5579bb";
                if (element === "02") color = "#739211";
                if (element === "03") color = "#005b96";
                if (element === "04") color = "#d92405";
                if (element === "05") color = "#080300";
                if (element === "06") color = "#FFF";

                var name = "";
                if (element === "01") name = "Hores fetes";
                if (element === "02") name = "Vacances";
                if (element === "03") name = "Lliure disposició";
                if (element === "04") name = "Formació";
                if (element === "05") name = "Baixa";
                if (element === "06") name = "Hores per fer";

                var valuesOfYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var struct = {
                    name: "",
                    type: 'bar',
                    stack: "",
                    data: valuesOfYear,
                    itemStyle: {
                        color: color,
                        borderColor: '#000',
                        borderWidth: 0.3
                    }
                };
                for (const year in obj) {
                    retLegend.push(`${name}.${year}`);
                    struct.name = `${name}.${year}`;
                    struct.stack = year;
                    for (const value in obj[year]) {

                        struct.data[parseInt(value) - 1] = parseFloat(obj[year][value]);
                    }
                    retData.push(JSON.parse(JSON.stringify(struct)));
                }

            }

            var seriesData = retData;

            // Options
            columns_stacked.setOption({

                // Define colors

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Chart animation duration
                animationDuration: 750,

                // Setup grid
                grid: {
                    left: 0,
                    right: 10,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: retLegend,
                    itemHeight: 8,
                    itemGap: 20
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    },
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(0,0,0,0.025)'
                        }
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: labelAxisMonths,
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed'
                        }
                    }
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                // Add series
                series: seriesData
            });
        }

        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function () {

            columns_stacked_element && columns_stacked.resize();
        };

        // On sidebar width change
        $(document).on('click', '.sidebar-control', function () {
            setTimeout(function () {
                triggerChartResize();
            }, 0);
        });

        // On window resize
        var resizeCharts;
        window.onresize = function () {
            clearTimeout(resizeCharts);
            resizeCharts = setTimeout(function () {
                triggerChartResize();
            }, 200);
        };
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function (data) {
            _columnsWaterfallsExamples(data);
        }
    }
}();

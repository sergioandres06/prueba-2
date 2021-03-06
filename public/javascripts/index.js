$(document).ready(function () 
{
	var timeData = [],
	temperatureData = [],
	humidityData = [];
	panesData =[];
	tortasData = [];
	var data = 
	{
	labels: timeData,
	datasets: [
		{
        	fill: false,
        	label: 'Temperature',
        	yAxisID: 'Temperature',
        	borderColor: "rgba(250, 0, 0, 1)",
        	pointBoarderColor: "rgba(250, 0, 0, 1)",
        	backgroundColor: "rgba(250, 0, 0, 0.4)",
        	pointHoverBackgroundColor: "rgba(250, 0, 0, 1)",
        	pointHoverBorderColor: "rgba(250, 0, 0, 1)",
        	data: temperatureData
      		},
      		{
        	fill: false,
        	label: 'Humidity',
        	yAxisID: 'Humidity',
        	borderColor: "rgba(24, 120, 240, 1)",
        	pointBoarderColor: "rgba(24, 120, 240, 1)",
        	backgroundColor: "rgba(24, 120, 240, 0.4)",
        	pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
        	pointHoverBorderColor: "rgba(24, 120, 240, 1)",
        	data: humidityData
      		}]
	}
 	var data2 = 
	{
    	labels: timeData,
    	datasets: [
      		{
		fill: false,
        	label: 'panes',
		yAxisID: 'panes',
		borderColor: "rgba(210, 110, 110, 1)",
		pointBoarderColor: "rgba(210, 110, 110, 1)",
		backgroundColor: "rgba(210, 110, 110, 0.4)",
		pointHoverBackgroundColor: "rgba(210, 110, 110, 1)",
        	pointHoverBorderColor: "rgba(210, 110, 110, 1)",
		data: panesData
      		},
      		{
		fill: false,
        	label: 'tortas',
		yAxisID: 'tortas',
		borderColor: "rgba(110, 210, 110, 1)",
		pointBoarderColor: "rgba(110, 210, 110, 1)",
		backgroundColor: "rgba(110, 210, 110, 0.4)",
		pointHoverBackgroundColor: "rgba(110, 210, 110, 1)",
        	pointHoverBorderColor: "rgba(110, 210, 110, 1)",
		data: tortasData
      		}]
	}
  	var basicOption = 
		{
    		title: 
			{
      			display: true,
      			text: 'Temperature & Humidity Real-time Data',
      			fontSize: 20
    			},
    		scales: 
			{
      			yAxes: 
				[{
        			id: 'Temperature',
        			type: 'linear',
        			scaleLabel: 
					{
          				labelString: 'Temperature(C)',
          				display: true
        				},
        			position: 'left',
			 	}, 
			 	{
          		 	id: 'Humidity',
          		 	type: 'linear',
          		 	scaleLabel: 
			 		{
            				labelString: 'Humidity(%)',
            				display: true
          				},
          		 	position: 'right',
        		 	}]
    			}
		}
	var basicOption2 = 
		{
    		title: 
			{
      			display: true,
      			text: 'panes & tortas Real-time Data',
      			fontSize: 20
    			},
    		scales: 
			{
      			yAxes: 
				[{
        			id: 'panes',
        			type: 'linear',
        			scaleLabel: 
					{
          				labelString: 'panes',
          				display: true
        				},
        			position: 'left',
      				},
      				{
        			id: 'tortas',
        			type: 'linear',
        			scaleLabel: 
					{
          				labelString: 'tortas',
          				display: true
        				},
        			position: 'right'
      				}]
    			}
  		}
	

  	 //Get the context of the canvas element we want to select
  	var ctx = document.getElementById("myChart").getContext("2d");
  	var optionsNoAnimation = { animation: false }
  	var myLineChart = new Chart(ctx, 
	{
    	type: 'line',
    	data: data,
    	options: basicOption
  	});
 	var ctx2 = document.getElementById("myChart2").getContext("2d");
 	var optionsNoAnimation2 = { animation: false }
 	var myLineChart2 = new Chart(ctx2, 
	{
   	type: 'line',
    	data: data2,
    	options: basicOption2
  	});

  	var ws = new WebSocket('wss://' + location.host);
  	ws.onopen = function () 
		{
    		console.log('Successfully connect WebSocket');
  		}
  	ws.onmessage = function (message) 
		{
    		console.log('receive message' + message.data);
		var tem = JSON.parse(message.data)
		var tem=0;
		var tem2 = JSON.parse(message.data)
		var tem2=0;
     		try 
			{
      			var obj = JSON.parse(message.data);
      			if(!obj.time || !obj.temperature) 
				{
        			return;
      				}
      			timeData.push(obj.time);
      			temperatureData.push(obj.temperature);
      			// only keep no more than 50 points in the line chart
      			const maxLen = 50;
      			var len = timeData.length;
      			if (len > maxLen) 
				{
        			timeData.shift();
        			temperatureData.shift();
      				}	       	    	     	    	
      			if (obj.humidity) 
				{
        			humidityData.push(obj.humidity);
      				}
      			if (humidityData.length > maxLen) 
				{
        			humidityData.shift();
      				}
      			myLineChart.update();
			
    			} 
		catch (err) 
			{
      			console.error(err);
    			}
		try
			{
			var obj = JSON.parse(message.data);
      			if(!obj.time || !obj.panes) 
				{
        			return;
      				}
      			timeData.push(obj.time);
      			panesData.push(obj.panes);
      			// only keep no more than 50 points in the line chart
      			const maxLen = 50;
      			var len = timeData.length;
      			if (len > maxLen) 
				{
        			timeData.shift();
        			panesData.shift();
      				}			  	    	
      			if (obj.tortas) 
				{
        			tortasData.push(obj.tortas);
      				}
      			if (tortasData.length > maxLen) 
				{
        			tortasData.shift();
      				} 
			myLineChart2.update();
			}
		catch(err)   
			{
			console.error(err);
			}

	google.charts.load('current', {'packages':['gauge']});
      	google.charts.setOnLoadCallback(drawChart);
        	
	function drawChart() 
		{	
        	var data3 = google.visualization.arrayToDataTable([
          	['Label', 'Value'],
          	['p.temperatura', tem],
		['temperatura',tem2]
        	]);

        	var options = 
			{
          		width: 400, height: 200,         
	  		redFrom: 60, redTo: 100,
          		yellowFrom:0, yellowTo: 60,
          		minorTicks: 5
        		};
        	var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
		chart.draw(data3, options);
		try 
			{
      			var obj = JSON.parse(message.data);
      			if(!obj.temperature) 
				{
        			return;
      				}
			if (obj.temperature) 
				{
        			tem2 = temperatureData[temperatureData.length-1]
				tem = temperatureData.reduce(function(acumulador, siguienteValor){
				return acumulador + siguienteValor;},0);
				var temp = tem / temperatureData.length;
				var data3 = google.visualization.arrayToDataTable([
          			['Label', 'Value'],
          			['p.temperatura', temp],
				['temperatura',tem2]
        			]);
				chart.draw(data3, options);
      				}
			
    			} 
		catch (err) 
			{
      			console.error(err);
    			}
		}
   		

	}
		
       
});

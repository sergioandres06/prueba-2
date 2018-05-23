  	
	google.charts.load('current', {'packages':['gauge']});
      	google.charts.setOnLoadCallback(drawChart);
        var temperatureData=[];
	function drawChart() 
	{	
        	var data = google.visualization.arrayToDataTable([
          	['Label', 'Value'],
          	['tempertatura', 0]
        	]);

        	var options = 
		{
          	width: 400, height: 200,         
	  	redFrom: 60, redTo: 100,
          	yellowFrom:0, yellowTo: 60,
          	minorTicks: 5
        	};
        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
	chart.draw(data, options);
		setInterval(function() 
		{		
	    	data.setValue(0, 1, tem);
          	chart.draw(data, options);
        	}, 1300)
		try 
			{
      			var obj = JSON.parse(message.data);
      			if(!obj.temperature) 
				{
        			return;
      				}
      			temperatureData.push(obj.temperature); 
				{
        			temperatureData.shift();
      				}
      			Chart.update();
			} 
		catch (err) 
				{
      				console.error(err);
    				}
			}

      	

  	
	google.charts.load('current', {'packages':['gauge']});
      	google.charts.setOnLoadCallback(drawChart);
        
	var tem=0;
	var ws = new WebSocket('wss://' + location.host);
	ws.onmessage = function (message) 
		{
    		console.log('receive message' + message.data);
		try
		{
		var temp = JSON.parse(message.data);
		if(!temp.temperature)
		{
		return;
		}
		tem.push(temp.temperature);	
		}
		catch(err)
		{
		console.error(err);
		}}
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
        	}, 1300);
	}

		


      	

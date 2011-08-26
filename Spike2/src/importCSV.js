//copied from a web site
var propName={0:'project',1:'story',2:'coder',3:'task',4:'iteration',5:'complexity'};
var propCount=6;
var taskList=Array();
var WIDTH=500;
var HEIGHT=300;

window.addEventListener('load', eventWindowLoaded,false);
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      var contents = e.target.result;
	     
        var arrResults= contents.split('\n');
       
        for (var i=0; i<propCount;i++){
        	//document.write('PropName:'+i);
        	//document.write(propName[i]);
        }
        for (var i=0; i< arrResults.length; i++){
        	var task= new Object();
           	var splitResults=arrResults[i].split(',');
        	for(var k=0; k < splitResults.length;k++){
        		//remove double quotes
        		var unquoted=removeQuote(splitResults[k]);
        		task[propName[k]]=unquoted;
           		//task[propName[k]]=splitResults[k];
          	}
        	
        	taskList[i]=task;
        }
        
      };
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }
function removeQuote(quoted){
	var pat=/\w+/g;
	var unquoted=quoted.match(pat);
	return unquoted;
}
function eventWindowLoaded(){
  document.getElementById('csvFile').addEventListener('change', readSingleFile, false);
  document.getElementById('sort').addEventListener('mousedown', sortList, false);
  

}

function getCount(subTaskList,key,val){
	// all the  elements are double quoted, need to strip those w/ some matcher type thing
	var count=0;
	for(var i=0; i<subTaskList.length-1;i++){
		//document.write(taskList[i][key]);
		var task=subTaskList[i][key];
		//document.write('task is:'+task);
		//document.write('val is:'+val);

		//remove emebeded quotes, better to do this before storing
		//of course Im passing a val derived from the double quoted list
		//var pat=/\w+/g;
		//var pm=task.match(pat);
		//val='"'+val+'"';
		if(task[0] == val[0]){
			count++;
		}
	}
	return count;
	
}
function getKeyTasks(subTaskList,key,val){
	// I should return an array of tasks that match the key
	// I should work off the "big" list taskList, changed to subTask so it can recurively be called with smaller lists
	// I will then submit this sub list of Tasks to getCount and getTotal
	var results=new Array();
	var resultsItr=0;
	for(var i=0; i<subTaskList.length;i++){
		var task=subTaskList[i]; // the task object in the taskList array
		var taskHeading=subTaskList[i][key]; // the value of the key, for matching
		if(taskHeading[0]== val[0]){
			
			//add the task to the results array;
			results[resultsItr]=task;
			resultsItr++;
		}
		
	}
	return results;
	
}
function getTotal(key,val){
	var total=0;
	for(var i=0; i<taskList.length-1; i++){
		var task=taskList[i][key];
		if(task[0] == val[0]){
			total+=parseInt(taskList[i]['complexity']);
		}
	}
	return total;
}
function chart(x,y,points){
	var canvas=document.getElementById('canvasChart');
	var context=canvas.getContext('2d');
	// draw axis
	drawAxis(context);
	//draw chart title
	drawTitle(context,'Chart Title');
	//draw axis labels
	drawLabels(context,'xLabel','yLabel');
	//draw result
	//points=[22,21,15,28,29,18];
	drawLine(context,points);
	
}

function drawLine(context,points){
	//context.save();
	//context.translate(0,HEIGHT); // lower left origin maybe
	var xPoint=new Array();
	var xDiv= WIDTH/points.length;
	var yMax=Math.max.apply(null,points);
	var yMin=Math.min.apply(null,points);
	var yRange=yMax-yMin;
	var yDiv= HEIGHT/yRange;
	context.strokeStyle='black';
	context.lineWidth='4';
	for(var point in points){
		xPoint[point]=point*xDiv;
	}
	context.moveTo(0,0);
	for(var point in points){
		// draw something
		var yVal=(yMax-points[point])*yDiv;
		context.lineTo(xPoint[point],yVal);
		context.stroke();
		
	}
	
	//context.restore();
	
	
}
function drawLabels(context,xLabel,yLabel){
	var xMid= WIDTH/2;
	var yMid= HEIGHT/2;
	context.font="8pt Calibri";
	context.fillStyle="#00ff00";
	//xLabel
	context.fillText(xLabel,xMid,HEIGHT-10);
	//yLabel, rotate context to rotate text, then restore
	//context.save();
	//context.rotate(Math.PI/2);
	context.fillText(yLabel,10,yMid);
	//context.restore();
}
function drawTitle(context,title){
	var x = WIDTH-75;
    var y = 50;
    context.font = "12pt Calibri";
    context.fillStyle = "#0000ff"; // text color
    context.fillText(title, x, y);
	
}

function drawAxis(context){
	var xOffset=50;
	var yOffset=50;
	// need to transform the coord system, Ill try manually
	context.strokeStyle='black';
	context.lineWidth='4';
	var xOrgin=xOffset;
	var yOrgin=HEIGHT-yOffset;
	var xMax=WIDTH;
	var yMax= 0;
	
		//x axis
		context.moveTo(xOrgin,yOrgin);
		context.lineTo(xMax,yOrgin);
		context.stroke();
		//y axis
		context.moveTo(xOrgin,yOrgin);
		context.lineTo(xOrgin,yMax);
		context.stroke();
	
	
}


function sortList(){
	var result= new Array();
	var select= new Array();
	var fill= new Array();
	for(var prop in propName)
	{
		//var result=sortUniq2(propName[prop]);
		result[prop]=sortUniq2(propName[prop]);

		//document.write(propName[prop]+' len:'+ result[prop].length+' ');
		//document.write(propName[prop]+':');
		for(var i=0; i<result[prop].length;i++)
		{
			//document.write(result[prop][i]+',');
		}
	//document.write('<br/>');
	}
	// setup select vars
	var selectProject=document.getElementById('selectProject');
	var selectIteration=document.getElementById('selectIteration');
	var selectCoder=document.getElementById('selectCoder');
	select=[selectProject,selectIteration,selectCoder];
	fill=[result[0],result[4],result[2]];
	fillSelect(select, fill);
	/* coder count, total here
	for(var i=0; i < result[2].length; i++){
		var coder=result[2][i];
		var count=getCount('coder',coder);
		var total=getTotal('coder',coder);
		document.write('Coder Count for'+coder+' is:'+count);
		document.write('Coder Total for'+coder+' is:'+total);

		document.write('<br/>');
	}
	document.write('-------------------');
	document.write('<br/>');
	*/
	/* iteration total
	for(var i=0; i<result[4].length; i++){
		var iteration=result[4][i];
		var total=getTotal('iteration',iteration);
		document.write('Iteration Total for'+iteration+'is:'+total);
		document.write('<br/>');
	}
	//var count= getCount('coder','jane');
	//document.write('Coder Count: jane: '+count);
	*/
	// try to create a chart here
	
	//try to get a sublist of tasks using the new getKeyTasks(key,val)
	// try iterations
	var subResults=new Array();
	subResults=getKeyTasks(taskList,'iteration',0);
	for(results in subResults){
		document.write(subResults['iteration']);
		document.write('<br/>');
	}
	chart(0,0);
	
}

function drawHole(context,x,y){
	var offset=50;
	var radius=10;
	context.strokeStyle='red';
	context.fillStyle='silver';
	context.lineWidth=1;
	context.beginPath();
		context.arc(x-offset,y-offset,radius,(Math.PI/180)*0,(Math.PI/180)*360,false);
		context.stroke();
		context.fill();
	context.closePath();
		
}


function sortUniq2(key){
	var sortArray=new Array();
	var resultArray=new Array();
	var resultMap= {};
	// fill sort array
	for(var i=0; i< taskList.length;i++){
		sortArray[i]= taskList[i][key];
	}

	//create key map, duplicates ignored I think
	for(var i=0; i<sortArray.length;i++){
		resultMap[sortArray[i]]= sortArray[i];
	}
	for(var k in resultMap){
		resultArray.push([resultMap[k]]);
	}
	return resultArray;
	
}

function fillSelect(select,fill){
	//fill for each element in array
	for(var k=0; k<select.length;k++){
		for(var i=0; i< fill[k].length;i++){
			select[k].options[i]=new Option(fill[k][i],i);
		}
	}
}
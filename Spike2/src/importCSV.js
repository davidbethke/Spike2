//copied from a web site
var propName={0:'project',1:'story',2:'coder',3:'task',4:'iteration',5:'complexity'};
var propCount=6;
var taskList=Array();

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

function getCount(key,val){
	// all the  elements are double quoted, need to strip those w/ some matcher type thing
	var count=0;
	for(var i=0; i<taskList.length-1;i++){
		//document.write(taskList[i][key]);
		var task=taskList[i][key];
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
function chart(x,y){
	var canvas=document.getElementById('canvasChart');
	var context=canvas.getContext();
	
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
	for(var i=0; i < result[2].length; i++){
		var coder=result[2][i];
		var count=getCount('coder',coder);
		document.write('Coder Count for'+coder+' is:'+count);
		document.write('<br/>');
	}
	//var count= getCount('coder','jane');
	//document.write('Coder Count: jane: '+count);
	
	
	
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
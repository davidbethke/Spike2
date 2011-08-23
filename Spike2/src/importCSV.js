//copied from a web site
var propName={0:'project',1:'coder',2:'story',3:'task',4:'iteration',5:'complexity'};
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
	      /*
        alert( "Got the file.n" 
              +"name: " + f.name + "n"
              +"type: " + f.type + "n"
              +"size: " + f.size + " bytesn"
              + "starts with: " + contents.substr(0, contents.indexOf("n"))
        );  
        */
        var arrResults= contents.split('\n');
        //document.write('length'+arrResults.length);
        //document.write('<br/>');
        /*
        for(var val in arrResults){
        	document.write(arrResults[val]+' ');
        	var index=val+1;
        	if (!(val%6)){
        		document.write('<br/>');
        	}
        }
        */
        for (var i=0; i<propCount;i++){
        	//document.write('PropName:'+i);
        	//document.write(propName[i]);
        }
        for (var i=0; i< arrResults.length; i++){
        	var task= new Object();
        
        	var splitResults=arrResults[i].split(',');
        	for(var k=0; k < splitResults.length;k++){
        		//document.write(splitResults[k]);
        		task[propName[k]]=splitResults[k];
        		
        	}
        	//document.write('<br/>');
        	taskList[i]=task;
        }
        // try to write out the taskList array
        for(var i=0; i< taskList.length;i++){
    		//document.write('Task:'+i+' ');
        	for(var k=0; k< propCount;k++){
        		//disable
        		//document.write(taskList[i][propName[k]]);
        	}
        	//document.write('<br/>');
        }
        //document.write('done writing');
        
      };
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }
function eventWindowLoaded(){
  document.getElementById('csvFile').addEventListener('change', readSingleFile, false);
  document.getElementById('sort').addEventListener('mousedown', sortList, false);

}
function sortList(){
	var result=getPropList('coder');
	document.write('SortList len:'+result.length);
}

// call this function w/ the propName as propSearch, returns a list of unique property Names
function getPropList(propSearch){
	var propList= new Array();
	var firstFound=false;
	for(var task in taskList){
		
		if(firstFound){
			for(var propName in propList){
				if(propList[propName] == taskList[task][propSearch]){
					//don't add the coder
					// only add new coders to the list of coders coderList
				}
				else{
					propList[propList.length]=taskList[task];
				}
			}
		}
		else{
			//just starting out need to add the first coder to the coderList
			// should only be true for prop=0, the first propName in the taskList
			propList[task]=taskList[task];
			firstFound=true;
		}
	}
	return propList;
}
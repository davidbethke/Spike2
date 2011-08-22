//copied from a web site
var propName={0:'project',1:'coder',2:'story',3:'task',4:'iteration',5:'complexity'};
window.addEventListener('load', eventWindowLoaded,false);
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      var contents = e.target.result;
        alert( "Got the file.n" 
              +"name: " + f.name + "n"
              +"type: " + f.type + "n"
              +"size: " + f.size + " bytesn"
              + "starts with: " + contents.substr(0, contents.indexOf("n"))
        );  
        var arrResults= contents.split('\n');
        document.write('length'+arrResults.length);
        document.write('<br/>');
        /*
        for(var val in arrResults){
        	document.write(arrResults[val]+' ');
        	var index=val+1;
        	if (!(val%6)){
        		document.write('<br/>');
        	}
        }
        */
        for (var i=0; i< arrResults.length; i++){
        	var splitResults=arrResults[i].split(',');
        	for(var k=0; k < splitResults.length;k++){
        		document.write(splitResults[k]);
        	}
        	document.write('<br/>');
        }
        
      };
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }
function eventWindowLoaded(){
  document.getElementById('csvFile').addEventListener('change', readSingleFile, false);
}
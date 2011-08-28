TestRemoveQuote = TestCase('testRemoveQuote');

TestRemoveQuote.prototype.setUp= function(){
	// create an array of task objects
	taskList=new Array();
	for(var i=0; i<10;i++){
		var task= new Object();
		task={project:'project0',story:'story'+i,coder:'coder'+i,task:'task'+i,iteration:'0',complexity:'2'};
		taskList[i]=task;
	};
	
};
TestRemoveQuote.prototype.tearDown=function(){
	
};
TestRemoveQuote.prototype.testRemoveQuote=function(){
	var name= '"hello"';
	assertEquals('hello',removeQuote(name));
};
TestRemoveQuote.prototype.testGetTotal=function(){
	var val=[0];
	assertEquals('20',getTotal(taskList,'iteration',val));
};
TestRemoveQuote.prototype.testGetCount=function(){
	var val=[0];
	assertEquals(10,getCount(taskList,'iteration',val));
};
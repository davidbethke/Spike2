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
TestRemoveQuote.prototype.testSortUniq2=function(){
	var results=sortUniq2('iteration');
	assertEquals(0,results[0]);
};
TestRemoveQuote.prototype.testSortUniq2_2=function(){
	var results=sortUniq2('story');
	assertEquals('story5',results[5]);
};
TestRemoveQuote.prototype.testTaskListLength=function(){
	assertEquals(10,taskList.length);
	
};
TestRemoveQuote.prototype.testTaskListVal=function(){
	var val=['task8'];
	assertEquals(val[0],taskList[8]['task']);
};
TestRemoveQuote.prototype.testGetKeyTasksLength=function(){
	var val=['task8'];
	var subTaskList=[taskList[8]];
	var results=getKeyTasks(taskList,'project','project0');
	
	assertEquals(11,results.length);
};
TestRemoveQuote.prototype.testGetKeyTasksVal=function(){
	var val='coder8';
	var subTaskList= new Array();
	//subTaskList=taskList;
	subTaskList=getKeyTasks(taskList,'project','project0');
	results=getKeyTasks(subTaskList,'coder','coder8')
	assertEquals('coder9',results[0]['coder']);
};
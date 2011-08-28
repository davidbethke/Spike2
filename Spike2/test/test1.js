Testtest1 =  TestCase('test1');

Testtest1.prototype.setUp= function(){
	var quoted='"hello"';
	
};

Testtest1.prototype.tearDown= function(){
	
};

Testtest1.prototype.testQuoted=function(){
	var unquoted=removeQuote(quoted);
	assertEquals('hello',unquoted,'should pass');
};
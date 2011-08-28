TestRemoveQuote = TestCase('testRemoveQuote');

TestRemoveQuote.prototype.setUp(){
	var name= 'hello';
}
TestRemoveQuote.prototype.tearDown(){
	
}
TestRemoveQuote.prototype.testRemoveQuote(){
	assertEquals('hello',removeQuote(name));
}
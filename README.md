# Brainfuck

Translator and interpreter for Brainfuck programming language

## Using
*For example you could use the following code:*

* <b>Translator</b>:

```javascript
var Brainfuck = new Brainfuck();

var text = 'foo';
console.log(Brainfuck.translate(text, 5));

//++++++++++++++++++[>++>+++>++++>+++++<<<<-]++++++++++++++++++>>>.>+++++++++++.+++++++..+++.<<<----.>>+++++++++++++++.>.+++.------.--------.<<<+.
```

* <b>Interpreter</b>:

```javascript
var Brainfuck = new Brainfuck();
var interpret = Brainfuck.interpret('++++++++++++++++++[>++>+++>++++>+++++<<<<-]++++++++++++++++++>>>.>+++++++++++.+++++++..+++.<<<----.>>+++++++++++++++.>.+++.------.--------.<<<+.');

console.log(interpret); //Hello World!
```

##License
*The Brainfuck Translator and interpreter* are licensed under the MIT license.

* Copyright (c) 2012 [Alexander Guinness] (https://github.com/monolithed)
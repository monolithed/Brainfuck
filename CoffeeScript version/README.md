# Brainfuck

Translator and interpreter for Brainfuck programming language

## Using
*For example you could use the following code:*

* <b>Translator</b>:

```coffeescript
brainfuck = new Brainfuck
console.log brainfuck.translate 'Hello World!', 5

//++++++++++++++++++[>++>+++>++++>+++++<<<<-]++++++++++++++++++>>>.>+++++++++++.+++++++..+++.<<<----.>>+++++++++++++++.>.+++.------.--------.<<<+.
```

* <b>Interpreter</b>:

```coffeescript
brainfuck = new Brainfuck
interpret = brainfuck.interpret '++++++++++++++++++[>++>+++>++++>+++++<<<<-]++++++++++++++++++>>>.>+++++++++++.+++++++..+++.<<<----.>>+++++++++++++++.>.+++.------.--------.<<<+.'

console.log interpret //Hello World!
```

##License
*The Brainfuck Translator and interpreter* are licensed under the MIT license.

* Copyright (c) 2012 [Alexander Guinness] (https://github.com/monolithed)
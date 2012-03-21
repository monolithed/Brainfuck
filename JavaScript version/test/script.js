window.onload = function() {
	var element = function(name) {
		return document.getElementById(name);
	},
	output = element('output'),
	input =  element('input');

	if (typeof Brainfuck !== 'object' && !output && !input)
		return -1;

	var brainfuck = new Brainfuck();

	element('translate').onclick = function() {
		output.value = brainfuck.translate(input.value, +element('extent').value);
	};

	element('interpret').onclick = function() {
		output.value = brainfuck.interpret(input.value);
	};
};
/**
 * Brainfuck
 * Translator and interpreter for Brainfuck programming language
 * @author: Alexander Guinness
 * @version: 1.0
 * @method: {translate} Translates stream into Brainfuck code
 * @method: {interpret} Translates source code into human-readable information
 * @license: MIT
 * @date: 4/25/12 12:40 PM
**/

var Brainfuck = function() {};

Brainfuck.prototype = {
	/**
	 * Object translate ( code, extent );
	 * Translates stream into Brainfuck code
	 * @param {String} stream
	 * @param {Number} extent - Optimizes the resulting code
	 * @return {String}
	*/
	translate: function(stream, extent) {
		return {
			init: function (current, mint, i) {
				extent = extent || 5;

				var stack = [],
					diff = 90 / extent | 0;

				while (i < extent)
					stack.push(diff * ++i);

				var result = [this.build(diff)], char;
				i = 0;

				while (stream[i]) {
					char = stream.charCodeAt(i++);
					mint = this.closest(char, stack, current);

					result.push (
						this.compare(mint - current, '>', '<'),
						this.compare(char - stack[mint], '+', '-'), '.'
					);

					current = mint;
					stack[mint] = char;
				}

				return result.join('');
			},

			repeat: function (char, i) {
				return Array(++i).join(char);
			},

			compare: function (diff, positive, negative) {
				var array = [[diff, positive], [-diff, negative]][diff > 0 ? 0 : 1];
				return this.repeat(array[1], array[0]);
			},

			build: function (diff) {
				var array = [this.repeat('+', diff), '['], i = 0;

				while (++i < extent)
					array.push('>' + this.repeat('+', i + 1));

				array.push(this.repeat('<', extent - 1), '-]', this.repeat('+', diff));

				return array.join('');
			},

			closest: function (char, stack, current) {
				var residual = function(stack) {
					return Math.abs(char - stack);
				},
				min = 0, i = 0;

				while (stack[++i])
					if (residual(stack[i]) < residual(stack[min]))
						min = i;

				return residual(stack[min]) > residual(stack[current]) ? current : min;
			}
		}.init(0, 0, 0);
	},

	/**
	 * Brainfuck.interpret(input, [, value])
	 * Translates source code into human-readable information
	 * @param {String} input - Brainfuck program code
	 * @param {String} value - A byte of input, storing its value in the byte at the data pointer.
	 * @return {String}
	*/
	interpret: function(input, value) {
		return function(stack, output, size, open, close, pointer, i)
		{
			if (!input)
				throw new TypeError('Missing input value!');

			input = input.replace(/[^<>+-.,\[\]]/g, '');
			var length = input.length;

			while (i++ < length && stack.push(0)) {
				switch (input.charAt(i)) {
					case ">":
						pointer++;
						break;
					case "<":
						pointer--;
						break;
					case "+":
						stack[pointer]++;
						break;
					case "-":
						stack[pointer]--;
						break;
					case ".":
						output.push(String.fromCharCode(stack[pointer]));
						break;
					case ",":
						if (value)
							stack[pointer] = value.charCodeAt(0);
						break;
					case "[":
						open++;
						break;
					case "]":
						if (open < ++close)
							throw new SyntaxError('Opening bracket [ is missing!');

						while (stack[pointer] && input.charAt(i--) != '[') {
							if (stack.length > size)
								throw new RangeError('The byte is not within the correct range allowed!');
						}
					}
			}

			if (open > close)
				throw new SyntaxError('Closing bracket ] is missing!');

			return output.join('');

		}([], [], 30000, 0, 0, 0, -1);
	}
};

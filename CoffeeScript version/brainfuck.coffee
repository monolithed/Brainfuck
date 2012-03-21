###
- Brainfuck
- Translator and interpreter for Brainfuck programming language
- @author: Alexander Guinness
- @version: 1.0
- @method: {translate} Translates stream into Brainfuck code
- @method: {interpret} Translates source code into human-readable information
- @license: MIT
- @date: 4/27/12 12:12 PM
###

class Brainfuck
	translate: (stream, extent = 5) ->
		return {
			init: (current, mint, i) ->
				stack = []
				diff = 90 / extent | 0

				while i < extent
					stack.push diff * ++i

				result = [@build extent, diff]; i = 0

				while stream[i]
					char = stream.charCodeAt i++
					mint = @closest char, stack, current

					result.push(
						@compare(mint - current, '>', '<'),
						@compare(char - stack[mint], '+', '-'), '.'
					)

					current = mint
					stack[mint] = char

				result.join ''

			repeat: (char, i) ->
				Array(++i).join char

			compare: (diff, positive, negative) ->
				array = [[diff, positive], [-diff, negative]][if diff > 0 then 0 else 1]
				@repeat array[1], array[0]

			build: (count, diff) ->
				array = [@repeat('+', diff), '[']; i = 0

				while ++i < count
					array.push '>' + @repeat '+', i + 1

				array.push @repeat('<', count - 1), '-]', @repeat('+', diff)
				array.join ''

			closest: (char, stack, current) ->
				residual = (stack) ->
					Math.abs char - stack

				min = 0; i = 0

				while stack[++i]
					min = i if residual stack[i] < residual stack[min]

				if residual(stack[min]) > residual(stack[current]) then current else min

		}.init 0, 0, 0

	###
	- Brainfuck.interpret(input, [, value])
	- Translates source code into human-readable information
	- @param {String} input - Brainfuck program code
	- @param {String} value - A byte of input, storing its value in the byte at the data pointer.
	- @return {String}
	###
	interpret: (input, value) ->
		((stack, output, size, open, close, pointer, i) ->
			if !input
				throw new TypeError 'Missing input value!'

			input = input.replace /[^<>+-.,\[\]]/g, ''
			length = input.length

			while i++ < length and stack.push 0
				switch input.charAt i
					when ">"
						pointer++
					when "<"
						pointer--
					when "+"
						stack[pointer]++
					when "-"
						stack[pointer]--
					when "."
						output.push(String.fromCharCode stack[pointer])
					when ","
						pointer stack[pointer] = value.charCodeAt 0 if value
					when "["
						open++
					when "]"
						if open < ++close
							throw new SyntaxError 'Opening bracket [ is missing!'

						while stack[pointer] and input.charAt(i--) != '['
							if stack.length > size
								throw new RangeError 'The byte is not within the correct range allowed!'

			if open > close
				throw new SyntaxError 'Closing bracket ] is missing!'

			output.join ''
		) [], [], 30000, 0, 0, 0, -1

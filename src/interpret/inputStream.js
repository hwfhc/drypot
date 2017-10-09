module.exports = inputStream;

function inputStream(input) {
    var pos = 0, line = 1, col = 0;

    return {next,peek,before,eof,croak};

    /**
     * Get next char in input stream and remove it from stream.
     *
     * @return {char}
     * @public
     */

    function next() {
        var ch = input.charAt(pos);pos++;
        if (ch == "\n") line++, col = 0; else col++;
        return ch;
    }

    /**
     * Get char with offset num without removing.
     * eg: n = 1 will get next char.
     *
     * @param {number} num
     * @return {char}
     * @public
     */

    function peek(num = 1) {
        var offset = num - 1;
        return input.charAt(pos + offset);
    }

    /**
     * Get the char before the char of next().
     *
     * @return {char}
     * @public
     */

    function before() {
        return input.charAt(pos - 1);
    }

    /**
     * If there is no char in input stream.
     *
     * @public
     * @return {boolean}
     */

    function eof() {
        return peek() == "";
    }

    /**
     * Throw a error.
     *
     * @param {string} msg
     * @public
     */

    function croak(msg) {
        throw new Error(msg + " (" + line + ":" + col + ")");
    }

}


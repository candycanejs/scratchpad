const Babel = require('broccoli-babel-transpiler');

const babelScript = Babel('src', {
});

module.exports = babelScript;

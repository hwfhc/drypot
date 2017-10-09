const fs = require('fs');
const webpack = require('webpack');

const config = require('./config.js');
console.log(config);

webpack(config,() => console.log('over'));

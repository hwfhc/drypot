const fs = require('fs');
const webpack = require('webpack');

const config = require('./config.js');

webpack(config[0],() => console.log('over'));
webpack(config[1],() => console.log('over'));

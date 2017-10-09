const fs = require('fs');
const webpack = require('webpack');

const config = require('./config.js');

webpack(config,() => console.log('over'));

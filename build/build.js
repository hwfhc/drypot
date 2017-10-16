'use strict';

const fs = require('fs');
const webpack = require('webpack');

const config = require('./dev-config.js');

config.forEach(item => webpack(item,() => console.log('over')));

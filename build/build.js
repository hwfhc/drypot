'use strict';

const fs = require('fs');
const webpack = require('webpack');

const config = require('./config.js');

config.forEach(item => webpack(item,() => console.log('over')));

require('express');

const appModule = require('../.express/app/index.js');

module.exports = appModule.default || appModule;

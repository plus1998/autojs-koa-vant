"nodejs";

const engines = require('engines')

// 启动服务
require('./server')

// 打开ui
engines.execScriptFile('./ui.js')
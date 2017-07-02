// require 
var _dbDriver = require('./src/db/index.js');
var _core = require('./src/core.js');

// module export 
module.exports = function(http) {
    // run chat module.
    _core(http);
    
    return {
        db: _dbDriver,
        core: _core
    }
}
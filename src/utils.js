const bcrypt = require('bcrypt');

const utils = {}

utils.hashText = async (strings) =>{
    
    if(typeof(strings)=='object')
        strings = String(strings);

    return await bcrypt.hash(strings,12);

}

utils.compareBcrypt = async (strings,hash) =>{
    
    if(typeof(strings)=='object')
        strings = String(strings);

    return await bcrypt.compare(strings,hash);

}

module.exports = utils
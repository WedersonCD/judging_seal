const bcrypt = require('bcrypt');

const utils = {}


utils.hashText = async (strings) =>{
    
    if(typeof(strings)=='object')
        strings = String(strings);

    return await bcrypt.hash(strings,12);

} 

module.exports = utils
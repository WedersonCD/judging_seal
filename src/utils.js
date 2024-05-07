
const utils = {}

utils.hashText = async (strings) =>{
    
    if(typeof(strings)=='object')
        strings = String(strings);

    return await Bun.password.hash(strings,{algorithm: "bcrypt",const: 12});

}

utils.compareBcrypt = async (strings,hash) =>{
    
    if(typeof(strings)=='object')
        strings = String(strings);

    return await Bun.password.verify(strings,hash);

}

export default utils;
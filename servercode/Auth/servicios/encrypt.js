const bcrypt = require('bcryptjs');

function revisaPass(pass, hash){

    return bcrypt.compareSync(pass, hash);

}

module.exports={revisaPass}
let allCaracters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ@.';

let validate = function (arg) {
    let flag = true;
    for (let i = 0; i < arg.length; i++) {
        if (allCaracters.indexOf(arg.charAt(i)) < 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

module.exports = validate;
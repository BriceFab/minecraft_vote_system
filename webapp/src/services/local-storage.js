import jwt from 'jsonwebtoken';
import CONFIG from '../config';

if (process.env.NODE_ENV === 'production') {
    console.log('register storage')

    //override localStorage.setItem(key, value)
    var _setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value, secure = true) {
        //sign value
        if (secure) {
            arguments[1] = jwt.sign({ value: arguments[1] }, CONFIG.STORAGE.STORAGE_SECRET_ENCRYPTION);
        }
        _setItem.apply(this, arguments);
    }

    //override localStorage.getItem(key)
    var _getItem = Storage.prototype.getItem;
    Storage.prototype.getItem = function (key, secure = true) {
        //verify value
        let value = null;
        try {
            value = _getItem.apply(this, arguments);
            if (secure) {
                value = jwt.verify(value, CONFIG.STORAGE.STORAGE_SECRET_ENCRYPTION).value;
            }
        } catch (err) {
            console.warn(`unable to get storage '${key}'`)
        }
        return value;
    }
}
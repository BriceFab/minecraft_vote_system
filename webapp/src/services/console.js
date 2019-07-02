export function register() {
    var _privateLog = console.log;
    console.log = function (message) {
        if (process.env.NODE_ENV === 'development') {
            _privateLog.apply(console, arguments);
        }
    };

    var _privateError = console.error;
    console.error = function (message) {
        if (process.env.NODE_ENV === 'development') {
            _privateError.apply(console, arguments);
        }
    };

    var _privateWarn = console.warn;
    console.warn = function (message) {
        if (process.env.NODE_ENV === 'development') {
            _privateWarn.apply(console, arguments);
        }
    };
}
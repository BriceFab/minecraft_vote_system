if (process.env.NODE_ENV === 'production') {
    console.log('register console');

    // var _privateLog = console.log;
    console.log = function (message) {
        // _privateLog.apply(console, arguments);
    };

    // var _privateError = console.error;
    console.error = function (message) {
        // _privateError.apply(console, arguments);
    };

    // var _privateWarn = console.warn;
    console.warn = function (message) {
        // _privateWarn.apply(console, arguments);
    };
}
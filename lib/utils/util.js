const _ = require('underscore');

// function to return current month and year
exports.getMonthYear = () => {
    let month_names = ['January', 'February', 'March', 
    'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'];

    let date = new Date();
    let month = month_names[date.getMonth()].substring(0,3).toUpperCase(); 
    let year = date.getFullYear()
    return month + year;
}

// function to form a request obj for every request
exports.seperatePayloadRequest = function (reqObj) {
	let formObj = {};
	formObj.query = {};
	formObj.payload = {};
	formObj.params = {};
	formObj.auth = {};
	formObj.info = {};
	formObj.headers = {};
	formObj.meta = {};
	if (reqObj && reqObj.hasOwnProperty('query') && !_.isEmpty(reqObj.query)) {
		formObj.query = reqObj.query;
	}
	if (reqObj && reqObj.hasOwnProperty('payload') && !_.isEmpty(reqObj.payload)) {
		formObj.payload = reqObj.payload;
	}
	if (reqObj && reqObj.hasOwnProperty('params') && !_.isEmpty(reqObj.params)) {
		formObj.params = reqObj.params;
	}
	if (reqObj && reqObj.hasOwnProperty('auth') && !_.isEmpty(reqObj.auth)) {
		formObj.auth = reqObj.auth;
	}
	if (reqObj && reqObj.hasOwnProperty('info') && !_.isEmpty(reqObj.info)) {
		formObj.info = reqObj.info;
	}
	if (reqObj && reqObj.hasOwnProperty('headers') && !_.isEmpty(reqObj.headers)) {
		formObj.headers = reqObj.headers;
	}
	if (reqObj && reqObj.hasOwnProperty('meta') && !_.isEmpty(reqObj.meta)) {
		formObj.meta = reqObj.meta;
	}
	return formObj;
};
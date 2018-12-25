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


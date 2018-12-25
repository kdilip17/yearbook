// function to return current month and year
let getMonthYear = () => {
    let month_names = ['January', 'February', 'March', 
    'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'];

    let date = new Date();
    let month = month_names[date.getMonth()].substring(0,3).toUpperCase(); 
    let year = date.getFullYear()
    return month + year;
}
console.log(getMonthYear())
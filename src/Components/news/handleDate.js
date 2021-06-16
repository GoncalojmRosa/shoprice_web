export default function HandleDate(date){
    var a = date.split(' ');

    var parts = a[0].split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    // console.log(a)
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 

    var b = new Date()

    var Difference_In_Time = mydate.getTime() - b.getTime();
    
    // To calculate the no. of days between two dates
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    Difference_In_Days = Difference_In_Days < 0 ? 0 : Difference_In_Days;
    var dateFuture = new Date('2021-06-20 14:06:18');
    var dateNow = new Date();

    var seconds = Math.floor((dateFuture - (dateNow))/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);

    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

    var c = [{days: Difference_In_Days, hours: hours, minutes: minutes, seconds: seconds}]
    
    return c;
}
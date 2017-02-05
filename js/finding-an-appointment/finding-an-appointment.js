function getStartTime(schedules, duration) {
  // push all intervals into one list
  // sort them by start time
  // merge two intervals together if they overlap
  // find free interval that is at least duration

  let calculateTimeDiffInMinute = (strTime1, strTime2) => {
      // calculate time different in term of minutes
      let strTime1Array = strTime1.split(':');
      let strTime2Array = strTime2.split(':');
      let date1 = new Date(2017, 0, 1, parseInt(strTime1Array[0]), 
          parseInt(strTime1Array[1]), 0 ,0);
      let date2 = new Date(2017, 0, 1, parseInt(strTime2Array[0]), 
          parseInt(strTime2Array[1]), 0 ,0);;
      return (((date2.getTime() - date1.getTime()) / 1000) / 60);
  };
  
  let allSchedules = schedules.reduce((acc, schedulelist) => {
      let acc1 = schedulelist.reduce((acc1, s) => {        
        if (calculateTimeDiffInMinute(s[0], s[1]) < 0) { 
            return acc1;
        }
        acc1.push(s);
        return acc1;
      }, []);
      return acc.concat(acc1);
  }, []);
  
  allSchedules.sort((a,b) => {
      return calculateTimeDiffInMinute(b[0], a[0]);
  });

  // merge interval
  let combineSchedules = allSchedules.reduce((acc, schedule) => {
      if (acc.length === 0) {
          acc.push(schedule);
      } else {
          let lastSchedule = acc[acc.length - 1];
          if (lastSchedule[1] <= schedule[0]) {
            acc.push(schedule);
          } else if (lastSchedule[1] < schedule[1]) {
            lastSchedule[1] = schedule[1];
          }          
      }
      return acc;
  }, []);
  
  // find first available time or null  
  // check first scheduled time with 09:00
  if (calculateTimeDiffInMinute('09:00', combineSchedules[0][0]) >= duration) {
    return '09:00';
  } 
  
  for (let i = 0; i < combineSchedules.length - 1; i++) {  
    let durationInMinutes = calculateTimeDiffInMinute(combineSchedules[i][1], 
      combineSchedules[i+1][0]);
    if (durationInMinutes >= duration) {
      return combineSchedules[i][1];
    }  
  }
      
  return calculateTimeDiffInMinute(combineSchedules[combineSchedules.length - 1][1], '19:00') >= duration ? 
      combineSchedules[combineSchedules.length - 1][1] : null;
  return null;
}

// Example from description
let schedules = [
  [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
  [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
  [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];
console.log(getStartTime(schedules, 60) === '12:15');
console.log(getStartTime(schedules, 90)=== null);

schedules = [
  [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30']],
  [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
  [['11:30', '12:15'], ['15:00', '16:30']]
];
console.log(getStartTime(schedules, 89) == '17:30');


let schedules2 = [ 
  [ [ '10:07', '10:39' ],
    [ '10:41', '11:03' ],
    [ '12:21', '12:22' ],
    [ '15:49', '16:11' ],
    [ '17:29', '17:54' ] ],
  
  [ [ '09:41', '09:57' ],
    [ '10:03', '10:14' ],
    [ '10:32', '10:39' ],
    [ '10:56', '11:17' ],
    [ '11:23', '11:41' ],
    [ '11:59', '12:03' ],
    [ '12:28', '12:45' ],
    [ '17:19', '17:27' ],
    [ '18:56', '18:57' ] ],
  
  [ [ '09:48', '12:26' ],
    [ '15:41', '15:59' ],
    [ '18:50', '18:57' ] ],
  
  [ [ '11:21', '12:42' ],
    [ '12:51', '13:20' ],
    [ '17:51', '17:53' ],
    [ '18:07', '18:11' ] ],
  
  [ [ '09:37', '11:19' ],
    [ '11:27', '13:37' ],
    [ '16:29', '17:41' ] ] ];

console.log(getStartTime(schedules2, 37) === '09:00');

let s3 = [ [ [ '10:07', '10:39' ],
    [ '10:41', '11:03' ],
    [ '12:21', '12:42' ],
    [ '15:49', '10:39' ],
    [ '17:29', '17:53' ] ],
  [ [ '09:41', '09:57' ],
    [ '10:03', '10:14' ],
    [ '10:32', '10:39' ],
    [ '10:56', '11:17' ],
    [ '11:23', '11:41' ],
    [ '11:59', '12:03' ],
    [ '12:28', '11:03' ],
    [ '17:19', '09:57' ],
    [ '18:56', '18:57' ] ],
  [ [ '09:48', '12:26' ],
    [ '15:41', '15:59' ],
    [ '18:50', '18:57' ] ],
  [ [ '11:21', '12:42' ],
    [ '12:51', '13:20' ],
    [ '17:51', '17:53' ],
    [ '18:07', '18:11' ] ],
  [ [ '09:37', '11:19' ],
    [ '11:27', '13:37' ],
    [ '16:29', '11:17' ] ] ]

console.log(getStartTime(s3, 38) === '13:37');


let s4 = [ [ [ '10:00', '11:00' ],
    [ '12:00', '13:00' ],
    [ '14:00', '15:00' ],
    [ '16:00', '17:00' ],
    [ '18:00', '19:00' ] ],
  [ [ '10:00', '13:00' ],
    [ '14:00', '17:00' ],
    [ '18:00', '19:00' ] ] ]

console.log(getStartTime(s4, 60) === '09:00');

let s5 = [ [ [ '10:07', '09:57' ],
    [ '10:41', '11:03' ],
    [ '12:21', '12:42' ],
    [ '15:49', '10:39' ],
    [ '17:29', '17:53' ] ],
  [ [ '09:41', '09:57' ],
    [ '10:03', '10:14' ],
    [ '10:32', '10:39' ],
    [ '10:56', '11:17' ],
    [ '11:23', '11:41' ],
    [ '11:59', '12:03' ],
    [ '12:28', '11:03' ],
    [ '17:19', '09:57' ],
    [ '18:56', '18:57' ] ],
  [ [ '09:48', '12:26' ],
    [ '15:41', '15:59' ],
    [ '18:50', '18:57' ] ],
  [ [ '11:21', '12:42' ],
    [ '12:51', '13:20' ],
    [ '17:51', '17:53' ],
    [ '18:07', '18:11' ] ],
  [ [ '09:37', '11:19' ],
    [ '11:27', '13:37' ],
    [ '16:29', '11:17' ] ] ]
    
console.log(getStartTime(s5, 124) === '13:37');
//console.log(getStartTime(s5, 125));

let s6 = [ [ [ '10:38', '12:06' ],
    [ '13:39', '15:08' ],
    [ '17:23', '17:26' ],
    [ '18:02', '18:26' ] ],
  [ [ '09:09', '11:27' ],
    [ '12:14', '13:41' ],
    [ '15:16', '17:17' ],
    [ '17:32', '18:50' ] ] ]
console.log(getStartTime(s6, 9) === '09:00');

let s7 = [ [ [ '10:38', '12:06' ],
    [ '13:39', '15:08' ],
    [ '17:23', '17:26' ],
    [ '18:02', '18:26' ] ],
  [ [ '09:09', '12:06' ],
    [ '12:14', '15:08' ],
    [ '15:16', '17:17' ],
    [ '17:32', '18:26' ] ] ]
console.log(getStartTime(s7, 11) == '18:26');
//console.log(getStartTime(s7, 11));

let s8 = [ [ [ '09:00', '12:15' ],
    [ '13:30', '17:30' ],
    [ '16:00', '17:30' ],
    [ '17:45', '19:00' ] ],
  [ [ '09:15', '12:00' ],
    [ '14:00', '16:30' ],
    [ '17:00', '17:30' ] ],
  [ [ '11:30', '12:15' ],
    [ '15:00', '16:30' ],
    [ '17:45', '19:00' ] ] ]
console.log(getStartTime(s8, 76) == null);
    
let s9 = [ [ [ '09:09', '12:06' ],
    [ '12:14', '15:08' ],
    [ '15:16', '17:17' ],
    [ '17:32', '18:50' ] ],
  [ [ '10:38', '12:06' ],
    [ '13:39', '15:08' ],
    [ '17:23', '17:26' ],
    [ '18:02', '18:26' ] ] ]
console.log(getStartTime(s9, 10) == '18:50');
    
let s10 = [ [ [ '10:07', '10:39' ],
    [ '10:41', '11:03' ],
    [ '12:21', '12:22' ],
    [ '15:49', '16:11' ],
    [ '17:29', '17:54' ] ],
  [ [ '09:48', '12:26' ],
    [ '15:41', '16:11' ],
    [ '18:50', '18:57' ] ],
  [ [ '09:37', '13:37' ],
    [ '11:27', '13:37' ],
    [ '16:29', '17:54' ] ],
  [ [ '11:21', '12:42' ],
    [ '12:51', '13:20' ],
    [ '17:51', '17:53' ],
    [ '18:07', '18:11' ] ],
  [ [ '09:41', '09:57' ],
    [ '10:03', '10:14' ],
    [ '10:32', '10:39' ],
    [ '10:56', '11:17' ],
    [ '11:23', '11:41' ],
    [ '11:59', '12:03' ],
    [ '12:28', '12:45' ],
    [ '17:19', '17:27' ],
    [ '18:56', '18:57' ] ] ]    
console.log(getStartTime(s10, 125) == null);

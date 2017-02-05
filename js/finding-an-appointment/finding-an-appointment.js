function getStartTime(schedules, duration) {
  // push all intervals into one list
  // sort them by start time
  // merge two intervals together if they overlap
  // find free interval that is at least duration
  
  let allSchedules = schedules.reduce((acc, schedulelist) => {
      let acc1 = schedulelist.reduce((acc1, s) => {
          acc1.push(s);
          return acc1;
      }, []);
      return acc.concat(acc1);
  }, []);
  
  allSchedules.sort((a,b) => {
      let firstStartTime = a[0].substring(0, 2) + a[0].substring(3);
      let secondStartTime = b[0].substring(0, 2) + b[0].substring(3);      
      return firstStartTime > secondStartTime;
  });
  
  console.log(allSchedules);
  return null;
}


// Example from description
var schedules = [
  [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
  [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
  [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];
console.log(getStartTime(schedules, 60) === '12:15');
console.log(getStartTime(schedules, 90)=== null);

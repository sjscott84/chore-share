import moment from 'moment';

export function ModifyDate(when, time){
  let date = new Date();
  let month = moment(when, "dddd Do MMMM YYYY").format("MM");
  let day = moment(when, "dddd Do MMMM YYYY").format("DD");
  let hours = parseInt(moment(time, "HH:mm").format("HH"));
  let min = parseInt(moment(time, "HH:mm").format("mm"));
  date.setMonth(month-1);
  date.setDate(day);
  date.setHours(hours);
  date.setMinutes(min);
  return date;
}
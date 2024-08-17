import dayjs from "dayjs";

export function generateDate(month, year) {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const firstDateOfCalendar = firstDateOfMonth.startOf("week");
  const lastDateOfCalendar = lastDateOfMonth.endOf("week");

  let date = firstDateOfCalendar; 
  const dates = [];

  while (date.isBefore(lastDateOfCalendar)) {
    dates.push({
      date: date,
      currentMonth: date.month() === month,
      today: date.isSame(dayjs(), "day"),
    });
    date = date.add(1, "day"); 
  }

  return dates;
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

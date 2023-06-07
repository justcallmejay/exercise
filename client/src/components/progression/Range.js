export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const Range = (end) => {
const {result} = Array.from({length: end}).reduce(({result, current}) => ({
    result: [...result, current],
    current: current + 1
}), {result: [], current: 1})

return result
}

export const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

export const getSortedDay = (date) => {
    const daysInMonth = Range(getDaysInMonth(date));
    const index = new Date(date.getFullYear(), date.getMonth() + 1).getDay();
    return [...Array(index == 0 ? 6 : index - 1), ...daysInMonth];
}

export const getMonthYear = (date) => {
    const d = date.toDateString().split(" ");
    return `${d[1]} ${d[3]}`;
  };

export const prevMonth = (date, cb) => {
    const mon = date.getMonth();
    if (mon > 0) {
      date.setMonth(mon - 1);
    } else {
      date.setMonth(11);
      date.setFullYear(date.getFullYear() - 1);
    }
    cb(new Date(date));
  };

  export const nextMonth = (date, cb) => {
    const mon = date.getMonth();
    if (mon < 11) {
      date.setMonth(mon + 1);
    } else {
      date.setMonth(0);
      date.setFullYear(date.getFullYear() + 1);
    }
    cb(new Date(date));
  };
  
  export const areDatesTheSame = (first, second) => {
    return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
}
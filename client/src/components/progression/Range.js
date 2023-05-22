const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const Range = (end) => {
const {result} = Array.from({length: end}).reduce(({result, current}) => ({
    result: [...result, current],
    current: current + 1
}), {result: [], current: 1})

return result
}

export const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
}

export const getSortedDays = (month, year) => {
    const dayIndex = new Date(year, month, 1).getDay()
    return [...days.slice(dayIndex), ...days.slice(0, dayIndex)]
}

export const getDateObj = (day, month, year) => {
    return new Date(year, month, day);
}

export const areDatesTheSame = (first, second) => {
    return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
}

export const mockEvents = [
    {date: new Date(2023, 6, 20), title: 'appointment'},
    {date: new Date(2023, 7, 10), title: 'wedding'},
]
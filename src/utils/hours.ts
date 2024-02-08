import { setHours, setMinutes, format, eachMinuteOfInterval, isToday } from 'date-fns'

export function generateDayTimeList(date: Date): string[] {
    const startTime = setMinutes(setHours(date, 9), 0); // Set start time to 09:00
    const endTime = setMinutes(setHours(date, 21), 0); // Set end time to 21:00
    const interval = 45; // interval in minutes

    const timeListFunction = () => {
        return eachMinuteOfInterval({
            start: startTime,
            end: endTime,
        }, { step: interval, }).map(date => format(date, "HH:mm"))

    }

    const getListTimeFiltered = () => {
        const currentTime = format(new Date(), "HH:mm")
        const timeList = timeListFunction()
        if (isToday(date)) return timeList.filter(time => time > currentTime)
        return timeList
    }

    const listFiltered = getListTimeFiltered()

    return listFiltered
}
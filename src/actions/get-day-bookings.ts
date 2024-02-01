'use server'
import db from '@/lib/db'
import { endOfDay, startOfDay } from 'date-fns'

export const getDayBookings = async (barbershopId: string, date: Date) => {
    const bookings = await db.booking.findMany({
        where: {
            barbershopId,
            date: {
                lte: endOfDay(date),
                gte: startOfDay(date)
            }
        }
    })
    return bookings
}
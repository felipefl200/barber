'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const cancelBooking = async (bookingId: string) => {
    try {
        const canceledBooking = await db.booking.delete({
            where: {
                id: bookingId
            }
        })
        revalidatePath('/bookings')
        return canceledBooking
    } catch {
        throw new Error('Failed to cancel booking')
    }
}
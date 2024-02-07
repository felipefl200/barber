'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

interface SaveBookingProps {
    barbershopId: string
    serviceId: string
    userId: string
    date: string
}

export const saveBooking = async (params: SaveBookingProps) => {
    try {
        const booking = await db.booking.create({
            data: {
                userId: params.userId,
                serviceId: params.serviceId,
                barbershopId: params.barbershopId,
                date: new Date(params.date)
            }
        })
        revalidatePath('/bookings')
        return booking
    } catch {
        return null
    }

}
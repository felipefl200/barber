'use server'

import db from "@/lib/db"

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
        return booking
    } catch {
        return null
    }

}
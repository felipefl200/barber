import { BookingItem } from '@/components/booking-item'
import { Header } from '@/components/header'
import { authOptions } from '@/lib/authOptions'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function BookingsPage() {
    const session = await getServerSession(authOptions)

    // const confirmedBookings = await db.booking.findMany({
    //     orderBy: {
    //         date: 'asc',
    //     },
    //     where: {
    //         userId: session?.user.id,
    //         date: {
    //             gte: new Date(),
    //         },
    //     },
    //     include: {
    //         service: true,
    //         barbershop: true,
    //     },
    // })

    // const finishedBookings = await db.booking.findMany({
    //     orderBy: {
    //         date: 'asc',
    //     },
    //     where: {
    //         userId: session?.user.id,
    //         date: {
    //             lt: new Date(),
    //         },
    //     },
    //     include: {
    //         service: true,
    //         barbershop: true,
    //     },
    // })
    const [confirmedBookings, finishedBookings] = await Promise.all([
        db.booking.findMany({
            orderBy: {
                date: 'asc',
            },
            where: {
                userId: session?.user.id,
                date: {
                    gte: new Date(),
                },
            },
            include: {
                service: true,
                barbershop: true,
            },
        }),
        db.booking.findMany({
            orderBy: {
                date: 'asc',
            },
            where: {
                userId: session?.user.id,
                date: {
                    lt: new Date(),
                },
            },
            include: {
                service: true,
                barbershop: true,
            },
        }),
    ])

    if (!session?.user) return redirect('/')

    // const confirmedBookings = bookings.filter((booking) => isFuture(booking.date))
    // const finishedBookings = bookings.filter((booking) => isPast(booking.date)).toReversed()
    return (
        <>
            <Header />
            <div className="mx-auto max-w-5xl px-5 py-6">
                <h1 className="text-xl font-bold">Agendamentos</h1>
                <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">Confirmados</h2>
                <div className="flex flex-col gap-3">
                    {confirmedBookings.map((bookings) => (
                        <BookingItem key={bookings.id} booking={bookings} />
                    ))}
                </div>

                <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">Finalizados</h2>
                <div className="flex flex-col gap-3">
                    {finishedBookings.map((bookings) => (
                        <BookingItem key={bookings.id} booking={bookings} />
                    ))}
                </div>
            </div>
        </>
    )
}

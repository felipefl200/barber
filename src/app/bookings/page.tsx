import { BookingItem } from '@/components/booking-item'
import { Header } from '@/components/header'
import { authOptions } from '@/lib/authOptions'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function BookingsPage() {
    const session = await getServerSession(authOptions)

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

    return (
        <>
            <Header />
            <main>
                <div className="mx-auto w-full max-w-5xl flex-1 px-5 py-6">
                    <h1 className="text-xl font-bold">Agendamentos</h1>
                    {confirmedBookings.length > 0 && (
                        <>
                            <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">Confirmados</h2>
                            <div className="flex flex-col gap-3">
                                {confirmedBookings.map((bookings) => (
                                    <BookingItem key={bookings.id} booking={bookings} />
                                ))}
                            </div>
                        </>
                    )}

                    {finishedBookings.length > 0 && (
                        <>
                            <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">Finalizados</h2>
                            <div className="flex flex-col gap-3">
                                {finishedBookings.map((bookings) => (
                                    <BookingItem key={bookings.id} booking={bookings} />
                                ))}
                            </div>
                        </>
                    )}
                    {confirmedBookings.length === 0 && finishedBookings.length === 0 && (
                        <p className="mt-6 text-center text-sm text-gray-400">
                            Nenhum agendamento encontrado. <br />
                        </p>
                    )}
                </div>
            </main>
        </>
    )
}

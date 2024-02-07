import { Header } from '@/components/header'
import { BarbershopItem } from '@/components/barbershop-item'
import { BookingItem } from '@/components/booking-item'
import { Search } from '@/components/search'
import db from '@/lib/db'
import { formatDate } from '@/utils/format-date'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export default async function Home() {
    const session = await getServerSession(authOptions)

    const [barbershops, confirmedBookings] = await Promise.all([
        db.barbershop.findMany(),
        session?.user
            ? await db.booking.findMany({
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
              })
            : Promise.resolve([]),
    ])

    return (
        <main>
            <Header />
            <div className="mx-auto max-w-3xl">
                <div className="p-5 pt-5">
                    <h2 className="text-xl font-bold">
                        Olá, {session?.user.name?.split(' ')[0] || 'vamos agendar um corte hoje ?'}
                    </h2>
                    <p className="text-sm capitalize">{formatDate(new Date())}</p>
                </div>
                <div className="mt-6 px-5">
                    <Search />
                </div>
                <div className="mt-6">
                    <div className="mb-3 pl-5 text-sm font-bold uppercase text-gray-400">Agendamentos</div>
                    <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
                        {confirmedBookings.length > 0
                            ? confirmedBookings.map((booking) => <BookingItem key={booking.id} booking={booking} />)
                            : 'Nenhum agendamento encontrado'}
                    </div>
                </div>
                <div className="mb-[4.5rem] mt-6">
                    <h2 className="mb-3 px-5 text-sm font-bold uppercase text-gray-400">Recomendações</h2>
                    <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
                        {barbershops.map((barbershop) => (
                            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

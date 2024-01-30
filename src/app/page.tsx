import { Header } from '@/components/Header'
import { BarbershopItem } from '@/components/barbershop-item'
import { BookingItem } from '@/components/booking-item'
import { Search } from '@/components/search'
import db from '@/lib/db'
import { formatDate } from '@/utils/format-date'

export default async function Home() {
    const barbershops = await db.barbershop.findMany()

    return (
        <div>
            <Header />
            <div className="p-5 pt-5">
                <h2 className="text-xl font-bold">Olá, Miguel!</h2>
                <p className="text-sm capitalize">{formatDate(new Date())}</p>
            </div>
            <div className="mt-6 px-5">
                <Search />
            </div>
            <div className="mt-6 px-5">
                <div className="mb-3 text-sm font-bold uppercase text-gray-400">Agendamentos</div>
                <BookingItem />
            </div>
            <div className="mt-6">
                <h2 className="mb-3 px-5 text-sm font-bold uppercase text-gray-400">Recomendações</h2>
                <div className="flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {barbershops.map((barbershop) => (
                        <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                    ))}
                </div>
            </div>
        </div>
    )
}

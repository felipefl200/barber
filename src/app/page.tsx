import { Header } from '@/components/Header'
import { BookingItem } from '@/components/booking-item'
import { Search } from '@/components/search'
import { formatDate } from '@/utils/format-date'

export default function Home() {
    return (
        <div>
            <Header />
            <div className="p-5 pt-5">
                <h2 className="text-xl font-bold">Olá, Miguel!</h2>
                <p className="text-sm capitalize">{formatDate(new Date())}</p>
            </div>
            <div className="mt-5 px-5">
                <Search />
            </div>
            <div className="px-5">
                <div className="mb-3 text-sm font-bold uppercase text-gray-400">Agendamentos</div>
                <BookingItem />
            </div>
        </div>
    )
}

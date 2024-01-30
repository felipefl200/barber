import { Header } from '@/components/Header'
import { formatDate } from '@/utils/format-date'

export default function Home() {
    return (
        <div>
            <Header />
            <div className="p-5 pt-5">
                <h2 className="text-xl font-bold">Olá, Miguel!</h2>
                <p className="text-sm capitalize">{formatDate(new Date())}</p>
            </div>
        </div>
    )
}

import { BarbershopItem } from '@/components/barbershop-item'
import { Header } from '@/components/header'
import { Search } from '@/components/search'
import db from '@/lib/db'
import { redirect, useRouter } from 'next/navigation'

interface BarberShopsPageProps {
    searchParams: {
        search?: string
    }
}
export default async function BarberShopsPage({ searchParams }: BarberShopsPageProps) {
    if (!searchParams.search) return redirect('/')

    const barberShops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams.search,
                mode: 'insensitive',
            },
        },
    })
    return (
        <>
            <Header />
            <main className="flex-1">
                <div className="px-5 py-6">
                    <Search defaultValues={{ search: searchParams.search }} />
                    <h1 className="my-3 text-xs font-bold uppercase text-gray-400">
                        Resultados para &quot;{searchParams.search}&quot;
                    </h1>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                        {barberShops.length > 0 ? (
                            barberShops.map((barbershop) => (
                                <div key={barbershop.id}>
                                    <BarbershopItem barbershop={barbershop} />
                                </div>
                            ))
                        ) : (
                            <h2 className="col-span-2 my-6 text-nowrap text-center text-xs">
                                Não foram encontrados resultados para &quot;{searchParams.search}&quot;
                            </h2>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

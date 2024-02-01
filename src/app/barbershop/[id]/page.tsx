import db from '@/lib/db'
import { BarbershopInfo } from './_components/barbershop-info'
import { ServiceItem } from './_components/service-item'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

interface BarbershopDetailsProps {
    params: {
        id?: string
    }
}
export default async function BarbershopDetails({ params }: BarbershopDetailsProps) {
    const session = await getServerSession(authOptions)
    const barbershop = await db.barbershop.findUnique({
        where: { id: params.id },
        include: {
            services: true,
        },
    })
    if (!barbershop) return null
    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />
            <div className="mb-2 px-2">
                {barbershop.services.map((service) => (
                    <ServiceItem
                        key={service.id}
                        barbershop={barbershop}
                        service={service}
                        isAuthenticated={!!session?.user}
                    />
                ))}
            </div>
        </div>
    )
}

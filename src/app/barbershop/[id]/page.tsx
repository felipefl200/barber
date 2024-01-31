import db from '@/lib/db'
import { BarbershopInfo } from './_components/barbershop-info'
import { ServiceItem } from './_components/service-item'

interface BarbershopDetailsProps {
    params: {
        id?: string
    }
}
export default async function BarbershopDetails({ params }: BarbershopDetailsProps) {
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
            <div className='px-2 mb-2'>
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                ))}
            </div>
        </div>
    )
}

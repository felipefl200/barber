import db from '@/lib/db'
import { BarbershopInfo } from './_components/barbershop-info'

interface BarbershopDetailsProps {
    params: {
        id?: string
    }
}
export default async function BarbershopDetails({ params }: BarbershopDetailsProps) {
    const barbershop = await db.barbershop.findUnique({
        where: { id: params.id },
    })
    if (!barbershop) return null
    return <BarbershopInfo barbershop={barbershop} />
}

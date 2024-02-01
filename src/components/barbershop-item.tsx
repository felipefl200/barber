'use client'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Barbershop } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Badge } from './ui/badge'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BarbershopItemsProps {
    barbershop: Barbershop
}

export function BarbershopItem({ barbershop }: BarbershopItemsProps) {
    const router = useRouter()
    const handleBookingClick = () => {
        router.push(`/barbershop/${barbershop.id}`)
    }
    return (
        <Card className="min-w-[167px] max-w-[167px] dark:rounded-2xl">
            <CardContent className="p-0">
                <div className="relative h-[159px] w-full px-1">
                    <Badge
                        variant="secondary"
                        className="absolute left-3 top-3 z-50 flex items-center gap-0.5 opacity-85"
                    >
                        <Star size={12} />
                        <span className="text-xs">5.0</span>
                    </Badge>
                    <Image
                        src={barbershop.imageUrl}
                        alt={barbershop.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="dark:rounded-t-2xl"
                    />
                </div>
                <div className="px-3 pb-3">
                    <h2 className="mt-2 overflow-hidden text-ellipsis text-nowrap font-bold">{barbershop.name}</h2>
                    <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-gray-400">
                        {barbershop.address}
                    </p>
                    <Button onClick={handleBookingClick} variant="secondary" className="mt-3 w-full">
                        Reservar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

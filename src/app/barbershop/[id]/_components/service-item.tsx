import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/utils/format-currency'
import { Service } from '@prisma/client'
import Image from 'next/image'

interface ServiceItemProps {
    service: Service
}
export function ServiceItem({ service }: ServiceItemProps) {
    return (
        <Card className='mt-2'>
            <CardContent className="p-3">
                <div className="flex w-full items-center gap-4">
                    <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
                        <Image
                            className="rounded-lg"
                            fill
                            style={{ objectFit: 'contain' }}
                            src={service.imageUrl}
                            alt={service.name}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>

                        <div className="mt-3 flex items-center justify-between">
                            <p className="text-sm font-bold text-primary">{formatCurrency(service.price.toString())}</p>
                            <Button variant="secondary">Reservar</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

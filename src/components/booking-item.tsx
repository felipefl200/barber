import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Prisma } from '@prisma/client'
import { getDate, getHour, getMonth } from '@/utils/format-date'
import { isPast } from 'date-fns'

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }
    }>
}

export function BookingItem({ booking }: BookingItemProps) {
    return (
        <Card className="min-w-full">
            <CardContent className="flex px-0 py-0">
                <div className="flex flex-[2] flex-col gap-2 py-5 pl-5">
                    <Badge
                        className="w-fit hover:cursor-default"
                        variant={isPast(booking.date) ? 'secondary' : 'default'}
                    >
                        {isPast(booking.date) ? 'Finalizado' : 'Confirmado'}
                    </Badge>
                    <h2 className="font-bold md:pl-8">{booking.service.name}</h2>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 md:ml-8">
                            <AvatarImage src={booking.barbershop.imageUrl} />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm">{booking.barbershop.name}</h3>
                    </div>
                </div>
                <div className="flex flex-[1] flex-col items-center justify-center border-l border-solid border-secondary">
                    <p className="text-sm capitalize">{getMonth(booking?.date)}</p>
                    <p className="text-2xl">{getDate(booking.date)}</p>

                    <p className="text-sm">{getHour(booking.date)}</p>
                </div>
            </CardContent>
        </Card>
    )
}

'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Prisma } from '@prisma/client'
import { getDate, getHour, getMonth } from '@/utils/format-date'
import { format, isPast } from 'date-fns'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import { formatCurrency } from '@/utils/format-currency'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { Icons } from '@/components/icons'
import { stripCaracters } from '@/utils/regex-phone'
import { cancelBooking } from '@/actions/cancel-booking'
import { toast } from 'sonner'
import { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }
    }>
}

export function BookingItem({ booking }: BookingItemProps) {
    const [isLoading, setIsLoading] = useState(false)
    const handleCancelClick = async () => {
        setIsLoading(true)
        try {
            const result = await cancelBooking(booking.id)
            if (result) toast.success('Reserva cancelada com sucesso')
        } catch (error) {
            console.log(error)
            toast.error('Erro ao cancelar reserva')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
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
            </SheetTrigger>
            <SheetContent className="px-0">
                <SheetHeader className="border-b border-solid border-secondary px-5 pb-6 text-left">
                    <SheetTitle>Informações da reserva</SheetTitle>
                </SheetHeader>
                <div className="px-5">
                    <div className="relative mt-6 h-[180px] w-full">
                        <Image
                            src="/barbershop-map.png"
                            fill
                            style={{
                                objectFit: 'contain',
                            }}
                            alt={booking.barbershop.name}
                        />
                        <div className="absolute bottom-6 left-0 w-full px-5 md:bottom-4">
                            <Card>
                                <CardContent className="flex gap-2 p-3">
                                    <Avatar>
                                        <AvatarImage src={booking.barbershop.imageUrl} />
                                        <AvatarFallback>{booking.barbershop.name}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="font-bold">{booking.barbershop.name}</h2>
                                        <h3 className="overflow-hidden text-ellipsis text-nowrap text-xs">
                                            {booking.barbershop.address}
                                        </h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <Badge
                        className="my-3 w-fit hover:cursor-default md:ml-2"
                        variant={isPast(booking.date) ? 'secondary' : 'default'}
                    >
                        {isPast(booking.date) ? 'Finalizado' : 'Confirmado'}
                    </Badge>
                    <Card>
                        <CardContent className="flex flex-col gap-3 p-3">
                            <div className="flex justify-between">
                                <h2 className="font-bold">{booking.service.name}</h2>
                                <h3 className="font-bold">{formatCurrency(booking.service.price.toString())}</h3>
                            </div>

                            <div className="flex justify-between">
                                <h3 className="text-sm text-gray-400">Data</h3>
                                <h4 className="text-sm">{format(booking.date, "dd 'de' MMMM", { locale: ptBR })}</h4>
                            </div>

                            <div className="flex justify-between">
                                <h3 className="text-sm text-gray-400">Horário</h3>
                                <h4 className="text-sm">{getHour(booking.date)}</h4>
                            </div>

                            <div className="flex justify-between">
                                <h3 className="text-sm text-gray-400">Barbearia</h3>
                                <h4 className="text-sm">{booking.barbershop.name}</h4>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <SheetFooter className="px-5">
                    <div className=" flex w-full flex-col items-center justify-between">
                        <div className="mt-6 flex w-full flex-col items-center">
                            {booking.barbershop.phones.map((phone) => (
                                <div key={phone} className="my-1 flex w-full items-center justify-between px-2">
                                    <div className="flex items-center gap-2">
                                        <span>
                                            <Phone size={18} />
                                        </span>
                                        <p>{phone}</p>
                                    </div>
                                    <div>
                                        <Badge>
                                            <a href={`tel:+55${stripCaracters(phone)}`}>Ligar</a>
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                            <div className="my-1 flex w-full items-center justify-between gap-2 px-2">
                                <div className="flex items-center gap-2">
                                    <Icons.whatsapp className="-mx-0.5 h-6 w-6" />
                                    <a href={`https://wa.me/${stripCaracters(booking.barbershop.whatsapp)}`}>
                                        {booking.barbershop.whatsapp}
                                    </a>
                                </div>
                                <div>
                                    <Badge>
                                        <a
                                            className=""
                                            href={`https://wa.me/${stripCaracters(booking.barbershop.whatsapp)}`}
                                        >
                                            Conversar
                                        </a>
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-5 flex w-full items-center gap-3 px-5">
                            <SheetClose asChild>
                                <Button className="w-full" variant="secondary">
                                    Voltar
                                </Button>
                            </SheetClose>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        disabled={isPast(booking.date)}
                                        className="w-full disabled:cursor-not-allowed"
                                        variant="destructive"
                                    >
                                        Cancelar Reserva
                                        {isLoading && <Icons.spinner className="h-4 w-4 animate-spin" />}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[90%] rounded">
                                    <DialogHeader>
                                        <DialogTitle>Confirma o cancelamento ?</DialogTitle>
                                        <DialogDescription>Essa ação não pode ser desfeita.</DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="flex flex-col gap-3">
                                        <Button
                                            onClick={handleCancelClick}
                                            disabled={isPast(booking.date) || isLoading}
                                            variant="destructive"
                                        >
                                            Cancelar
                                        </Button>
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">
                                                Voltar
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

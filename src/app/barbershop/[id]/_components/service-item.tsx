'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { formatCurrency } from '@/utils/format-currency'
import { Barbershop, Booking, Service } from '@prisma/client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { ptBR } from 'date-fns/locale'
import { generateDayTimeList } from '@/utils/hours'
import { format } from 'date-fns/format'
import { saveBooking } from '@/actions/save-booking'
import { setHours, setMinutes } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getDayBookings } from '@/actions/get-day-bookings'

interface ServiceItemProps {
    barbershop: Barbershop
    service: Service
    isAuthenticated?: boolean
}
export function ServiceItem({ service, isAuthenticated, barbershop }: ServiceItemProps) {
    const { data } = useSession()
    const router = useRouter()
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [hour, setHour] = useState<string | undefined>()
    const [isSheetIsOpen, setSheetIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dayBookings, setDatBookings] = useState<Booking[]>([])

    useEffect(() => {
        if (!date) return
        const refreshAvailableHours = async () => {
            const dayBookingsDB = await getDayBookings(barbershop.id, date)
            setDatBookings(dayBookingsDB)
        }
        refreshAvailableHours()
    }, [date, barbershop.id])

    const handleBookingClick = () => {
        if (!isAuthenticated) return signIn('github')
    }
    const handleHourClick = (time: string) => {
        setHour(time)
    }
    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined)
    }
    const timeList = useMemo(() => {
        if (!date) return []

        return generateDayTimeList(date).filter((time) => {
            const timeHour = Number(time.split(':')[0])
            const timeMinutes = Number(time.split(':')[1])

            const booking = dayBookings.find((booking) => {
                const bookingHour = booking.date.getHours()
                const bookingMinutes = booking.date.getMinutes()

                return bookingHour === timeHour && bookingMinutes === timeMinutes
            })
            if (!booking) return true

            return false
        })
    }, [date, dayBookings])

    const handleBookingSubmit = async () => {
        setIsLoading(true)
        try {
            if (!hour || !date || !data) return null

            const hourFormat = Number(hour.split(':')[0])
            const minuteFormat = Number(hour.split(':')[1])
            const newDate = setMinutes(setHours(date, hourFormat), minuteFormat)

            const booking = await saveBooking({
                serviceId: service.id,
                userId: data.user.id,
                date: newDate.toString(),
                barbershopId: barbershop.id,
            })
            setSheetIsOpen(false)
            setHour(undefined)
            setDate(undefined)
            if (booking)
                toast('Reserva realizada com sucesso', {
                    description: format(booking.date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR }),
                    action: {
                        label: 'Visualizar',
                        onClick: () => router.push('/bookings'),
                    },
                })
            console.log(booking)
        } catch (error) {}
        setIsLoading(false)
    }
    return (
        <Card className="mt-2">
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
                    <div className="flex w-full flex-col">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>

                        <div className="mt-3 flex items-center justify-between">
                            <p className="text-sm font-bold text-primary">{formatCurrency(service.price.toString())}</p>
                            <Sheet open={isSheetIsOpen} onOpenChange={setSheetIsOpen}>
                                <SheetTrigger asChild>
                                    <Button onClick={handleBookingClick} variant="secondary">
                                        Reservar
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="p-0">
                                    <SheetHeader className="border-b border-solid border-secondary px-5 py-6 text-left">
                                        <SheetTitle>Fazer reserva</SheetTitle>
                                    </SheetHeader>
                                    <div className="py-6">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            fromDate={new Date()}
                                            locale={ptBR}
                                            styles={{
                                                head_cell: { width: '100%', textTransform: 'capitalize' },
                                                cell: { width: '100%' },
                                                button: { width: '100%' },
                                                nav_button_previous: { width: '32px', height: '32px' },
                                                nav_button_next: { width: '32px', height: '32px' },
                                                caption: { textTransform: 'capitalize' },
                                            }}
                                        />
                                    </div>
                                    {date && (
                                        <div className="flex gap-3 overflow-x-auto border-t border-solid border-secondary px-5 py-6 [&::-webkit-scrollbar]:hidden">
                                            {timeList.map((time) => (
                                                <Button
                                                    onClick={() => handleHourClick(time)}
                                                    key={time}
                                                    variant={hour === time ? 'default' : 'outline'}
                                                    className="rounded-full border border-input"
                                                >
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                    <div className="border-t border-solid border-secondary px-5 py-6">
                                        <Card>
                                            <CardContent className="flex flex-col gap-3 p-3">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <h3 className="font-bold">
                                                        {formatCurrency(service.price.toString())}
                                                    </h3>
                                                </div>
                                                {date && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm text-gray-400">Data</h3>
                                                        <h4 className="text-sm">
                                                            {format(date, "dd 'de' MMMM", { locale: ptBR })}
                                                        </h4>
                                                    </div>
                                                )}
                                                {hour && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm text-gray-400">Horário</h3>
                                                        <h4 className="text-sm">{hour}</h4>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm text-gray-400">Barbearia</h3>
                                                    <h4 className="text-sm">{barbershop.name}</h4>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <SheetFooter className="px-5">
                                        <Button onClick={handleBookingSubmit} disabled={!hour || !date || isLoading}>
                                            Confirmar Reserva
                                            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                        </Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

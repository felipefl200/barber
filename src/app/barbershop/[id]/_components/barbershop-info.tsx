'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Barbershop } from '@prisma/client'
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SideMenu } from '@/components/side-menu'

interface BarbershopInfoProps {
    barbershop: Barbershop
}

export function BarbershopInfo({ barbershop }: BarbershopInfoProps) {
    const router = useRouter()
    const handleBackCLick = () => {
        router.replace('/')
    }
    return (
        <div>
            <div className="relative h-[250px] w-full">
                <Button onClick={handleBackCLick} size="icon" variant="outline" className="absolute left-4 top-4 z-50">
                    <ChevronLeftIcon />
                </Button>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="absolute right-4 top-4 z-50 opacity-75">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-0">
                        <SideMenu />
                    </SheetContent>
                </Sheet>
                <Image src={barbershop.imageUrl} fill alt={barbershop.name} style={{ objectFit: 'cover' }} />
            </div>
            <div className="border-b border-solid border-secondary px-5 pb-6 pt-3">
                <div className="mx-auto max-w-5xl pl-2">
                    <h1 className="text-xl font-bold">{barbershop.name}</h1>
                    <div className="mt-2 flex items-center gap-1">
                        <MapPinIcon className="text-primary" size={18} />
                        <p className="text-sm">{barbershop.address}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                        <StarIcon className="text-primary" size={18} />
                        <p className="text-sm">5.0 (899 avaliações)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

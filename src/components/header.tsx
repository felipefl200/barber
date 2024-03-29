import Image from 'next/image'
import Logo from '../../public/barber.svg'
import { ToogleTheme } from './toogle-theme'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import { SideMenu } from './side-menu'
import Link from 'next/link'

export function Header() {
    return (
        <Card className="rounded-none">
            <CardContent className="mx-auto flex max-w-6xl items-center justify-between p-5">
                <div className="max-w-[160px]">
                    <Link href="/">
                        <Image src={Logo} width={400} height={160} alt="Logo" />
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <ToogleTheme />
                    <Button variant="outline" size="icon">
                        <Sheet>
                            <SheetTrigger asChild>
                                <MenuIcon />
                            </SheetTrigger>
                            <SheetContent className="p-0">
                                <SideMenu />
                            </SheetContent>
                        </Sheet>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

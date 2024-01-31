'use client'
import Image from 'next/image'
import Logo from '../../public/barber.svg'
import { ToogleTheme } from './toogle-theme'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon, UserIcon } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export function Header() {
    const { data, status } = useSession()
    const handleLoginClick = () => signIn('github')
    const handleLogoutClick = () => signOut()
    return (
        <Card className="rounded-none">
            <CardContent className="flex items-center justify-between p-5">
                <div className="max-w-[160px]">
                    <Image src={Logo} width={400} height={160} alt="Logo" />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <ToogleTheme />
                    <Button variant="outline" size="icon">
                        <Sheet>
                            <SheetTrigger asChild>
                                <MenuIcon />
                            </SheetTrigger>
                            <SheetContent className="p-0">
                                <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                {data?.user ? (
                                    <div className="flex items-center justify-between px-5 py-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={data.user.image ?? ''} />
                                            </Avatar>
                                            <h2 className="font-bold">{data.user.name}</h2>
                                        </div>
                                        <Button onClick={handleLogoutClick} variant="secondary" size="icon">
                                            <LogOutIcon />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3 px-5 py-6">
                                        <div className="flex gap-2">
                                            <UserIcon size={32} />
                                            <h2 className="font-bold">Olá, faça seu login!</h2>
                                        </div>
                                        <Button
                                            onClick={handleLoginClick}
                                            variant="secondary"
                                            className="w-full justify-start"
                                        >
                                            <GitHubLogoIcon className="mr-2 h-5 w-5" />
                                            Fazer login
                                        </Button>
                                    </div>
                                )}
                                <div className="flex flex-col gap-3 px-5">
                                    <Button variant="outline" className="justify-start" asChild>
                                        <Link href="/">
                                            <HomeIcon size={18} className="mr-2" />
                                            Inicio
                                        </Link>
                                    </Button>
                                    {data?.user && (
                                        <Button variant="outline" className="justify-start" asChild>
                                            <Link href="/bookings">
                                                <CalendarIcon size={18} className="mr-2" />
                                                Agendamentos
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

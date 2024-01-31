'use client'
import Link from 'next/link'
import { SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { CalendarIcon, HomeIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'

export function SideMenu() {
    const { data } = useSession()
    const handleLoginClick = () => signIn('github')
    const handleLogoutClick = () => signOut()
    return (
        <>
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
                    <Button onClick={handleLoginClick} variant="secondary" className="w-full justify-start">
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
        </>
    )
}

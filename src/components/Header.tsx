import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Logo from '../../public/barber.svg'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { ToogleTheme } from './toogle-theme'

export function Header() {
    return (
        <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div className='max-w-[160px]'>

                <Image src={Logo} width={400} height={160} alt="Logo" />
              </div>
                <div className="flex items-center justify-center gap-2">
                    <ToogleTheme />
                    <Button variant="outline" size="icon">
                        <HamburgerMenuIcon />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

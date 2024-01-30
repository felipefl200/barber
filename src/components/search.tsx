'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'

export function Search() {
    return (
        <div className="flex items-center justify-center gap-2">
            <Input placeholder="Busque por uma barbearia..." />
            <Button variant="default" size="icon">
                <SearchIcon />
            </Button>
        </div>
    )
}

'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    search: z
        .string({
            required_error: 'Campo obrigatório',
        })
        .min(1, 'Campo obrigatório')
        .trim(),
})

export function Search() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        },
    })

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(`/barbershops?search=${data.search}`)
    }

    return (
        <div className="flex justify-center gap-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full items-start gap-4">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input className="w-full" placeholder="Busque por uma barbearia..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="default" type="submit">
                        <SearchIcon />
                    </Button>
                </form>
            </Form>
        </div>
    )
}

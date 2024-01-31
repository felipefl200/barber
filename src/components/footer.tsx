import { Copyright } from 'lucide-react'
export function Footer() {
    return (
        <footer className="bottom-0 w-full bg-secondary px-5 py-6 opacity-75">
            <p className="text-xs-font-bold flex items-center justify-center gap-2 text-gray-400">
                <Copyright /> 2023 Copyright FFL Barber
            </p>
        </footer>
    )
}

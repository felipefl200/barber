export function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'full' }).format(date);
}

export function getDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(date)
}

export function getMonth(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date)
}

export function getHour(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(date)
}
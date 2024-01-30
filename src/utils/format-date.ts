export function formatDate(date: Date){
    return new Intl.DateTimeFormat('pt-BR', {timeZone: 'America/Sao_Paulo', dateStyle: 'full'}).format(date);
}
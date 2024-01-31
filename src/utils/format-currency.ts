export const formatCurrency = (value: string) => {
    return Intl.NumberFormat('pt-BR',
        { style: 'currency', currency: 'BRL' })
        .format(parseInt(value))
}
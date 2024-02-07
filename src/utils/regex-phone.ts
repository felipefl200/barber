// regex strip caracters ( ) - and strip white spaces
export const stripCaracters = (str: string) => {
    return str.replace(/[-() ]/g, '').replace(/\s/g, '')
}

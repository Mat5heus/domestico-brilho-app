
/**
 * Formata a url para ser acessivel acrescentando a parte que falta
 * @param url 
 * @returns um texto tipo `string`
 */
export function formatUrl(url: string) {
    const response = "https:/"+url
    return response
}


/**
 * Formata a string para ter a primeira capital em caixa alta e todo resto em `lowerCase()`
 * @param word 
 * @returns um frase no formato `string`.
 */
export function capitalize(word: string): string {
    const response = word.charAt(0).toUpperCase() + word.slice(1)
    return response
}
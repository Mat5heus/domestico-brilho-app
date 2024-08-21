
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

export function formatDesc(description: string, length: number) {
    let formatedText = description.slice(0, length)
    if(description.length > length) {
        if(formatedText[formatedText.length - 1] == " ") {
            formatedText = formatedText.slice(0, length - 1)
        }
        return  formatedText + "..."
    }
    return formatedText
}
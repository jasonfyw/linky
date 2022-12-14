/**
 * Formats URLs by appending http:// if http(s) prefix is not present
 * @param url string
 * @returns <url> with http:// prefix
 */
export const includeHTTP = (url: string): string => {
    if (!url.match(/^(http|https):\/\//)) {
        console.log('http://'.concat(url))
        return 'http://'.concat(url)
    }
    return url
}
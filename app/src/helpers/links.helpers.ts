export const includeHTTP = (url: string): string => {
    if (url.match(/^(http|https): \/\//)) {
        console.log('http://'.concat(url))
        return 'http://'.concat(url)
    }
    return url
}
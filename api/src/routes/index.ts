import { Request, Response, Router } from 'express';
import { customAlphabet } from 'nanoid';
import path from 'path';
import { ShortLink } from '../models/ShortLink';

const router = Router()

const isValidUrl = (s: string) => {
    try { return Boolean(new URL(s)) } catch (e) { return false }
}

const generator = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)


router.get('/', async (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../frontend_build/index.html'))
})


/**
 * Redirect if alias exists in database
 */
router.get('/:id', async (req: Request, res: Response) => {
    const id = req?.params?.id

    try {
        const url = await ShortLink.findOne({ alias: id })
        if (url) {
            return res.redirect(url.url)
        } else {
            res.status(404).send('This link does not exist')
        }
    } catch (error) {
        res.status(404).send('This link does not exist')
    }
})


/**
 * Add a new alias url pair to that database
 */
router.post('/new/', async (req: Request, res: Response) => {
    let { url } = req.body

    if (!url.match(/^https?:\/\//)) {
        url = 'http://'.concat(url)
    }

    try {
        if (isValidUrl(url)) {
            const alias = generator()
            const newShortLink = { alias, url }
            const shortLink = await ShortLink.create(newShortLink)
            res.status(200).send(shortLink)
        } else {
            res.status(400).send('Invalid URL')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

export { router }
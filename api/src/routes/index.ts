import { Request, Response, Router } from 'express';
import { ShortLink } from '../models/ShortLink';

const router = Router()

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

export { router }
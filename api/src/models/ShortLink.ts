import { Schema, model } from "mongoose";

interface IShortLink {
    alias: string,
    url: string
}

const shortLinkSchema = new Schema<IShortLink>({
    alias: {
        type: String,
        unique: true,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

export const ShortLink = model<IShortLink>('ShortLink', shortLinkSchema)
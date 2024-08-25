import type { DocumentData, Timestamp } from 'firebase/firestore'
import type { ProductData, UseProduct } from '~/types/Product'
import type { Links } from './Links'
 
export class Product implements UseProduct, ProductData, DocumentData {
    
    id: number
    name: string
    image: string
    desc: string
    videoDemo: string | undefined
    date: Timestamp
    links: Links
    likes: number | undefined

    constructor(id: number, name: string, image: string, desc: string, date: Timestamp, videoDemo: string | undefined, links: Links, likes: number | undefined = undefined) {
        this.id = id
        this.name = name
        this.image = image
        this.desc = desc
        this.date = date
        this.links = links
        this.likes = likes
        this.videoDemo = videoDemo
    }

    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getDesc() {
        return this.desc
    }

    public getDate() {
        return this.date
    }

    public getLinks() {
        return this.links
    }

    public getImage() {
        return formatUrl(this.image)
    }

    public getLikes() {
        return this.likes
    }

    public getVideoDemo() {
        return this.videoDemo
    }
}
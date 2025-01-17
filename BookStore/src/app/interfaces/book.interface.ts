export interface Book {
    id: number,
    title: string,
    description?: string,
    author?: string,
    price: number,
    star: number,
    image?: string,
    imageFile?: string,
}
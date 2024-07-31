import { Product } from "./product.model";

//  generate a mock product object with the required properties of the Product interface
export const mockProduct: Product = {
    id: 1,
    title: 'Playstation4',
    description: 'The PlayStation 4 is an eighth-generation home video game console developed by Sony Interactive Entertainment.',
    category: 'Gaming',
    price: 300,
    discountPercentage: 10,
    rating: 4.5,
    stock: 10,
    tags: ['gaming', 'console', 'playstation'],
    brand: 'Sony',
    sku: 'PS4-12345',
    weight: 2.5,
    dimensions: {
        width: 10,
        height: 5,
        depth: 2
    },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships within 24 hours',
    availabilityStatus: 'In Stock',
    reviews: [
        {
            rating: 5,
            comment: 'Great product!',
            date: new Date(),
            reviewerName: 'John Doe',
            reviewerEmail: 'jd@gmail.co'
        }
    ],
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    meta: {
        createdAt: new Date(),
        updatedAt: new Date(),
        barcode: '1234567890',
        qrCode: '1234567890'
    },
    thumbnail: 'https://via.placeholder.com/150',
    images: ['https://via.placeholder.com/150']
};
const ProductTypes = require('./api/productTypes')
const Products = require('./api/products')
const Testimonies = require('./api/testimonies')

class Api {
    constructor(app, prisma) {
        this.app = app;
        this.prisma = prisma;
        this.products = new Products(app, prisma);
        this.productTypes = new ProductTypes(app, prisma);
        this.testimonies = new Testimonies(app, prisma);
    }
}

module.exports = Api;
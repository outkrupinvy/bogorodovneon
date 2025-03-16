class ProductTypes {
    constructor(app, prisma) {
        const getAll = async (query) => {
            try {
                return await prisma.productType.findMany(query);
            } catch (e) {
                throw e;
            }
        };
        
        const create = async (payload) => {
            try {
                if (!payload.name) {
                    throw new Error('Required fields should be filled in');
                }

                const duplication = await prisma.productType.findFirst({ where: { name: payload.name }});
                if (duplication) {
                    throw new Error('This object already exists');
                }

                await prisma.productType.create({
                    data: {
                        published: false,
                        ...payload,
                    },
                });
            
                return { success: true };
            } catch (e) {
                throw e;
            }
        };
        
        const update = async (id, data) => {
            try {
                if (!id) {
                    throw new Error('Required object id');
                }
                await prisma.productType.update({
                    where: { id },
                    data,
                });
            
                return { success: true };
            } catch (e) {
                throw e;
            }
        };
        
        const remove = async (id) => {
            try {
                await prisma.productType.delete({ where: { id }, include: { products: true } });
                // await this.prisma.image.deleteMany({ where: { productId: body.id }});
            
                return { success: true };
            } catch (e) {
                throw e;
            }
        };
        this.getAll = getAll;
        this.create = create;
        this.update = update;
        this.remove = remove;

        app.get('/api/v1/product_types', async (req, res) => {
            try {
                const data = await getAll();
                res.status(200).json(data);
            } catch (e) {
                res.status(500).json({ error: e });
            }
        });
        app.post('/api/v1/product_types', async (req, res) => {
            try {
                const data = await create(req.body);
                res.status(200).json(data);
            } catch (e) {
                res.status(500).json({ error: e });
            }
        });
        app.put('/api/v1/product_types/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const data = await update(id, req.body);
                res.status(200).json(data);
            } catch (e) {
                res.status(500).json({ error: e });
            }
        });
        app.delete('/api/v1/product_types/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const data = await update(id);
                res.status(200).json(data);
            } catch (e) {
                res.status(500).json({ error: e });
            }
        });
    }
}

module.exports = ProductTypes;

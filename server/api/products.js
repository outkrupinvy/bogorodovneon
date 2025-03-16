class Products {
    constructor(app, prisma) {
        const getAll = async (where) => {
            try {
                const query = where ? { where } : undefined;
                return await prisma.product.findMany({
                    ...query,
                    include: {
                        images: true,
                    },
                    orderBy: [{ created_at: 'desc' }]
                });
            } catch (e) {
                throw e;
            }
        };
        
        const create = async ({ typeId, description, price, images }) => {
            try {
                if (
                    !typeId || !description || !price ||
                    !images || images.length === 0
                ) {
                    throw new Error('Required fields should be filled in');
                }

                await prisma.product.create({
                    data: {
                        published: false,
                        description,
                        price,
                        images: {
                            createMany: {
                                data: images.map((content) => ({ content }))
                            }
                        },
                        type: {
                            connect: {
                                id: typeId,
                            }
                        }
                    },
                });
            
                return { success: true };
            } catch (e) {
                throw e;
            }
        };
        
        const update = async (id, { published = false, description, price, images }) => {
            try {
                if (!id) {
                    throw new Error('Required object id');
                }
                await prisma.image.deleteMany({ where: { productId: id } });
                await prisma.product.update({
                    where: { id },
                    data: {
                        published,
                        description,
                        price,
                        images: {
                            createMany: {
                                data: images.map((content) => ({ content }))
                            }
                        },
                    },
                });
            
                return { success: true };
            } catch (e) {
                throw e;
            }
        };
        
        const remove = async (id) => {
            try {
                await prisma.image.deleteMany({ where: { productId: id } });
                await prisma.product.delete({ where: { id } });
            
                return { success: true };
            } catch (e) {
                throw e;
            }
        };
        
        const publish = async (id) => {
            try {
                const query = { published: false };
                if (id) {
                    query.id = id;
                }
                await prisma.product.updateMany({
                    where: query,
                    data: {
                        published: true,
                    },
                });
            
                return { success: true };
            } catch (e) {
                throw e;
            }
        };

        this.getAll = getAll;
        this.create = create;
        this.update = update;
        this.remove = remove;
        this.publish = publish;

        app.get('/api/v1/products', async (req, res) => {
            try {
                const data = await getAll();
                res.status(200).json(data);
            } catch (e) {
                res.status(500).json({ error: e });
            }
        });

        app.get('/api/v1/products/publish/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const data = await publish(Number(id));
                res.status(200).json(data);
            } catch (e) {
                console.dir(e)
                res.status(500).json({ error: e });
            }
        });
        app.post('/api/v1/products', async (req, res) => {
            try {
                const data = await create(req.body);
                res.status(200).json(data);
            } catch (e) {
                res.status(500).json({ error: e });
            }
        });
        app.put('/api/v1/products/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const data = await update(Number(id), req.body);
                res.status(200).json(data);
            } catch (e) {
                res.status(500).json({ error: e });
            }
        });
        app.delete('/api/v1/products/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const data = await remove(Number(id));
                res.status(200).json(data);
            } catch (e) {
                console.dir(e)
                res.status(500).json({ error: e });
            }
        });
    }
}

module.exports = Products;

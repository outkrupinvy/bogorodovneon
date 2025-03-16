const fs = require('fs');
const path = require('path');

class SSR {
    orderMock = [{
        id: 'name',
        title: 'Какая вывеска вам нужна?',
        common: true,
        view: 'with_img',
        options: [
            { id: 'letter', name: 'Объемные буквы', img: '/img/products_neon_img.png' },
            { id: 'panel', name: 'Панель-кронштейн', img: '/img/products_neon_img.png' },
            { id: 'box', name: 'Световой короб', img: '/img/products_neon_img.png' },
            { id: 'neon', name: 'Неоновая вывеска', img: '/img/products_neon_img.png' },
            { id: 'table', name: 'Табличка', img: '/img/products_neon_img.png' },
        ],
    }, {
        letter: {
            id: 'type',
            title: 'Выберите тип свечения букв',
            options: [
                { id: 'letter_type_1', name: 'Лицевое свечение', label: 'Хит продаж', img: '/img/products_neon_img.png' },
                { id: 'letter_type_2', name: 'Контражур', img: '/img/products_neon_img.png' },
                { id: 'letter_type_3', name: 'Лицевое + контражур', img: '/img/products_neon_img.png' },
                { id: 'letter_type_4', name: 'Без подсветки (плоские)', img: '/img/products_neon_img.png' },
            ],
        },
        panel: {
            id: 'form',
            title: 'Выберите форму панели-кронштейна',
            options: [
                { id: 'panel_form_1', name: 'Круглая', img: '/img/products_neon_img.png' },
                { id: 'panel_form_2', name: 'Квадратная', img: '/img/products_neon_img.png' },
                { id: 'panel_form_3', name: 'Нестандартная', img: '/img/products_neon_img.png' },
            ],
        },
        box: {
            id: 'form',
            title: 'Выберите форму светового короба',
            options: [
                { id: 'box_form_1', name: 'Круглая', img: '/img/products_neon_img.png' },
                { id: 'box_form_2', name: 'Квадратная', img: '/img/products_neon_img.png' },
                { id: 'box_form_3', name: 'Нестандартная', img: '/img/products_neon_img.png' },
                { id: 'box_form_4', name: 'Инкрустация', img: '/img/products_neon_img.png' },
            ],
        },
        neon: {
            id: 'content',
            title: 'Что будет на вывеске?',
            options: [
                { id: 'neon_content_1', name: 'Текст', img: '/img/products_neon_img.png' },
                { id: 'neon_content_2', name: 'Изображение', img: '/img/products_neon_img.png' },
                { id: 'neon_content_3', name: 'Текст + изображение', img: '/img/products_neon_img.png' },
            ],
        },
        table: {
            id: 'type',
            title: 'Какая будет табличка?',
            options: [
                { id: 'table_type_1', name: 'Световая', img: '/img/products_neon_img.png' },
                { id: 'table_type_2', name: 'Не световая', img: '/img/products_neon_img.png' },
            ],
        },
    }, {
        letter: {
            id: 'content',
            title: 'Что будет на вывеске?',
            options: [
                { id: 'letter_content_1', name: 'Текст', img: '/img/products_neon_img.png' },
                { id: 'letter_content_2', name: 'Лого', img: '/img/products_neon_img.png' },
                { id: 'letter_content_3', name: 'Текст + лого', img: '/img/products_neon_img.png' },
            ],
        },
        panel: {
            id: 'size',
            title: 'Выберите размер',
            options: [
                { id: 'panel_size_1', name: 'Маленький', description: 'От 30 х 30 см' },
                { id: 'panel_size_2', name: 'Средний', description: 'От 50 х 50 см' },
                { id: 'panel_size_3', name: 'Большой', description: 'От 70 х 70 см' },
            ],
        },
        box: {
            id: 'size',
            title: 'Выберите размер',
            options: [
                { id: 'box_size_1', name: 'Маленький', description: 'От 30 х 30 см' },
                { id: 'box_size_2', name: 'Средний', description: 'От 50 х 50 см' },
                { id: 'box_size_3', name: 'Большой', description: 'От 70 х 70 см' },
            ],
        },
        neon: {
            id: 'size',
            title: 'Выберите размер',
            options: [
                { id: 'neon_size_1', name: 'Маленький', description: 'От 30 х 30 см' },
                { id: 'neon_size_2', name: 'Средний', description: 'От 50 х 50 см' },
                { id: 'neon_size_3', name: 'Большой', description: 'От 100 х 100 см' },
                { id: 'neon_size_4', name: 'Огромный', description: 'От 250 х 250 см' },
            ],
        },
        table: {
            id: 'material',
            title: 'Выберите материал',
            options: [
                { id: 'table_material_1', name: 'ПВХ - пластик', label: 'Дешевый', img: '/img/products_neon_img.png' },
                { id: 'table_material_2', name: 'Акрил прозрачный', img: '/img/products_neon_img.png' },
                { id: 'table_material_3', name: 'Буквы из акрила', img: '/img/products_neon_img.png' },
            ],
        },
    }, {
        id: 'additions',
        title: 'Вам нужны дополнительные услуги?',
        common: true,
        options: [
            { id: 'additions_1', name: 'Дизайн макета', description: 'бесплатно' },
            { id: 'additions_2', name: 'Монтаж', description: 'доставка бесплатно' },
            { id: 'additions_3', name: 'Дизайн + монтаж', description: 'дизайн и доставка бесплатно' },
            { id: 'additions_4', name: 'Нет, не нужны доп. услуги', description: null },
        ],
    }, {
        id: 'present',
        title: 'Выберите подарок',
        common: true,
        options: [
            { id: 'present_1', name: 'Скидка на вывеску 10%', label: 'Дешевый', img: '/img/products_neon_img.png' },
            { id: 'present_2', name: 'Табличка Режим работы + наклейка от Яндекса', img: '/img/products_neon_img.png' },
            { id: 'present_3', name: 'Скидка на монтаж 15%', description: 'доставка бесплатно', img: '/img/products_neon_img.png' },
        ],
    }];

    constructor(app, prisma, api) {
        this.app = app;
        this.prisma = prisma;
        this.api = api;
    }

    aboutSetup = async (req, res) => {
        const data = await this.api.testimonies.getAll({
            published: true,
        });

        res.render('about', {
            title: 'Bogorodovneon | О нас',
            data,
        });
    }

    productsSetup = async (req, res) => {
        const [
            neon,
            letters,
            cubes,
            tables,
            print,
            uncommon,
        ] = await this.api.productTypes.getAll({
            include: {
                products: {
                    where: { published: true },
                    include: {
                        images: true,
                    }
                },
            },
        });

        const data = {
            neon,
            letters,
            cubes,
            tables,
            print,
            uncommon,
        };

        res.render('products', {
            title: 'Bogorodovneon | Наши работы',
            data,
        });
    }

    orderSetup(req, res) {
        res.render('order', {
            title: 'title',
            renderData: orderMock[0],
            questionsCount: orderMock.length,
            data: JSON.stringify(orderMock),
        });
    }

    adminProductTypesSetup = async (req, res) => {
        const data = await this.api.productTypes.getAll();
        res.render('admin/product_types', {
            title: 'Типы изделий',
            data,
        });
    }

    adminProductsSetup = async (req, res) => {
        const productTypes = await this.api.productTypes.getAll();
        if (!productTypes.length) {
            return res.redirect(301, '/admin/product_types');
        }

        const typeId = req.query.typeId ? Number(req.query.typeId) : productTypes[0].id;
        const data = await this.api.products.getAll({ productTypeId: typeId });
        res.render('admin/products', {
            title: `Изделия (${productTypes.find(({ id }) => id === typeId)?.name})`,
            productTypes,
            data,
            typeId,
        });
    }

    adminProductsNewSetup = async (req, res) => {
        const productTypes = await this.api.productTypes.getAll();
        if (!productTypes.length) {
            return res.redirect(301, '/admin/product_types');
        }

        const typeId = req.query.typeId ? Number(req.query.typeId) : productTypes[0].id;
        const data = {
            typeId,
        };
        res.render('admin/products/form', {
            title: 'Cоздание изделия',
            data,
        });
    }

    adminProductsEditSetup = async (req, res) => {
        const id = Number(req.params.productId);
        if (!id) {
            return res.redirect(301, '/admin/product_types');
        }

        const [data] = await this.api.products.getAll({ id });
        if (!data) {
            return res.redirect(301, '/admin/product_types');
        }

        data.typeId = data.productTypeId;
        data.json = JSON.stringify(data);

        res.render('admin/products/form', {
            title: `Редактирование изделия ${data.name}`,
            data,
        });
    }

    adminTestimoniesSetup = async (req, res) => {
        const data = await this.api.testimonies.getAll();
        res.render('admin/testimonies', {
            title: 'Отзывы',
            data,
        });
    }

    adminTestimoniesNewSetup = async (req, res) => {
        const data = {};
        res.render('admin/testimonies/form', {
            title: 'Cоздание отзыва',
            data,
        });
    }

    adminTestimoniesEditSetup = async (req, res) => {
        const id = Number(req.params.testimonyId);
        if (!id) {
            return res.redirect(301, '/admin/testimonies');
        }

        const [data] = await this.api.testimonies.getAll({ id });
        if (!data) {
            return res.redirect(301, '/admin/testimonies');
        }

        data.json = JSON.stringify(data);

        res.render('admin/testimonies/form', {
            title: 'Редактирование отзыва',
            data,
        });
    }

    setup() {
        this.app.get('/', (req, res) => {
            res.render('index', { title: 'Bogorodovneon | Главная' });
        });
    
        this.app.get('/about', this.aboutSetup);
    
        // this.app.get('/blog', (req, res) => {
        //     res.render('blog', { title: 'Bogorodovneon | Блог' });
        // });
    
        this.app.get('/contacts', (req, res) => {
            res.render('contacts', { title: 'Bogorodovneon | Контакты' });
        });
    
        this.app.get('/info', (req, res) => {
            res.render('info', { title: 'Bogorodovneon | Клиентам' });
        });
    
        this.app.get('/products', this.productsSetup);
    
        this.app.get('/questions', (req, res) => {
            res.render('questions', { title: 'title' });
        });
    
        this.app.get('/services', (req, res) => {
            res.render('services', { title: 'Bogorodovneon | FAQ' });
        });
    
        this.app.get('/tou', (req, res) => {
            const filePath = 'assets/pdf/tou.pdf';
            
            // Проверяем существование файла
            if (fs.existsSync(filePath)) {
              // Устанавливаем заголовки
              res.setHeader('Content-Type', 'application/pdf');
              res.setHeader('Content-Disposition', `inline; filename="tou.pdf"`);
              
              // Отправляем файл
              const fileStream = fs.createReadStream(filePath);
              fileStream.pipe(res);
            } else {
              res.status(404).send('Файл не найден');
            }
        })
    
        // this.app.get('/order', this.orderSetup);
    
        this.app.get('/admin', (req, res) => {
            return res.redirect(301, '/admin/product_types');
        });
        this.app.get('/admin/product_types', this.adminProductTypesSetup);
        this.app.get('/admin/products', this.adminProductsSetup);
        this.app.get('/admin/products/new', this.adminProductsNewSetup);
        this.app.get('/admin/products/:productId', this.adminProductsEditSetup);
        this.app.get('/admin/testimonies', this.adminTestimoniesSetup);
        this.app.get('/admin/testimonies/new', this.adminTestimoniesNewSetup);
        this.app.get('/admin/testimonies/:testimonyId', this.adminTestimoniesEditSetup);
    }

}

module.exports = SSR;

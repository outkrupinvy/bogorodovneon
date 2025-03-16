const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const defaultProductTypes = [
  'Неоновые вывески',
  'Объемные буквы',
  'Световые кубы',
  'Таблички',
  'Печать',
  'Нестандартные изделия',
]

async function main() {
  console.log('Стартуем заполнение БД');
  await new Promise((resolve) => {
    defaultProductTypes.forEach((name, index, arr) => {
      // Timeout используется для гарантии порядка заполнения
      setTimeout(async () => {
        await prisma.productType.upsert({
          where: { name },
          update: {},
          create: {
            name,
            published: true
          },
        });
        console.log(`Создается тип изделия ${name}`);
        if (arr.length - 1 === index) {
          resolve();
        }
      }, index * 300);
    });
  });

  console.log('Заполняю личные данные мастера');
  await prisma.master.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Владислав Богородов',
      // display as +7 952 981 39 98
      phone_number: '+79529813998',
      telegram: 'https://t.me/Bogorodov_Neon',
      whatsapp: 'https://api.whatsapp.com/send?phone=79529813998',
      vk: 'http://vk.com/bogorodov.neon',
      youtube: 'https://youtube.com/@bogorodov_neon',
      address: '',
      workdays: '',
      worktime: '',
      geomark: '',
      main_video: 'https://youtube.com/shorts/9wcfpmmGinQ?si=4yEJkR56xHOu23AQ',
    },
  });
}

main()
  .then(async () => {
    productTypesCount = await prisma.productType.count();
    console.log(`Итого типов изделий в БД: ${productTypesCount}`);
    await prisma.$disconnect()
    console.log('Закончили заполнение БД');
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
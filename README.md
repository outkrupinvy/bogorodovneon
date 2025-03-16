* Для локальной разработки поднимаем бд в докере с помощью команды *
docker run --name db -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mydb -v postgres_data:/var/lib/postgresql/data -d postgres

* Инструкция по поднятию приложения и деплою *
https://habr.com/ru/companies/timeweb/articles/858094/

* Документация Prisma *
https://my-js.org/docs/guide/prisma/

npx prisma migrate dev --name init

Чтобы добавить некие стартовые данные в БД, нужно их создать в файле prisma.seed.js
Затем запустить команду npx prisma db seed
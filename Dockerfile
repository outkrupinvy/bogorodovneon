# образ
FROM node:22.14.0

# рабочая директория
WORKDIR .
# копируем указанные файлы в корень контейнера
COPY package.json package-lock.json ./
# устанавливаем зависимости
RUN npm install
# копируем остальные файлы в корень контейнера
COPY . .
# устанавливаем переменную
ENV NODE_ENV=production

# выставляем порт
EXPOSE 3000
# запускаем приложение
CMD ["npm", "start"]
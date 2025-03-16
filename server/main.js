const express = require('express');
const path = require('path');
const SSR = require('./ssr');
const Api = require('./api');
const { PrismaClient } = require('@prisma/client');

const app = express();

const prisma = new PrismaClient();
const port = 3000;

async function main() {
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

  // Set EJS as the template engine
  app.set('view engine', 'ejs');
  
  // Set the views directory
  app.set('views', path.join(__dirname, '../views'));
  
  app.use('/styles', express.static('styles'));
  
  app.use('/img', express.static('assets/img'));

  const api = new Api(app, prisma);
  const ssr = new SSR(app, prisma, api);
  ssr.setup();

  // Catch unregistered routes
  app.all("*", (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});

module.exports = {
    prisma,
}

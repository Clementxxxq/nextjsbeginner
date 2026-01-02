1. Install Prisma and initialize the project.
    npm install prisma @prisma/client
    npx prisma init


Configure the Prisma Cloud database

Define the data model (Prisma schema)

# Run this in your terminal to migrate your database
npx prisma migrate dev --name init

# Run this in your terminal to generate your Prisma Client
npx prisma generate

Modify the table header
npx prisma migrate dev --name add-contact

Create API routes in Next.js and test database CRUD operations

Further implement front-end features such as input fields and list displays.
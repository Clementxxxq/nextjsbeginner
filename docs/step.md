1. Install Prisma and initialize the project.
    npm install prisma @prisma/client
    npx prisma init


配置数据库Prisma Cloud

定义数据模型（Prisma schema）


# Run this in your terminal to migrate your database
npx prisma migrate dev --name init

# Run this in your terminal to generate your Prisma Client
npx prisma generate



在 Next.js 中创建 API 路由，测试数据库增删改查

再做前端输入框、列表展示等
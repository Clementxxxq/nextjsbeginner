## 安装并初始化Prisma
# 安装Prisma的工具和客户端
npm install prisma tsx --save-dev
npm install @prisma/extension-accelerate @prisma/client dotenv

# 运行初始化命令
npx prisma init --db --output ../app/generated/prisma

会在项目里生成 prisma/目录 schema.prisma和.env文件 准备好prisma client 的输出目录（例如app/generated/prisma）

## 定义数据库模型
打开 prisma/schema.prisma，写入你要的数据模型。比如：
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id      Int    @id @default(autoincrement())
  title   String
  content String?
}
这一步是你数据库结构的“蓝图”。

## 配置和生成 Prisma Client

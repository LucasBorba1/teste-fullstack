import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
    if (params.model === "User" && params.action === "delete") {
        return prisma.user.update({
            where: { id: Number(params.args.where.id)},
            data: {deleted_at: new Date()}
        });
    }
    return next(params);
})

export { prisma };
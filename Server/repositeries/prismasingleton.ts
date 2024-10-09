import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
    private static prisma: PrismaClient;

    public static getInstance(): PrismaClient {
        if (!PrismaSingleton.prisma) {
            PrismaSingleton.prisma = new PrismaClient();
        }
        return PrismaSingleton.prisma;
    }
}

export { PrismaSingleton };
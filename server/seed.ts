import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const username = 'admin';
    const password = 'password123'; // Change this in production!
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.admin.upsert({
        where: { username },
        update: {
            role: 'ADMIN',
            name: 'Sistem Yöneticisi'
        },
        create: {
            username,
            password: hashedPassword,
            role: 'ADMIN',
            name: 'Sistem Yöneticisi'
        },
    });

    console.log(`Admin user created: ${user.username}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

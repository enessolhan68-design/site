import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.admin.findUnique({
        where: { username: 'admin' },
    });

    if (user) {
        console.log('Admin user found:', user.username);
        console.log('Password hash length:', user.password.length);
    } else {
        console.log('Admin user NOT found');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

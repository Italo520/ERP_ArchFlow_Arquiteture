import 'dotenv/config'
import { PrismaClient, ClientStatus, ActivityType, ActivityStatus } from '@prisma/client'
import { hash } from 'bcryptjs'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) {
    console.error('DATABASE_URL is not defined')
    process.exit(1)
}

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding (v2) ...')

    // Explicitly check connection
    try {
        await prisma.$connect()
    } catch (e) {
        console.error('Connection failed', e)
        throw e
    }

    // Cleanup
    const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    console.log('Cleaning up...')
    // Simple deleteMany for now
    try {
        await prisma.activity.deleteMany()
        await prisma.timeLog.deleteMany()
        await prisma.deliverable.deleteMany()
        await prisma.projectMember.deleteMany()
        await prisma.task.deleteMany()
        await prisma.stage.deleteMany()
        await prisma.budget.deleteMany()
        await prisma.estimate.deleteMany()
        await prisma.project.deleteMany()
        await prisma.client.deleteMany()
        await prisma.user.deleteMany()
    } catch (e) {
        console.log('Cleanup error (might be empty tables):', e)
    }

    // 1. Create Users
    const passwordHash = await hash('password123', 10)

    const admin = await prisma.user.create({
        data: {
            fullName: 'Admin User',
            email: 'admin@archflow.local',
            passwordHash,
        }
    })

    const architect = await prisma.user.create({
        data: {
            fullName: 'Senior Architect',
            email: 'architect@archflow.local',
            passwordHash,
        }
    })

    // 2. Client
    const clientAlpha = await prisma.client.create({
        data: {
            name: 'Alpha Construction',
            email: 'contact@alpha.com',
            document: '12345678000199',
            status: ClientStatus.ACTIVE,
            userId: architect.id,
        }
    })

    // 3. Project
    const project1 = await prisma.project.create({
        data: {
            name: 'Alpha HQ Renovation',
            status: 'IN_PROGRESS',
            ownerId: architect.id,
            clientId: clientAlpha.id,
            projectType: 'COMMERCIAL',
        }
    })

    console.log('Seeding finished successfully.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

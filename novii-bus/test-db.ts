// Test koneksi database Neon
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('❌ DATABASE_URL not found in environment variables')
  process.exit(1)
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({
  adapter,
  log: ['query', 'error', 'warn'],
})

async function testConnection() {
  console.log('🔍 Testing database connection...')
  
  try {
    // Test 1: Raw query
    const result = await prisma.$queryRaw`SELECT version()`
    console.log('✅ Database connected successfully!')
    console.log('📊 PostgreSQL version:', result)

    // Test 2: Check tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('\n📋 Tables in database:', tables)

    // Test 3: Count routes (if table exists)
    try {
      const routeCount = await prisma.route.count()
      console.log('\n🚌 Routes in database:', routeCount)
    } catch (e) {
      console.log('\n⚠️  Route table not found. Need to run migrations!')
    }

  } catch (error) {
    console.error('❌ Database connection failed!')
    console.error('Error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

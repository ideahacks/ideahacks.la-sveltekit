// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import partData from "../src/lib/data.json" assert { type: "json" }

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  for (const p of partData) {
    const part = await prisma.part.create({
      data: {
        name: p.name,
        quantity: p.quantity,
      }
    })
    console.log(`Created part with id: ${part.id}`)
  }
  console.log(`Seeding finished.`)
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
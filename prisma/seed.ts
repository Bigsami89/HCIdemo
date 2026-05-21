// prisma/seed.ts
import { PrismaClient } from '../lib/generated/prisma/client'
// Import your mock data (make sure the path is correct based on where seed.ts is located)
import 'dotenv/config'
import { PrismaPg } from "@prisma/adapter-pg";
import path from 'path';

// Importa tus datos usando la ruta absoluta correcta basada en el archivo actual
const mockDataPath = path.resolve(__dirname, '../lib/mock-data');
const { courses } = require(mockDataPath);

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
  })

async function main() {
  console.log('Start seeding courses...')

  for (const course of courses) {
    const courseData = {
      title: course.title,
      subtitle: course.subtitle,
      category: course.category,
      duration: course.duration,
      modality: course.modality,
      sessions: course.sessions,
      price: course.price,
      rating: course.rating,
      students: course.students,
      instructor: course.instructor,
      instructorTitle: course.instructorTitle,
      level: course.level,
      tags: course.tags,
      description: course.description,
      objectives: course.objectives,
      syllabus: course.syllabus, // This will be stored as JSON in Postgres
      startDate: course.startDate,
      schedule: course.schedule,
      image: course.image,
      featured: course.featured || false,
      badge: course.badge || null,
    }

    // Upsert avoids duplicate key errors if you run the script multiple times
    const createdCourse = await prisma.curso.upsert({
      where: { id: course.id },
      update: courseData,
      create: {
        id: course.id,
        ...courseData
      },
    })
    console.log(`✅ Upserted course: ${createdCourse.title}`)
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
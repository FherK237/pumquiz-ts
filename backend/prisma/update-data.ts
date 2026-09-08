import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🔄 Iniciando corrección de trivias...');

  // // 1. Unificar categorías (Actualización Masiva)
  // // Ejemplo: Convertir todo lo que diga "Conocimiento General" o "Historia" a "Cultura General"
  // const categoriasAUnificar = ['Cultura General'];

  // const unificacion = await prisma.trivia.updateMany({
  //   where: {
  //     category: { in: categoriasAUnificar },
  //   },
  //   data: {
  //     category: 'Conocimiento General', // La categoría final que quieres que tengan
  //   },
  // });
  // console.log(`✅ Categorías unificadas: ${unificacion.count} trivias actualizadas a "Conocimiento General".`);

  // 2. Corregir títulos o mayúsculas (Actualización Específica)
  // Primero buscamos la trivia por su título actual (con el error)
  const triviaAEditar = await prisma.trivia.findFirst({
    where: { title: 'Marketing Digital y Web' }, // Pon aquí el texto exactamente como está en la BD
  });

  if (triviaAEditar) {
    // Si la encuentra, la actualizamos usando su ID
    await prisma.trivia.update({
      where: { id: triviaAEditar.id },
      data: {
        title: 'Marketing Digital y Web', // Título corregido
        category: 'Marketing', // También puedes aprovechar para cambiar su categoría aquí
      },
    });
    console.log(`✅ Trivia corregida: Ahora se llama "Cultura General 1".`);
  } else {
    console.log(`⚠️ No se encontró la trivia para corregir el título.`);
  }

  console.log('🎉 Correcciones terminadas!');
}

main()
  .catch((e) => {
    console.error('❌ Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
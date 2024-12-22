// scripts/updatePositions.ts

import prisma from '../prisma/client';


async function main() {
  const images = await prisma.image.findMany({
    orderBy: { createdAt: 'asc' },
  });

  for (let i = 0; i < images.length; i++) {
    await prisma.image.update({
      where: { id: images[i].id },
      data: { position: i },
    });
  }

  console.log('Positions mises à jour avec succès.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

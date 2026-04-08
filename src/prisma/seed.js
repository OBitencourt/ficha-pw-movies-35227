import prisma from "./prismaClient.js";

async function main() {
  const director1 = await prisma.director.create({
    data: {
      name: "Christopher Nolan",
      birthYear: 1970
    }
  });

  const director2 = await prisma.director.create({
    data: {
      name: "Quentin Tarantino",
      birthYear: 1963
    }
  });

  await prisma.movie.createMany({
    data: [
      {
        title: "Inception",
        releaseYear: 2010,
        directorId: director1.id
      },
      {
        title: "Interstellar",
        releaseYear: 2014,
        directorId: director1.id
      },
      {
        title: "Pulp Fiction",
        releaseYear: 1994,
        directorId: director2.id
      }
    ]
  });

  console.log("✅ Seed executado com sucesso");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
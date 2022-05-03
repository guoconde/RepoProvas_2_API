import { prisma } from "../database.js";

async function getTestsByDiscipline(search: string) {
  return prisma.term.findMany({
    include: {
      disciplines: {
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers(search: string) {
  return prisma.teacherDiscipline.findMany({
    where: {
      teacher: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    },
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
};

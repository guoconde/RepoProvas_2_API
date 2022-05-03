import testRepository from "../repositories/testRepository.js";

interface Filter {
  groupBy: "disciplines" | "teachers";
}

async function find(filter: Filter, search: string) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline(search);
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers(search);
  }
}

export default {
  find,
};

import { Categories } from "@/interfaces/Categories";
import getSolvesMetrics from "./getSolvesMetrics";
import prettyMilliseconds from "pretty-ms";
import { Cube } from "@/interfaces/Cube";

/**
 * Calculates the total time spent for different solve sets (global, session, cubeSession, cubeAll) of a specific cube.
 * @param {Categories} category - The category of the cube solves.
 * @param {string} cubeName - The name of the cube.
 * @returns {StatisticS} The total time spent for global, session, cubeSession, and cubeAll.
 */
export default function calcTimeSpentStatistics({
  cubesDB,
  category,
  cubeName,
}: {
  cubesDB: Cube[] | null;
  category: Categories;
  cubeName: string;
}): StatisticS {
  // Get solve metrics for global, session, cubeSession, and cubeAll
  const solveMetrics = getSolvesMetrics({ cubesDB, category, cubeName });

  // Calculate the total time spent for each solve set
  const global = solveMetrics.global.reduce(
    (total, acc) => total + acc.time,
    0
  );
  const session = solveMetrics.session.reduce(
    (total, acc) => total + acc.time,
    0
  );
  const cubeSession = solveMetrics.cubeSession.reduce(
    (total, acc) => total + acc.time,
    0
  );
  const cubeAll = solveMetrics.cubeAll.reduce(
    (total, acc) => total + acc.time,
    0
  );

  // Format the total time spent using prettyMilliseconds
  return {
    global: prettyMilliseconds(global),
    session: prettyMilliseconds(session),
    cubeAll: prettyMilliseconds(cubeAll),
    cubeSession: prettyMilliseconds(cubeSession),
  };
}

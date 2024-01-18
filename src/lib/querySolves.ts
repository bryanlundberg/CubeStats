import { Solve } from "@/interfaces/Solve";
import formatTime from "./formatTime";
import { sort } from "fast-sort";
import { Cube } from "@/interfaces/Cube";

/**
 * Searches for solves in a specific cube based on the provided query and tab.
 * @param {Object} options - Options for the search.
 * @param {string} options.query - The search query.
 * @param {string | null} options.cubeId - The ID of the cube to search in.
 * @param {"Session" | "All"} options.currentTab - The current tab (Session or All).
 * @param {boolean} [options.sortByTime=false] - Whether to sort the results by time.
 * @returns {Solve[] | null} An array of solves or null if the cube is not found.
 */
export default function querySolves({
  query,
  selectedCube,
  currentTab,
  sortByTime = false,
}: {
  query: string;
  selectedCube: Cube | null;
  currentTab: "Session" | "All";
  sortByTime?: boolean;
}): Solve[] | null {
  if (!selectedCube) return null;

  let solves = null;

  if (currentTab === "Session") {
    solves = selectedCube.solves.session.filter((u) =>
      formatTime(u.time).includes(query)
    );
  } else if (currentTab === "All") {
    solves = selectedCube.solves.all.filter((u) =>
      formatTime(u.time).includes(query)
    );
  }

  if (!solves) return null;

  if (sortByTime) {
    solves = sort(solves).asc((u) => u.time);
  } else {
    solves = sort(solves).desc((u) => u.endTime);
  }

  return solves;
}

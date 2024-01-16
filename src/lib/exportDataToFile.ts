import { formatISO9075 } from "date-fns";

const OUTPUT_FILE_NAME = `Backup-NT-${formatISO9075(new Date(Date.now()))}`;

/**
 * Exports the cube data to a JSON file and initiates a download.
 */
export default function exportDataToFile(): void {
  /**
   * Load the list of cubes.
   * @type {Cube[] | null}
   */
  const cubes = loadCubes();

  // If there are no cubes, return early.
  if (!cubes) return;

  /**
   * Stringify the cubes with a formatted JSON structure.
   * @type {string}
   */
  const stringifiedCubes = JSON.stringify(cubes, null, 2);

  /**
   * Create a Blob with the stringified cubes.
   * @type {Blob}
   */
  const blob = new Blob([stringifiedCubes], { type: "text/plain" });

  /**
   * Create a URL for the Blob.
   * @type {string}
   */
  const url = URL.createObjectURL(blob);

  /**
   * Create a link element to trigger the download.
   * @type {HTMLAnchorElement}
   */
  const a = document.createElement("a");
  a.href = url;
  a.download = OUTPUT_FILE_NAME;

  // Simulate a click on the link to start the download.
  a.click();

  // Revoke the URL to free up resources.
  URL.revokeObjectURL(url);
}

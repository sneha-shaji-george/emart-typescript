import { BASE_URL } from "../../Utils/constants";

/**
 * Function to fetch data from remote server
 * @param {string} fileName Filename of JSON data
 * @returns Promise with data
 */
async function getData(fileName:string) {
  const response = await fetch(`${BASE_URL}/${fileName}`);
  const data = await response.json();
  return data;
}

export default getData;

import axios from "axios";
const URL = "https://opentdb.com/api.php?amount=10";

async function fetchDataFromAPI(url) {
  const url = "https://opentdb.com/api.php?amount=10";

  try {
    const response = await axios.get(url);
    return response.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export const loadAndTransformQuestions = async (req, res, next) => {
    const fetchedQuestions = await fetchDataFromAPI(url)
}


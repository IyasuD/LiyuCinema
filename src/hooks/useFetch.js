import { useState, useEffect } from "react";
import AWS from "aws-sdk";

// export const useFetch = (apiPath, queryTerm = "") => {
//   const [data, setData] = useState([]);

//   const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${process.env.REACT_APP_API_KEY}&query=${queryTerm}`;
//   useEffect(() => {
//     async function fetchMovies() {
//       const response = await fetch(url);
//       const json = await response.json();
//       setData(json.results);
//     }
//     fetchMovies();
//   }, [url]);

//   return { data };
// };
export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const getApiKey = async () => {
      const secretsManager = new AWS.SecretsManager({
        region: "us-east-1",
      });

      try {
        const secretData = await secretsManager
          .getSecretValue({ SecretId: "react_app_Secrete" })
          .promise();
        const apiKey = JSON.parse(secretData.SecretString).api_key; // Adjust the property name based on your secret structure
        setApiKey(apiKey);
      } catch (error) {
        console.error("Error retrieving API key:", error);
      }
    };

    getApiKey();
  }, []);

  const fetchApiData = useCallback(async () => {
    try {
      if (!apiKey) return; // Wait for the API key to be available before making the fetch call

      const encodedApiKey = encodeURIComponent(apiKey);
      const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${encodedApiKey}&query=${queryTerm}`;

      const response = await fetch(url);
      const json = await response.json();
      console.log("API Response:", json);
      setData(json.results);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  }, [apiKey]);

  useEffect(() => {
    // Call the fetchApiData function when the apiKey is available
    if (apiKey) {
      fetchApiData();
    }
  }, [apiKey, fetchApiData]);

  return { data };
};

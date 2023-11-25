import { useState, useEffect } from "react";
//import AWS from "aws-sdk";
// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

// export const useFetch = (apiPath, queryTerm = "") => {
//   const [data, setData] = useState([]);

export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${process.env.REACT_APP_API_KEY}&query=${queryTerm}`;
      const res = await fetch(url);
      const json = await res.json();
      setData(json.results);
    }
    fetchMovies();
  }, [apiPath, queryTerm]);

  return { data };
};

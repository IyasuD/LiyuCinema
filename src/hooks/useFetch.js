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

  const secret_name = "react_app_Secrete";

  const client = new SecretsManagerClient({
    region: "us-east-1",
  });

  useEffect(() => {
    async function fetchMovies() {
      let response;

      try {
        response = await client.send(
          new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
          })
        );
      } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
      }

      const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${response.SecretString}&query=${queryTerm}`;
      const res = await fetch(url);
      const json = await res.json();
      setData(json.results);
    }
    fetchMovies();
  }, []);

  //   return { data };

  return { data };
};

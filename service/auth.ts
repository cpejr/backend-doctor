import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export function initializeAccessToken(): Promise<AxiosResponse> {
  const body = `grant_type=client_credentials&client_id=${process.env.IDP_CLIENT_ID}&client_secret=${process.env.IDP_CLIENT_SECRET}`;
  const requestConfig: AxiosRequestConfig = {
    baseURL: process.env.IDP_ADDRESS,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
  };

  console.log('Access-Token request body: ' + body);

  return axios.post('/token-service/jwt', body, requestConfig);
}

export function renewAccessToken(refreshToken: string): Promise<AxiosResponse> {
  const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;

  const requestConfig: AxiosRequestConfig = {
    baseURL: process.env.IDP_ADDRESS,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
  };

  console.log('Refresh-Access-Token request body: ' + body);

  return axios.post('/token-service/jwt', body, requestConfig);
}

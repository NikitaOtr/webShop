import axios from 'axios';

export const apiV1 = axios.create({
    baseURL: 'https://62a1c5e2cd2e8da9b0fa2805.mockapi.io/api/v1/',
});

export const apiV2 = axios.create({
    baseURL: 'https://645552a0f803f34576406bd0.mockapi.io/api/v2/',
});

export const apiV3 = axios.create({
    baseURL: 'https://6458cbf24eb3f674df7d9c12.mockapi.io/api/v3/',
});
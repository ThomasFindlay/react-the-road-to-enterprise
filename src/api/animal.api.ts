import api from './api';

const URLS = {
  fetchDogUrl: 'breeds/image/random',
  fetchCatUrl: 'images/search?format=json',
};

export type DogData = {
  message: string;
  status: 'success' | 'error';
};

export const fetchDog = () => {
  return api.get<DogData>(URLS.fetchDogUrl, {
    baseURL: 'https://dog.ceo/api/',
  });
};

export type CatData = {
  breeds: [];
  height: number;
  id: string;
  url: string;
  width: number;
}[];

export const fetchCat = () => {
  return api.get<CatData>(URLS.fetchCatUrl, {
    baseURL: 'https://api.thecatapi.com/v1/',
  });
};

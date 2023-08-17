const MAIN_HOST = 'https://api.thecatapi.com/';
const API_KEY =
  'live_dSgQw3WFOFZLToXLlctPpUvvNetdFLauQ35rQlBcBydTaPLH2HNvD5WI6E4eQcZ2';

function fetchBreeds() {
  return fetch(`${MAIN_HOST}v1/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${MAIN_HOST}v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export default { fetchBreeds, fetchCatByBreed };

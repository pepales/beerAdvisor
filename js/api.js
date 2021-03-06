const API_KEY = '5AD0ME3-CVQMHSG-JX9BNZG-KPQKKKT';
const API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/';
const LIMIT_FILTER = 10;

const api = (API_URL_DEFAULT = `${API_URL}beers?limit=${LIMIT_FILTER}`) => {
    const searchAPIEndpoint = `${API_URL}beers?search=`;
    return {
        getBeers: async text => {
            try {
                const requestUrl = text ? `${searchAPIEndpoint}${text}&limit=${LIMIT_FILTER}` : API_URL_DEFAULT;
                const response = await fetch(requestUrl, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });
                    
                if (!response.ok) {
                    throw new Error('Error fetching beers');
                }
                const data = await response.json();
                return data.beers;
            } catch (err) {
                console.error(err.message);
                throw err;
            }
        },

        getBeerID: async text => {
            try {
                const requestUrl = `${API_URL}beers/${text}`;
                const response = await fetch(requestUrl, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });
                    
                if (!response.ok) {
                    throw new Error('Error fetching beer ID');
                }
                const data = await response.json();
                return data.beer;
            } catch (err) {
                console.error(err.message);
                throw err;
            }
        },
        getBeerComments: async text => {
            try {
                const requestUrl = `${API_URL}beers/${text}`;
                const response = await fetch(requestUrl, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });
                    
                if (!response.ok) {
                    throw new Error('Error fetching beer ID');
                }
                const data = await response.json();
                return data.beer;
            } catch (err) {
                console.error(err.message);
                throw err;
            }
        },
        createBeerComment: async (id, text) => {
            try {
              const response = await fetch(`${API_URL}beers/${id}/comment`, {
                method: 'POST',
                body: JSON.stringify({ comment:text }),
                headers: {
                  'Content-type': 'application/json',
                  'X-API-KEY': API_KEY,
                },
              });
              if (!response.ok) {
                throw new Error('Error creating comment');
              }
              const data = await response.json();
              return data;
            } catch (err) {
              console.error(err);
              throw err;
            }
        },
        addBeerLike: async (id, text) => {
            try {
              const response = await fetch(`${API_URL}beers/${id}/like`, {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  'X-API-KEY': API_KEY,
                },
              });
              if (!response.ok) {
                throw new Error('Error adding like');
              }
              const data = await response.json();
              return data;
            } catch (err) {
              console.error(err);
              throw err;
            }
        }
    }
}

export default api;
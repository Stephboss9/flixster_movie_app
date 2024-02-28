import axios from 'axios';

const API_URL: string = String(import.meta.env.VITE_API_URL);
const API_KEY: string = String(import.meta.env.VITE_API_KEY);
/**
 * This class handles all the api calls to the movie database api
 */
class ApiClient {
    apiUrl: string;
    apiKey: string;

    constructor(apiUrl: string = API_URL, apiKey: string = API_KEY) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }


    private async request(endpoint: string, parameters: string, search=false) {
        const requestUrl: string = search ? 
        `https://api.themoviedb.org/3/search/${endpoint}?api_key=${API_KEY}&${parameters}`:
        `${this.apiUrl}${endpoint}?api_key=${API_KEY}&${parameters}`;

        try {
            const request = await axios.get(requestUrl);
            const response = request.data.results;
            return { movies: response, error: null };
        }
        catch (error) {
            return { movies: null, error: error };
        }
    }


    // gets the now playing movies
    async getMovies(page: number, endpoint: string) {
        const parameters: string = `&language=en-US&page=${page}`
        return await this.request(endpoint, parameters);
    }

     async searchMovies(page: number, endpoint: string, searchTerm: string) {
        const parameters: string = `
                &query=${searchTerm}
                &language=en-US&page=${page}
                `
        return await this.request(endpoint, parameters, true);
    }


}

export default ApiClient;
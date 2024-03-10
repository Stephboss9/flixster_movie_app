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


    private async request(endpoint: string, parameters: string, search = false) {
        const requestUrl: string = search ?
            `https://api.themoviedb.org/3/search/${endpoint}?api_key=${API_KEY}&${parameters}&language=en-US` :
            `${this.apiUrl}${endpoint}?api_key=${API_KEY}&${parameters}`;
        try {
            const request = await axios.get(requestUrl);
            const response = request.data.results || request.data;
            return { data: response, error: null };
        }
        catch (error) {
            return { data: null, error: error };
        }
    }


    // gets the now playing movies
    async getMovies(page: number, endpoint: string) {
        const parameters: string = `&page=${page}`
        return await this.request(endpoint, parameters);
    }

    async searchMovies(page: number, endpoint: string, searchTerm: string) {
        const parameters: string = `
                &query=${searchTerm}
                &page=${page}
                `
        return await this.request(endpoint, parameters, true);
    }

    async getMovieInfo(movieId: number) {
        return await this.request(String(movieId), '');
    }

    async getMovieVideo(movieId: number) {
        return await this.request(`${movieId}/videos`, '');
    }


}

export default ApiClient;
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


    private async request(endpoint: string, parameters: string) {
        const requestUrl: string = `${this.apiUrl}${endpoint}?api_key=${API_KEY}&${parameters}`;

        try {
            const request = await axios.get(requestUrl);
            const response = request.data;
            return { movies: response, error: null };
        }
        catch (error) {
            return { movies: null, error: error };
        }
    }


    // gets the now playing movies
    public async getNowPlaying(page: string) {
        const endpoint: string = "now_playing";
        const parameters: string = `&language=en-US&page=${page}`
        return await this.request(endpoint, parameters);
    }
}

export default ApiClient;
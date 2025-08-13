import axios from 'axios';

class KPAService {
    constructor(token) {
        this.baseURL = 'https://api.kpaehs.com/v1';
        this.token = token;
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000 // 10 second timeout
        });
    }

    // Helper method to make requests to KPA Flex API
    async makeRequest(method, data = {}) {
        const requestData = {
            token: this.token,
            pretty: true,
            ...data
        };

        // Debug logging
        console.log('=== KPA REQUEST DEBUG ===');
        console.log('URL:', `${this.baseURL}/${method}`);
        console.log('Request data:', JSON.stringify(requestData, null, 2));
        console.log('Token being used:', this.token);
        console.log('========================');

        try {
            // Try GET request with JSON in query string (as per KPA docs)
            const queryString = encodeURIComponent(JSON.stringify(requestData));
            const response = await axios.get(`${this.baseURL}/${method}?${queryString}`);
            
            console.log('KPA Response:', response.data);
            
            if (!response.data.ok) {
                throw new Error(`KPA API Error: ${response.data.error} - ${response.data.description || ''}`);
            }

            return response.data;
        } catch (error) {
            console.log('Full error object:', error.response?.data || error.message);
            
            if (error.response) {
                console.error('KPA API Response Error:', error.response.data);
                throw new Error(`KPA API Error: ${error.response.data.error || 'Unknown error'}`);
            } else if (error.request) {
                console.error('No response from KPA API:', error.request);
                throw new Error('No response from KPA API');
            } else {
                console.error('Request setup error:', error.message);
                throw error;
            }
        }
    }


    // Get user information by ID
    async getUserInfo(userId) {
        return await this.makeRequest('users.info', { id: userId });
    }
}

export default KPAService;
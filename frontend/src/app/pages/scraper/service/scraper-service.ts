export class RestServiceScraper{
    private apiUrl: string;

    constructor(apiUrl: string){
        this.apiUrl = apiUrl
    }

    public async getResults() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch results:', error);
            throw error;
        }
    }
}
# TypeScript Web Scraper

## Project Overview

This project is a simple TypeScript-based web scraping tool designed to extract and filter data from Hacker News. It fetches HTML content from the specified URL and parses it to retrieve targeted information such as titles and comments. This data is then made available through a simple user interface, with additional functionality to apply various filters.  It provides users with the capability to filter these entries either through the frontend or the backend.

## Features

- **Data Extraction:** Extracts key information from the specified web page.
- **Filtering Options**: Users can filter the results based on specific criteria. This filtering can be performed either on the client side after fetching the initial 30 results or on the server side through dedicated API calls.

## Local Setup using Docker

### Prerequisites

- Docker
- Docker Compose

### Initial Setup

1. **Clone the repository**:

    ```sh
    git clone https://github.com/varoal/ts-scraper.git
    cd ts-scraper
    ```

2. **Start the application**:

    ```sh
    docker-compose up
    ```

    This command builds and starts both the frontend and backend services.
3. **Access the Application:**:

**Frontend**: Open your browser and navigate to `http://localhost:80` to access the web interface.
**Backend API**: Accessible via `http://localhost:3000`.

## API Endpoints

The backend server exposes four main endpoints, each serving a specific function related to scraping and filtering data from Hacker News.

- **Get HTML Content**:

Endpoint: `http://localhost:3000/api/get-html`
Description: Fetches the raw HTML content from Hacker News.
Method: GET

- **Scrape Top Entries**:

Endpoint: `http://localhost:3000/api/scrape`
Description: Retrieves and parses the top 30 entries from Hacker News.
Method: GET

- **Filter by Long Title**:

Endpoint: `http://localhost:3000/api/filter-long-title`
Description: Filters the entries to show only those with titles longer than 5 words, ordered by the number of comments.
Method: GET

- **Filter by Short Title**:

Endpoint: `http://localhost:3000/api/filter-short-title`
Description: Filters the entries to show only those with titles equal to or shorter than 5 words, ordered by points.
Method: GET

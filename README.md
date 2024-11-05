# NGINX Load Balancer with Express.js Backend

This project demonstrates how to use NGINX as a load balancer and reverse proxy. Express.js was used as the backend. Used NGINX to implement caching, rate limiting, server health checks, and GZIP-compressed response bodies. The project also uses Docker to containerize the services.

## Table of Contents
- [NGINX Load Balancer with Express.js Backend](#nginx-load-balancer-with-expressjs-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites)
  - [Usage](#usage)

---

## Features
- **Load Balancing**: Distributes incoming traffic evenly between `node-app1` and `node-app2`
- **Rate Limiting**: Restricts the number of requests per second to prevent abuse.
- **Caching**:  Caches backend responses to improve performance and reduce backend load.
- **Health Checks**: Automatically detects and removes unhealthy backend servers.
- **Gzip Compression**: Reduces the size of transmitted responses for faster load times.

## Project Structure

- **app.js**: A simple Express.js app running on port 3000, replicated as two instances (`node-app1` and `node-app2`) to demonstrate load balancing.
- **nginx.conf**: NGINX configured most importantly as a reverse proxy to load balance incoming requests between the two Node.js instances.

## Prerequisites
- [Docker](https://www.docker.com/get-started) installed on your machine

## Usage

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ernesto-B/Docker-NGINX-Load-Balancer-Demo.git
   cd https://github.com/Ernesto-B/Docker-NGINX-Load-Balancer-Demo.git
   ```

2. **Build the Docker image and start containers**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
    - **/**
      - Open your browser and navigate to `http://localhost`. The home page will display the hostname of the container that served the request. The page will be cached on the NGINX server for 1 minute, during which you can find the cached response in the NGINX container file: `/tmp/nginx_cache/`.
      - After 1 minute, the cache will expire, be deleted from the cache directory, and the request will be served by the other container.
      - You can tell if the response was retrieved from the cache if the response code is `304` (resource not modified... retrieved from the cache) instead of 200 (sent from backend).
      - The / path is also rate-limited to 2 requests per second. If you exceed this limit, you will receive a 503 status code, and can see the rate limiting details in the NGINX logs in your terminal.
      - You will also find that the response body is GZIP-compressed.
    - **/info**
      - Navigate to `http://localhost/info` to access a normal response from the backend server. The requests are not load-balanced, cached, rate-limited, or GZIP-compressed.
4. **Stop the containers**:
    - When you are done testing:
   ```bash
   docker-compose down
   ```
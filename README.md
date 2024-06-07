# recishare

Recishare is a MERN-based web application made for sharing food and recipes. It is our CS 35L final project.

## Installation
To get started, clone this repository and install all dependencies

```bash
# Clone the repository
git clone https://github.com/brunocarbourges/recishare

# Navigate into the project directory
cd recishare

# Install server dependencies
cd server
npm install

# Install client dependencies (may need to install rollup separately)
cd ../client
npm install
npm install rollup
```

## Setup
Before running, you'll also need to create a .env file in /server specifying a MongoDB connection string and a port for the backend to run on, and some credentials to connect to Cloudinary.

We are using Cloudinary to store our image files, can sign up for free at cloudinary.com
Once logged in, navigate to the dashboard, copy Cloud Name into .env
Then click "Go to API keys", and copy API Key and API Secret into .env


```
ATLAS_URI=your_mongodb_connection_string
PORT=5050

JWT_SECRET = random_char_string

CLOUD_NAME = your_cloudinary_cloud_name
CLOUD_API_KEY = your_cloudinary_api_key
CLOUD_API_SECRET = your_cloudinary_api_secret
```

## Running
To run recishare:

```bash
# To run the backend
cd server
node server

# To run the frontend
cd client
npm run dev
```

## Dependencies
Recishare is built using the MERN stack:
- **MongoDB**: Database to store user and recipe information.
- **Express.js**: Web framework for building the server-side application.
- **React + Vite**: Front-end library for building user interfaces.
- **Node.js**: JavaScript runtime environment for server-side code.

Additional technologies:
- **cors**: Resource sharing for integrating applications.
- **dotenv**: Reads environment variables from the server/.env file.



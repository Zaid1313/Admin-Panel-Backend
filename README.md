
# Backend Setup Guide

This guide will help you set up the backend for this project. Please follow the steps below to get started.

## Step 1: Install Dependencies

First, install all the required dependencies by running the following command in your terminal:

```bash
npm install
```

## Step 2: Configure Environment Variables

Create a `.env` file in the project's root directory and set it up in the following format, replacing the placeholders with your database information:

```env
DB_HOST=<host address>
DB_NAME=<database name>
DB_USERNAME=<db username>
DB_PASSWORD=<db password>
DB_PORT=<db port>
```

## Step 3: Start the Node Server

You can start the Node server by running either of the following commands. The server will run on port 4000.

```bash
node index.js
```

or

```bash
nodemon index.js
```

## Step 4: Sync the Database

To synchronize the database with the configuration in your `.env` file, send a GET request to the following endpoint:

```
http://localhost:4000/syncDB
```

## Step 5: Set Up the Frontend

Open the frontend repository and follow the setup instructions to run the React project. The frontend will be accessible on port 3000.

That's it! Your backend is now set up and ready to work with the frontend of this project.

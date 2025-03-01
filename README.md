# AI-Powered Trade Recommendation Engine
This application helps homeowners find the right trade professionals by analysing their home improvement problems in natural language. 
The application is currently deployed on Google Cloud Run at: https://checkatrade-app-502792768465.us-central1.run.app/

## Features
Natural language input for home improvement problems
AI-powered classification of the problem
Recommendation of relevant trades
Storage of queries and recommendations in Firestore

## Technologies Used

Frontend: React with TypeScript
Backend: Node.js with Express
AI: OpenAI API (GPT-3.5 Turbo)
Database: Firebase Firestore

## Setup Instructions
### Prerequisites

Node.js and npm installed
OpenAI API key
Firebase project with Firestore enabled

### Backend Setup

Navigate to the server directory:
Copycd server

Install dependencies:
Copynpm install

Create a .env file with the following variables:
CopyOPENAI_API_KEY=your_openai_api_key
FIREBASE_SERVICE_ACCOUNT="your_firestore_generated_json"

Start the development server:
Copynpm run dev


### Frontend Setup

Navigate to the client directory:
Copycd client

Install dependencies:
Copynpm install

Start the development server:
Copynpm start

The application should now be running at http://localhost:8080

## Project Structure

client/: React frontend application
server/: Node.js backend API

## License
This project is part of a technical assessment for Checkatrade Labs.

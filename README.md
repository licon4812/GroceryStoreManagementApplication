# Grocery Store Application

## Overview

This project consists of a .NET 8 backend (`GroceryStore.API`), an Angular 17 frontend (`GroceryStore.Web`), and uses Docker for containerization. Below are instructions for running all services, running just the MongoDB container, and running the project via CLI.

## Running Services

### Via Docker

To run all services, including the .NET 8 backend, Angular 17 frontend, and MongoDB, use the provided `run.project.bat` script. This script will start all the containers required for the application.

1. Open a terminal or command prompt.
2. Navigate to the directory containing the `run.project.bat` file.
3. Run the following command:

   `run.project.bat`

### Running MongoDB Container Only

If you are debugging locally and only need to run the MongoDB container, use the `run.db.bat` script. This script will start just the MongoDB container without running other services.

1. Open a terminal or command prompt.
2. Navigate to the directory containing the `run.db.bat` file.
3. Run the following command:

   `run.db.bat`

## Running Project manually via CLI

### .NET 8 Backend (`GroceryStore.API`)

To run the .NET 8 backend locally via CLI:

1. Open a terminal or command prompt.
2. Navigate to the `GroceryStore.API` project directory.
3. Run the following command to start the backend:

   `dotnet run`

#### Testing

To test the .NET 8 backend, I have included the postman configuration file in `GroceryStore.API/GroceryStore.API.postman_collection.json`

Simply import the file into postman and boot the project to start testing

### Angular 17 Frontend (`GroceryStore.Web`)

To run the Angular 17 frontend locally via CLI:

1. Open a terminal or command prompt.
2. Navigate to the `GroceryStore.Web` project directory.
3. Ensure dependencies are installed by running:

   `npm install`

4. Start the Angular application by running:

   `ng serve`

The Angular application will typically be accessible at `http://localhost:4200`.

## Notes
- Included is the original assessment sheet for reference
- For debugging or development, running services locally without Docker may require additional configuration (e.g., setting up local MongoDB instances).

Feel free to reach out if you have any questions or encounter issues.

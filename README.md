# LAB - Class 03

## Project: API Server

### Author: Bryan O. Garduno Gonzalez

### Problem Domain  

Build an Express REST API that can perform CRUD operations on a PostgreSQL database using Sequelize ORM. The API should comprise two user-defined SQL data models. Establish route modules for each created data model, with each route module equipped with REST route handlers to handle different REST methods, ensuring they call the appropriate CRUD method from the corresponding data model. Require RESTful routes to add, retrieve, update, and delete records in the database. The paths for these operations should follow standard conventions, such as POST to `/food` to add a food record. The API should efficiently handle errors, returning a 404 status for invalid routes or methods. Thorough testing is necessary, focusing on aspects like correct status codes, data returned for each REST route, and execution of all CRUD operations.


### Links and Resources

- [GitHub Actions ci/cd](https://github.com/brosmar18/api-server/actions) 
- basic-api [back-end server url] (when applicable) - Not applicable because database has not been deployed. 
- Main [back-end server url] (when applicable) Not applicable because database has not been deployed. 


### Collaborators

### Setup

#### `.env` requirements (where applicable)


A .env file is included in local repository. A .env-sample file is uploaed to the remote repo so collaborators understand what environmental variables are being used. 

#### How to initialize/run your application (where applicable)

- e.g. `npm start`

#### How to use your library (where applicable)

#### Features / Routes

- **Server Modularization:** 
  - The server structure is modularized for ease of maintenance and scalability.
  - Entry point at `index.js` which sets up the server start after a successful database connection.
  - Server logic encapsulated in `src/server.js`, exporting a `start()` method and a reference to the Express app.

- **Middleware Implementation:**
  - **404 Not Found (`src/handlers/404.js`):**
    - Handles all unrecognized routes.
    - Sends a 404 status along with error information.
  - **500 Server Error (`src/handlers/500.js`):**
    - Handles server errors.
    - Sends a 500 status along with error information, including the route, query, and body from the request.
    
- **Models:**
  - **Food Model (`src/models/food.js`):**
    - Defines a `food` model with `name`, `price`, `calories`, and `availability` fields.
  - **Clothes Model (`src/models/clothes.js`):**
    - Defines a `clothes` model with `name`, `color`, and `size` fields.

- **Routes:**
  - **Food Routes (`src/routes/food.js`):**
    - `GET /food`: Fetches all food entries.
    - `POST /food`: Adds a new food entry.
    - `GET /food/:id`: Fetches a specific food entry by ID.
    - `PUT /food/:id`: Updates a specific food entry by ID.
    - `DELETE /food/:id`: Deletes a specific food entry by ID.
  - **Clothes Routes (`src/routes/clothes.js`):**
    - `GET /clothes`: Fetches all clothes entries.
    - `POST /clothes`: Adds a new clothes entry.
    - `GET /clothes/:id`: Fetches a specific clothes entry by ID.
    - `PUT /clothes/:id`: Updates a specific clothes entry by ID.
    - `DELETE /clothes/:id`: Deletes a specific clothes entry by ID.

- **Database:**
  - Utilizes Sequelize to define and interact with `food` and `clothes` models.
  - Connection setup and model import in `src/models/index.js`.
  - Database URL configured based on the environment. Uses in-memory database for testing.

- **Error Routes:**
  - `GET /error`: Forced error for testing the 500 error handler.

**Testing:**
- Extensive error handling and route testing is performed to ensure the robustness of the server.
- Tests are implemented using the `supertest` library for making requests to the server and `Jest` for assertions.
- Various aspects including creating, reading, updating, and deleting resources for both clothes and food routes are tested.
- Additionally, server errors and invalid requests are also tested to ensure appropriate responses.

**Test Files:**

1. **server.test.js:**
   - Tests for the root path to ensure that the server responds with a 200 status and the correct message.
   - Checks handling of invalid requests, ensuring a 404 status is returned.
   - Tests server error handling by intentionally triggering an error and checking for a 500 status and correct error message.

2. **clothes.test.js:**
   - Before all tests, the database is synced, and after all tests, the database is dropped.
   - Tests include creating a clothes item, ensuring the correct status and response body.
   - Getting clothes items, and getting a specific clothes item by ID.
   - Updating and deleting a clothes item, followed by checking if the item is actually deleted by expecting a 404 status on a subsequent get request.

3. **food.test.js:**
   - Similar to `clothes.test.js`, but for food items.
   - Tests include creating a food item, getting food items, getting a specific food item by ID, updating a food item, and deleting a food item.
   - Ensures that deleted items cannot be retrieved by expecting a 404 status on a subsequent get request.

#### Tests

- **How do you run tests?**

  To execute the tests for this assignment, navigate to the project's root directory and run the command `npm test`. This command runs all test files, utilizing the Jest testing framework to perform a comprehensive series of tests on the application's various routes and functionalities.

- **Any tests of note?**

  Significant tests in this assignment include the server error handling tests in `server.test.js`. These tests ensure the server appropriately handles errors by returning a 500 status code and the correct error message. In `clothes.test.js` and `food.test.js`, various CRUD operation tests verify the application's ability to correctly create, read, update, and delete resources for both clothes and food routes. Additionally, they ensure that attempting to retrieve deleted items results in a 404 status code, verifying the deletion functionality.

- **Describe any tests that you did not complete, skipped, etc.**

  At the current stage of the project, all planned tests have been successfully implemented and executed. There is no outstanding, skipped, or incomplete test. However, continuous integration and development may warrant the addition of further tests for enhanced coverage and robustness in the future.

#### UML

![Lab-3 UML](assets/lab03-uml.png);
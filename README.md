# E-commerce Project Setup

This project has both frontend and backend within the same folder structure. Follow the steps below to set up and run the project.

## 1. Create MySQL Database

First, you need to create a MySQL schema. You can use the following SQL command to create your database:

```sql
CREATE DATABASE your_database_name;
```

**Note:** Replace `your_database_name` with your desired database name.

## 2. Backend Setup

To set up and run the backend, follow these steps:

1. Navigate to the `be` folder:

   ```bash
   cd be
   ```

2. Copy the `.env.example` file to create the `.env` file:

   ```bash
   cp .env.example .env
   ```

3. Update the database configuration in the `.env` file:

   - `DB_HOST`: MySQL server address (e.g., `localhost`)
   - `DB_USER`: MySQL username
   - `DB_PASSWORD`: MySQL password
   - `DB_NAME`: Database name (the one you created in the first step)

   Use any text editor to modify the `.env` file.

4. Install the necessary dependencies for the backend:

   ```bash
   npm install
   ```

5. Seed the database by running the following command:

   ```bash
   npm run seed
   ```

6. Build the backend project:

   ```bash
   npm run build
   ```

7. Start the backend server:

   ```bash
   npm start
   ```

## 3. Frontend Setup

To set up and run the frontend, follow these steps:

1. Navigate to the `fe` folder:

   ```bash
   cd ../fe
   ```

2. Install the necessary dependencies for the frontend:

   ```bash
   npm install
   ```

3. Build the frontend project:

   ```bash
   npm run build
   ```

4. Start the frontend server:

   ```bash
   npm start
   ```

## 4. Demo Frontend URL

You can access the **frontend demo** at the following URL:

[http://demoecom.serdarcakir.online/](http://demoecom.serdarcakir.online/)

To log in as a demo user, use the following credentials:

- **Email:** 1@1.com
- **Password:** 123123

## 5. Running the Project

After completing these steps, both the frontend and backend applications should be running. You can access the **frontend** in your browser.

- The backend provides API services.
- The frontend provides the user interface.

## 6. Help

If you encounter any issues while setting up the project, you can refer to the following resources:

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---
This document provides the necessary steps to set up and run the project. By following these steps, you should be able to quickly get the project up and running.
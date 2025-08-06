 # Gator-TS 🐊
 
 Gator-TS is a command-line interface (CLI) for managing your database schema using Drizzle ORM. It helps you generate and apply migrations, keeping your database in sync with your application's schema.
 
 ## Prerequisites 📋
 
 Before you begin, ensure you have the following installed:
 
 *   [Node.js](https://nodejs.org/) (v18.x or later recommended)
 *   A package manager like [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
 *   A running PostgreSQL database instance
 *   [Git](https://git-scm.com/) for version control
 
 ## Installation 💻
 
 1.  Clone the repository to your local machine:
     ```bash
     git clone <your-repository-url>
     cd gator-TS
     ```
 
 2.  Install the project dependencies:
     ```bash
     npm install
     # or
     # yarn install
     # or
     # pnpm install
     ```
 
 ## Configuration 🔧
 
 This project uses `drizzle-kit` for migrations. You need to configure your database connection in a `drizzle.config.ts` file in the root of the project.
 
 1.  Create a `drizzle.config.ts` file in the project root.
 2.  Add the following configuration, adjusting the paths and credentials as needed.
 
     ```typescript
     import { defineConfig } from 'drizzle-kit';
     import 'dotenv/config';
 
     export default defineConfig({
       dialect: 'postgresql',
       schema: './src/db/schema.ts', // Path to your schema file
       out: './drizzle',             // Directory for migration files
       dbCredentials: {
         url: process.env.DATABASE_URL!,
       },
       verbose: true,
       strict: true,
     });
     ```
 
 3.  For security, it's best to use environment variables for your database connection string. Create a `.env` file in the project root:
 
     ```
     # .env
     DATABASE_URL="postgres://YOUR_USER:YOUR_PASSWORD@YOUR_HOST:5432/YOUR_DATABASE"
     ```
 
     Make sure to add `.env` to your `.gitignore` file to avoid committing secrets.
 
 ## Usage 🚀
 
 It's recommended to add the `drizzle-kit` commands to the `scripts` section of your `package.json` for easier use.
 
 ```json
 // package.json
 "scripts": {
   "db:generate": "drizzle-kit generate:pg",
   "db:migrate": "drizzle-kit migrate",
   "db:push": "drizzle-kit push:pg",
   "db:studio": "drizzle-kit studio"
 }
 ```
 
 ### Generating Migrations
 
 When you make changes to your Drizzle schema (e.g., in `./src/db/schema.ts`), run the `generate` command to create a new SQL migration file.
 
 ```bash
 npm run db:generate
 ```
 
 This will create a new file in the `./drizzle` directory containing the SQL statements to update your database schema.
 
 ### Applying Migrations
 
 To apply all pending migrations to your database, run the `migrate` command. This executes the SQL files generated in the previous step.
 
 ```bash
 npm run db:migrate
 ```
 
 ### Pushing Schema Changes (for Development)
 
 For rapid prototyping and development, you can push your schema changes directly to the database without creating a migration file.
 
 > **Warning:** This command can be destructive as it synchronizes the database with your schema directly. It is **not** recommended for production environments.
 
 ```bash
 npm run db:push
 ```
 
 ### Drizzle Studio
 
 To browse your database and test queries, you can use Drizzle Studio, a GUI for your database.
 
 ```bash
 npm run db:studio
 ```
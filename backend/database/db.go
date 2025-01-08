package database

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

// Connect initializes a PostgreSQL connection pool.
func Connect() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}

	var err error
	DB, err = pgxpool.New(context.Background(), dsn)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	log.Println("Connected to PostgreSQL database!")
}

// InitializeTables creates all required tables in the database.
func InitializeTables() {
	// Check if DB is initialized
	if DB == nil {
		log.Fatal("Database connection is not initialized")
	}

	// Define the SQL query to create the `users` table
	createUsersTableQuery := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		name VARCHAR(100) NOT NULL,
		email VARCHAR(100) UNIQUE NOT NULL,
		password VARCHAR(255) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`

	// Execute the query
	_, err := DB.Exec(context.Background(), createUsersTableQuery)
	if err != nil {
		log.Fatalf("Failed to create 'users' table: %v\n", err)
	}

	log.Println("Users table initialized successfully!")
}

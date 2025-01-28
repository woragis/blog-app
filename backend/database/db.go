package database

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

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

func InitializeTables() {
	if DB == nil {
		log.Fatal("Database connection is not initialized")
	}

	createUuidExtension := `
	CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
	`

	createUsersTable := `
	CREATE TABLE IF NOT EXISTS users (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		name VARCHAR(100) NOT NULL,
		email VARCHAR(100) UNIQUE NOT NULL,
		password VARCHAR(255) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`
	// createCategoriesTable := `
	// CREATE TABLE IF NOT EXISTS categories (
	// 	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	// 	name VARCHAR(100) NOT NULL UNIQUE,
	// 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	// 	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	// );`

	createPostsTable := `
	CREATE TABLE IF NOT EXISTS posts (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		title VARCHAR(255) NOT NULL,
		content TEXT NOT NULL,
		author_id UUID REFERENCES users(id) ON DELETE CASCADE,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`

	// createCommentsTable := `
	// CREATE TABLE IF NOT EXISTS comments (
	//	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	// 	content TEXT NOT NULL,
	// 	post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
	// 	author_id UUID REFERENCES users(id) ON DELETE CASCADE,
	// 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	// );`

	queries := []string{createUuidExtension, createUsersTable, createPostsTable}

	for _, query := range queries {
		_, err := DB.Exec(context.Background(), query)
		if err != nil {
			log.Fatalf("Failed to execute query: %v\n", err)
		}
	}

	log.Println("All tables initialized successfully!")
}

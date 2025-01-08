package main

import (
	"blog-api/database"
	"blog-api/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database
	database.Connect()
	defer database.DB.Close()

	// initialize tables
	database.InitializeTables()

	// Initialize Gin
	router := gin.Default()

	// User Routes
	router.POST("/users", handlers.CreateUser)
	router.GET("/users", handlers.GetUsers)
	router.GET("/users/:id", handlers.GetUser)
	router.PUT("/users/:id", handlers.UpdateUser)
	router.DELETE("/users/:id", handlers.DeleteUser)

	// Start the server
	router.Run(":8080")
}

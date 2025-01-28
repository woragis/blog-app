package main

import (
	"blog-backend/database"
	"blog-backend/handlers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()
	defer database.DB.Close()

	database.InitializeTables()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"}, // Allowed origins
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},        // Allowed methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},        // Allowed headers
		ExposeHeaders:    []string{"Content-Length"},                                 // Exposed headers
		AllowCredentials: true,                                                       // Allow credentials like cookies
		MaxAge:           12 * time.Hour,
	}))

	// Auth Routes
	authGroup := router.Group("/auth")
	{
		authGroup.POST("/login", handlers.Login)
		authGroup.POST("/register", handlers.Register)
	}

	// Post Routes
	postGroup := router.Group("/posts")
	{
		postGroup.POST("/", handlers.CreatePost)      // Create Post
		postGroup.GET("/", handlers.GetAllPosts)      // Get All Posts
		postGroup.GET("/:id", handlers.GetPostByID)   // Get Post by ID
		postGroup.PUT("/:id", handlers.UpdatePost)    // Update Post
		postGroup.DELETE("/:id", handlers.DeletePost) // Delete Post
	}

	router.Run(":8080")
}

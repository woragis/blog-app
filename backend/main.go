package main

import (
	"blog-api/database"
	"blog-api/handlers"
	"time"

	"github.com/gin-contrib/cors"
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

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"}, // Allowed origins
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},        // Allowed methods
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},        // Allowed headers
        ExposeHeaders:    []string{"Content-Length"},                                 // Exposed headers
        AllowCredentials: true,                                                       // Allow credentials like cookies
        MaxAge:           12 * time.Hour, 
	}))

	// User Routes
	userGroup := router.Group("/users")
	{
		userGroup.POST("/", handlers.CreateUser)
		userGroup.GET("/", handlers.GetUsers)
		userGroup.GET("/:id", handlers.GetUser)
		userGroup.PUT("/:id", handlers.UpdateUser)
		userGroup.DELETE("/:id", handlers.DeleteUser)
	}

	// Post Routes
	postGroup := router.Group("/posts")
	{
		postGroup.POST("/", handlers.CreatePost)        // Create Post
		postGroup.GET("/", handlers.GetAllPosts)        // Get All Posts
		postGroup.GET("/:id", handlers.GetPostByID)     // Get Post by ID
		postGroup.PUT("/:id", handlers.UpdatePost)      // Update Post
		postGroup.DELETE("/:id", handlers.DeletePost)   // Delete Post
	}

	// Comment Routes
	commentGroup := router.Group("/comments")
	{
		commentGroup.POST("/", handlers.CreateComment)        // Create Comment
		commentGroup.GET("/post/:post_id", handlers.GetAllComments)  // Get All Comments for a Post
		commentGroup.GET("/:id", handlers.GetCommentByID)     // Get Comment by ID
		commentGroup.PUT("/:id", handlers.UpdateComment)      // Update Comment
		commentGroup.DELETE("/:id", handlers.DeleteComment)   // Delete Comment
	}

	// Category Routes
	categoryGroup := router.Group("/categories")
	{
		categoryGroup.POST("/", handlers.CreateCategory)        // Create Category
		categoryGroup.GET("/", handlers.GetAllCategories)       // Get All Categories
		categoryGroup.GET("/:id", handlers.GetCategoryByID)     // Get Category by ID
		categoryGroup.PUT("/:id", handlers.UpdateCategory)      // Update Category
		categoryGroup.DELETE("/:id", handlers.DeleteCategory)   // Delete Category
	}

	// Start the server
	router.Run(":8080")
}

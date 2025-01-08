package rest

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Article represents an article structure
type Article struct {
	ID      string `json:"id"`      // Unique ID
	Title   string `json:"title"`   // Title of the article
	Content string `json:"content"` // Content of the article
}

var articles = []Article{
	{ID: "1", Title: "First Article", Content: "This is the content of the first article."},
	{ID: "2", Title: "Second Article", Content: "This is the content of the second article."},
}

func main() {
	r := gin.Default()

	// Routes
	r.GET("/articles", getArticles)         // Retrieve all articles
	r.GET("/articles/:id", getArticleByID)  // Retrieve a single article by ID
	r.POST("/articles", createArticle)      // Create a new article
	r.PUT("/articles/:id", updateArticle)   // Update an existing article by ID
	r.DELETE("/articles/:id", deleteArticle) // Delete an article by ID

	// Start the server
	r.Run(":8080") // Run on http://localhost:8080
}

// Handlers

// Get all articles
func getArticles(c *gin.Context) {
	c.JSON(http.StatusOK, articles)
}

// Get an article by ID
func getArticleByID(c *gin.Context) {
	id := c.Param("id")
	for _, article := range articles {
		if article.ID == id {
			c.JSON(http.StatusOK, article)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "Article not found"})
}

// Create a new article
func createArticle(c *gin.Context) {
	var newArticle Article
	if err := c.ShouldBindJSON(&newArticle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	articles = append(articles, newArticle)
	c.JSON(http.StatusCreated, newArticle)
}

// Update an article by ID
func updateArticle(c *gin.Context) {
	id := c.Param("id")
	var updatedArticle Article
	if err := c.ShouldBindJSON(&updatedArticle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for i, article := range articles {
		if article.ID == id {
			articles[i] = updatedArticle
			articles[i].ID = id // Ensure the ID remains unchanged
			c.JSON(http.StatusOK, updatedArticle)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "Article not found"})
}

// Delete an article by ID
func deleteArticle(c *gin.Context) {
	id := c.Param("id")
	for i, article := range articles {
		if article.ID == id {
			articles = append(articles[:i], articles[i+1:]...) // Remove the article from the slice
			c.JSON(http.StatusOK, gin.H{"message": "Article deleted"})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "Article not found"})
}

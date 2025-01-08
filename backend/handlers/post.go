package handlers

import (
	"net/http"

	"blog-api/database"
	"blog-api/models"

	"github.com/gin-gonic/gin"
)


func CreatePost(c *gin.Context) {
	var post models.Post

	// Bind JSON to the post struct
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Insert new post into the database
	query := `INSERT INTO posts (title, content, author_id, category_id) VALUES ($1, $2, $3, $4) RETURNING id, created_at, updated_at`
	err := database.DB.QueryRow(
		c.Request.Context(),
		query,
		post.Title,
		post.Content,
		post.AuthorID,
		post.CategoryID,
	).Scan(&post.ID, &post.CreatedAt, &post.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}

	c.JSON(http.StatusCreated, post)
}


func GetAllPosts(c *gin.Context) {
	query := `SELECT id, title, content, author_id, category_id, created_at, updated_at FROM posts`
	rows, err := database.DB.Query(c.Request.Context(), query)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve posts"})
		return
	}
	defer rows.Close()

	var posts []models.Post
	for rows.Next() {
		var post models.Post
		if err := rows.Scan(&post.ID, &post.Title, &post.Content, &post.AuthorID, &post.CategoryID, &post.CreatedAt, &post.UpdatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process post data"})
			return
		}
		posts = append(posts, post)
	}

	c.JSON(http.StatusOK, gin.H{"posts": posts})
}


func GetPostByID(c *gin.Context) {
	id := c.Param("id")

	query := `SELECT id, title, content, author_id, category_id, created_at, updated_at FROM posts WHERE id=$1`
	row := database.DB.QueryRow(c.Request.Context(), query, id)

	var post models.Post
	err := row.Scan(&post.ID, &post.Title, &post.Content, &post.AuthorID, &post.CategoryID, &post.CreatedAt, &post.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	c.JSON(http.StatusOK, post)
}


func UpdatePost(c *gin.Context) {
	id := c.Param("id")
	var post models.Post

	// Bind JSON to the post struct
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Update post in the database
	query := `UPDATE posts SET title=$1, content=$2, author_id=$3, category_id=$4, updated_at=NOW() WHERE id=$5 RETURNING id, created_at, updated_at`
	err := database.DB.QueryRow(
		c.Request.Context(),
		query,
		post.Title,
		post.Content,
		post.AuthorID,
		post.CategoryID,
		id,
	).Scan(&post.ID, &post.CreatedAt, &post.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update post"})
		return
	}

	c.JSON(http.StatusOK, post)
}


func DeletePost(c *gin.Context) {
	id := c.Param("id")

	// Delete post from the database
	query := `DELETE FROM posts WHERE id=$1`
	_, err := database.DB.Exec(c.Request.Context(), query, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete post"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Post deleted successfully"})
}

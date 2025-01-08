package handlers

import (
	"net/http"

	"blog-api/database"
	"blog-api/models"

	"github.com/gin-gonic/gin"
)

func CreateComment(c *gin.Context) {
	var comment models.Comment

	// Bind JSON to the comment struct
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Insert new comment into the database
	query := `INSERT INTO comments (content, post_id, author_id) VALUES ($1, $2, $3) RETURNING id, created_at`
	err := database.DB.QueryRow(
		c.Request.Context(),
		query,
		comment.Content,
		comment.PostID,
		comment.AuthorID,
	).Scan(&comment.ID, &comment.CreatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment"})
		return
	}

	c.JSON(http.StatusCreated, comment)
}

func GetAllComments(c *gin.Context) {
	postID := c.Param("post_id")

	// Get all comments for a specific post
	query := `SELECT id, content, post_id, author_id, created_at FROM comments WHERE post_id=$1`
	rows, err := database.DB.Query(c.Request.Context(), query, postID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve comments"})
		return
	}
	defer rows.Close()

	var comments []models.Comment
	for rows.Next() {
		var comment models.Comment
		if err := rows.Scan(&comment.ID, &comment.Content, &comment.PostID, &comment.AuthorID, &comment.CreatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process comment data"})
			return
		}
		comments = append(comments, comment)
	}

	c.JSON(http.StatusOK, gin.H{"comments": comments})
}

func GetCommentByID(c *gin.Context) {
	id := c.Param("id")

	// Get comment by ID
	query := `SELECT id, content, post_id, author_id, created_at FROM comments WHERE id=$1`
	row := database.DB.QueryRow(c.Request.Context(), query, id)

	var comment models.Comment
	err := row.Scan(&comment.ID, &comment.Content, &comment.PostID, &comment.AuthorID, &comment.CreatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
		return
	}

	c.JSON(http.StatusOK, comment)
}

func UpdateComment(c *gin.Context) {
	id := c.Param("id")
	var comment models.Comment

	// Bind JSON to the comment struct
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Update comment in the database
	query := `UPDATE comments SET content=$1, updated_at=NOW() WHERE id=$2 RETURNING id, post_id, author_id, created_at`
	err := database.DB.QueryRow(
		c.Request.Context(),
		query,
		comment.Content,
		id,
	).Scan(&comment.ID, &comment.PostID, &comment.AuthorID, &comment.CreatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update comment"})
		return
	}

	c.JSON(http.StatusOK, comment)
}

func DeleteComment(c *gin.Context) {
	id := c.Param("id")

	// Delete comment from the database
	query := `DELETE FROM comments WHERE id=$1`
	_, err := database.DB.Exec(c.Request.Context(), query, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete comment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Comment deleted successfully"})
}

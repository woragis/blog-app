package handlers

import (
	"net/http"

	"blog-backend/database"
	"blog-backend/models"
	"blog-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetAllPosts(c *gin.Context) {
	query := `SELECT id, title, content, author_id, created_at, updated_at FROM posts;`
	rows, err := database.DB.Query(c.Request.Context(), query)

	if err != nil {
		utils.SendResponse(
			c,
			http.StatusInternalServerError,
			"Failed to retrieve posts",
			err,
			nil,
		)
		return
	}
	defer rows.Close()

	var posts []models.Post
	for rows.Next() {
		var post models.Post
		if err := rows.Scan(&post.ID, &post.Title, &post.Content, &post.AuthorID, &post.CreatedAt, &post.UpdatedAt); err != nil {
			utils.SendResponse(
				c,
				http.StatusInternalServerError,
				"Failed to process post data",
				err,
				nil,
			)
			return
		}
		posts = append(posts, post)
	}

	if posts == nil {
		posts = []models.Post{}
	}

	utils.SendResponse(
		c,
		http.StatusOK,
		"Successfully retrieved posts",
		nil,
		posts,
	)
}

func GetPostByID(c *gin.Context) {
	id := c.Param("id")

	query := `SELECT id, title, content, author_id, created_at, updated_at FROM posts WHERE id=$1;`
	row := database.DB.QueryRow(c.Request.Context(), query, id)

	var post models.Post

	err := row.Scan(&post.ID, &post.Title, &post.Content, &post.AuthorID, &post.CreatedAt, &post.UpdatedAt)

	if err != nil {
		utils.SendResponse(
			c,
			http.StatusNotFound,
			"Failed to retrieve post: post not found",
			err,
			nil,
		)
		return
	}

	utils.SendResponse(
		c,
		http.StatusOK,
		"Successfully retrieved post",
		nil,
		post,
	)
}

func CreatePost(c *gin.Context) {
	post := models.Post {
		Title:    `json:"title" binding:"required,email"`,
		Content: `json:"content" binding:"required"`,
		AuthorID: `json:"author_id" binding:"required"`,
	}

	if err := c.ShouldBindJSON(&post); err != nil {
		utils.SendResponse(
			c,
			http.StatusBadRequest,
			"Failed to create post: invalid input",
			err.Error(),
			nil,
		)
		return
	}

	query := `INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING id, created_at, updated_at;`
	err := database.DB.QueryRow(
		c.Request.Context(),
		query,
		post.Title,
		post.Content,
		post.AuthorID,
	).Scan(&post.ID, &post.CreatedAt, &post.UpdatedAt)

	if err != nil {
		utils.SendResponse(
			c,
			http.StatusInternalServerError,
			"Failed to create post",
			err,
			nil,
		)
		return
	}

	utils.SendResponse(
		c,
		http.StatusCreated,
		"Successfully created post",
		nil,
		post,
	)
}

func UpdatePost(c *gin.Context) {
	id := c.Param("id")
	var post models.Post

	if err := c.ShouldBindJSON(&post); err != nil {
		utils.SendResponse(
			c,
			http.StatusBadRequest,
			"Could not update post: invalid input",
			err,
			nil,
		)
		return
	}

	query := `UPDATE posts SET title=$1, content=$2, author_id=$3 WHERE id=$4 RETURNING id, created_at, updated_at;`
	err := database.DB.QueryRow(
		c.Request.Context(),
		query,
		post.Title,
		post.Content,
		post.AuthorID,
		id,
	).Scan(&post.ID, &post.CreatedAt, &post.UpdatedAt)

	if err != nil {
		utils.SendResponse(
			c,
			http.StatusInternalServerError,
			"Could not update post",
			err,
			nil,
		)
		return
	}

	utils.SendResponse(
		c,
		http.StatusOK,
		"Successfully updated post",
		nil,
		post,
	)
}

func DeletePost(c *gin.Context) {
	id := c.Param("id")

	query := `DELETE FROM posts WHERE id=$1;`
	_, err := database.DB.Exec(c.Request.Context(), query, id)

	if err != nil {
		utils.SendResponse(c,
			http.StatusInternalServerError,
			"Could not delete post",
			err,
			false,
		)
		return
	}

	utils.SendResponse(
		c,
		http.StatusOK,
		"Successfully deleted post",
		nil,
		true,
	)
}

package handlers

import (
	"context"
	"log"
	"net/http"

	"blog-api/database"
	"blog-api/models"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

// CreateUser handles the creation of a new user.
func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, created_at, updated_at`
	err := database.DB.QueryRow(context.Background(), query, user.Name, user.Email, user.Password).Scan(&user.ID, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		log.Println("Error creating user: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, user)
}

// GetUsers retrieves all users.
func GetUsers(c *gin.Context) {
	query := `SELECT id, name, email, password, created_at, updated_at FROM users`
	rows, err := database.DB.Query(context.Background(), query)
	if err != nil {
		log.Println("Error getting users: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan user"})
			return
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, users)
}

// GetUser retrieves a single user by ID.
func GetUser(c *gin.Context) {
	id := c.Param("id")
	query := `SELECT id, name, email, password, created_at, updated_at FROM users WHERE id = $1`
	var user models.User
	err := database.DB.QueryRow(context.Background(), query, id).Scan(&user.ID, &user.Name, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err == pgx.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	} else if err != nil {
		log.Println("Error getting user: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// UpdateUser updates an existing user by ID.
func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `UPDATE users SET name = $1, email = $2, password = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4`
	_, err := database.DB.Exec(context.Background(), query, user.Name, user.Email, user.Password, id)
	if err != nil {
		log.Println("Error updating user: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
}

// DeleteUser deletes a user by ID.
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	query := `DELETE FROM users WHERE id = $1`
	_, err := database.DB.Exec(context.Background(), query, id)
	if err != nil {
		log.Println("Error deleting user: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

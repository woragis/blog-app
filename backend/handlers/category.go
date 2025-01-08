package handlers

import (
	"net/http"

	"blog-api/database"
	"blog-api/models"

	"github.com/gin-gonic/gin"
)

func CreateCategory(c *gin.Context) {
	var category models.Category

	// Bind JSON to the category struct
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Insert new category into the database
	query := `INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id, created_at, updated_at`
	err := database.DB.QueryRow(
		c.Request.Context(),
		query,
		category.Name,
		category.Description,
	).Scan(&category.ID, &category.CreatedAt, &category.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create category"})
		return
	}

	c.JSON(http.StatusCreated, category)
}

func GetAllCategories(c *gin.Context) {
	// Get all categories
	query := `SELECT id, name, description, created_at, updated_at FROM categories`
	rows, err := database.DB.Query(c.Request.Context(), query)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve categories"})
		return
	}
	defer rows.Close()

	var categories []models.Category
	for rows.Next() {
		var category models.Category
		if err := rows.Scan(&category.ID, &category.Name, &category.Description, &category.CreatedAt, &category.UpdatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process category data"})
			return
		}
		categories = append(categories, category)
	}

	c.JSON(http.StatusOK, gin.H{"categories": categories})
}

func GetCategoryByID(c *gin.Context) {
	id := c.Param("id")

	// Get category by ID
	query := `SELECT id, name, description, created_at, updated_at FROM categories WHERE id=$1`
	row := database.DB.QueryRow(c.Request.Context(), query, id)

	var category models.Category
	err := row.Scan(&category.ID, &category.Name, &category.Description, &category.CreatedAt, &category.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	c.JSON(http.StatusOK, category)
}

func UpdateCategory(c *gin.Context) {
	id := c.Param("id")
	var category models.Category

	// Bind JSON to the category struct
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Update category in the database
	query := `UPDATE categories SET name=$1, description=$2, updated_at=NOW() WHERE id=$3 RETURNING id, created_at`
	err := database.DB.QueryRow(
		c.Request.Context(),
		query,
		category.Name,
		category.Description,
		id,
	).Scan(&category.ID, &category.CreatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update category"})
		return
	}

	c.JSON(http.StatusOK, category)
}

func DeleteCategory(c *gin.Context) {
	id := c.Param("id")

	// Delete category from the database
	query := `DELETE FROM categories WHERE id=$1`
	_, err := database.DB.Exec(c.Request.Context(), query, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete category"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Category deleted successfully"})
}

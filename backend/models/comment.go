package models

import "time"

type Comment struct {
	ID        int       `json:"id"`
	Content   string    `json:"content"`
	PostID    int       `json:"post_id"`
	AuthorID  int       `json:"author_id"`
	CreatedAt time.Time `json:"created_at"`
}

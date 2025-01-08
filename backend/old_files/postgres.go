package database

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)

func InitDatabase() {
    conn, err := pgx.Connect(context.Background(), "postgres://user:password@localhost:5432/dbname")
    if err != nil {
        panic(err)
    }
    defer conn.Close(context.Background())

    var greeting string
    err = conn.QueryRow(context.Background(), "SELECT 'Hello, world!'").Scan(&greeting)
    if err != nil {
        panic(err)
    }
    fmt.Println(greeting)
}

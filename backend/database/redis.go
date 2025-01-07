package database

import (
	"log"

	"github.com/gomodule/redigo/redis"
)

func InitCache() {
    conn, err := redis.Dial("tcp", "localhost:6379")
    if err != nil {
        log.Fatal(err)
    }
    defer conn.Close()

    _, err = conn.Do("SET", "key", "value")
    if err != nil {
        log.Fatal(err)
    }

    value, err := redis.String(conn.Do("GET", "key"))
    if err != nil {
        log.Fatal(err)
    }
    log.Println("key:", value)
}

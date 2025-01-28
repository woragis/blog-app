package models

type Response struct {
	Status int        `json:"status"`
	Message string    `json:"message"`
	Error interface{} `json:"error"`
	Data interface{}  `json:"data"`
}
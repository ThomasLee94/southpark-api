package models

type Character struct {
	ID      bson.ObjectId	`json:"_id,omitempty" bson:"_id,omitempty"`
	Name  	string				`json:"name,omitempty" bson:"name,omitempty"`
	Lines 	[]string			`json:"lines" bson:"lines"`
}

// ResponseError model
type ResponseError struct {
	Error string `json:"error"`
}

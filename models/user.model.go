package models

type User struct {
	ID 			 bson.ObjectId `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string `json:"username,omitempty" bson:"username,omitempty"`
	Password string `json:"password,omitempty" bson:"password,omitempty"`
}
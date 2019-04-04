package mongodb

import(
	"os"
)

client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))



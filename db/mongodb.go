package mongodb

import(
	"os"
)

client, err := mongo.NewClient(options.Client().ApplyURI(os.MONGODB_URI))



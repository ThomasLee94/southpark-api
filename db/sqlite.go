package sqliteDB

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

type Line struct {
	gorm.Model
	Character string
	Lines     string
}

func InitialMigration() {
	db, err := gorm.Open("sqlite3", "test.db")
	if err != nil {
		fmt.Println(err.Error())
		panic("failed to connect to database")

	}
	defer db.Close()

	db.AutoMigrate(&Line{})
}

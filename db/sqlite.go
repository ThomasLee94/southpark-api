package sqlite

import "github.com/jinzhu/gorm"

func main() {
	db, err := gorm.Open("sqlite3", "/tmp/gorm.db")
	defer db.Close()
}

package character

import (
	"net/http"

	"github.com/go-chi/chi"
)

// Character model
type Character struct {
	Slug      string `json:"slug"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname`
}

// Character routes
func Routes() chi.Mux {
	router := chi.NewRouter()
	router.Get("/{characterID}", GetCharacter)
	router.Get("/", GetAllCharacters)
	return router
}

// Character controllers
func GetCharacter(w http.ResponseWriter, r *http.Request) {

}

// // RETURNS ALL CHARACTERS
// func GetAllCharacters() {
// 	const characters = await Character.find();
//   res.json(characters);
// }

// // RETURNS GET CHARACTER
// func GetCharacter() {

// }

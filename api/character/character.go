package character

import (
	"net/http"

	"github.com/ThomasLee94/southpark-api/api/config"
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
	router.Get("/{characterID}", config.GetCharacter)
	router.Get("/", config.GetAllCharacters)
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

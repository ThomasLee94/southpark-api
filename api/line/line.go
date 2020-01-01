type Line struct {
	gorm.Model
	Line        string `json:"line,omitempty"`
	CharacterID []Character
}
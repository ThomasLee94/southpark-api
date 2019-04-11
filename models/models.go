package models

import "github.com/jinzhu/gorm"

type Character struct {
	gorm.Model
	Name  string `json:"name,omitempty"`
	Lines []Line `json:"lines"`
}

type Line struct {
	gorm.Model
	Line        string `json:"line,omitempty"`
	Character   Character
	CharacterID uint
	Episode     Episode
	EpisodeID   uint
}

type Episode struct {
	gorm.Model
	EpisodeName   string      `json:"episodeName,omitempty"`
	EpisodeNumber int         `validate:"number, min:1, max:30", json:"episodeNum, omitempty"`
	SeasonNumber  int         `validate:"number, min=1, max=25", json:"seasonNum, omitempty"`
	CharacterID   []Character `json:"characterId,omitempty"`
	LineID        []Line      `json:"lineId,omitempty"`
}

type User struct {
	gorm.Model
	Username string `json:"username,omitempty"`
	Password string `json:"password,omitempty"`
}

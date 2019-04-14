package models

import "github.com/jinzhu/gorm"

type Season struct {
	gorm.Model
	SeasonNumber int    `validate:"number, min=1, max=25", json:"seasonNum, omitempty"`
	TotalEpisodes int   `json"totalEpisodes,omitempty"`
	EpisodeID []Episode
}

type Episode struct {
	gorm.Model
	EpisodeName   string      `json:"episodeName,omitempty"`
	EpisodeNumber int        `validate:"number, min=1, max=25", json:"episodeNum, omitempty"`
	LineID        []Line      `json:"lineId,omitempty"`
}

type Line struct {
	gorm.Model
	Line        string `json:"line,omitempty"`
	CharacterID []Character
}

type Character struct {
	gorm.Model
	FirstName  string `json:"firstName,omitempty"`
	LastName   string `json:"lastName,omitempty`
	
}

type User struct {
	gorm.Model
	Username string `json:"username,omitempty"`
	Password string `json:"password,omitempty"`
}

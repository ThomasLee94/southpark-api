type Episode struct {
	gorm.Model
	EpisodeName   string `json:"episodeName,omitempty"`
	EpisodeNumber int    `validate:"number, min=1, max=25", json:"episodeNum, omitempty"`
	LineID        []Line `json:"lineId,omitempty"`
}

// // RETURNS ALL EPISODES FOR ANY GIVEN SEASON
// func GetEpisodesBySeason() {

// }

// // RETURNS A SPECIFIC EPISODE
// // USER WILL NEED TO PROVIDE EPISODE ID
// func GetEpisode() {

// }

type Season struct {
	gorm.Model
	SeasonNumber  int `validate:"number, min=1, max=25", json:"seasonNum, omitempty"`
	TotalEpisodes int `json"totalEpisodes,omitempty"`
	EpisodeID     []Episode
}
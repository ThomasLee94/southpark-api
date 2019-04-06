package models

type Line struct {
	ID 					bson.ObjectId `json:"_id,omitempty" bson:"_id,omitempty"`
	Line 				string 				`required:"true"`
	CharacterId	bson.ObjectId	`json:"characterId,omitempty" bson:"characterId,omitempty"`
	EpisodeId		bson.ObjectId	`json:"episodeId,omitempty" bson:"episodeId,omitempty"`
}
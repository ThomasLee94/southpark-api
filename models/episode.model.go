package models

type Episode struct {
  ID            bson.ObjectId     `json:"_id,omitempty" bson:"_id,omitempty"`
  EpisodeName   string            `json:"episodeName,omitempty" bson:"episodeName,omitempty"`
  // TODO: FINISH
  EpisodeNumber int               `min: "1", max: "30", required: "true"`
	SeasonNumber  int               `min: "1", max: "25", required: "true"`
  CharacterId   []bson.ObjectId   'bson:"_id,omitempty" json:"object'
  LineId:       []bson.ObjectId   [{ type: Schema.Types.ObjectId, ref: 'Line' }],
}

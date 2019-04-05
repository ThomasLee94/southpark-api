package episodeModel

// TODO: FINISH
type Episode struct {
	episodeName string `required:"true"`
  episodeNumber int `min: "1", max: "30", required: "true"`
	seasonNumber int `min: "1", max: "25", required: "true"`
  characterId: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  lineId: [{ type: Schema.Types.ObjectId, ref: 'Line' }],
}

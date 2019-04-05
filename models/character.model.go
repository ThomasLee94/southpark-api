package characterModel

type Character struct {
	name  string
	lines []string
}

// ResponseError model
type ResponseError struct {
	Error string `json:"error"`
}

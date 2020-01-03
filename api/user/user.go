type User struct {
	gorm.Model
	Username string `json:"username,omitempty"`
	Password string `json:"password,omitempty"`
}

// func SignUp(req, res) {

// }

// func Login(req, res) {

// }

// func Logout(req, res) {

// }

// func AddEpisode(req, res) {

// }

// func AddLine(req, res) {

// }

// func UpdateEpisode(req, res) {

// }

// func UpdateLine(req, res) {

// }

// func DeleteEpisode(req, res) {

// }

// func DeleteLine(req, res) {

// }

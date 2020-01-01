// ─── CHARACTER CONTROLLERS ──────────────────────────────────────────────────────

package characterController

// RETURNS ALL CHARACTERS
func GetAllCharacters() {
	const characters = await Character.find();
  res.json(characters);
}

// RETURNS GET CHARACTER
func GetCharacter() {

}

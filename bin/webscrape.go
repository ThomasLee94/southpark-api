
package webscrape

import (
    "fmt"
	"log"
	"net/http"
	"github.com/ThomasLee94/southpark-api/blob/v2/bin/urls"
	"github.com/PuerkitoBio/goquery"
	"github.com/jinzhu/gorm"
)

urlEp := "https://southpark.fandom.com/wiki/Cartman_Gets_an_Anal_Probe/Script"
urlSeason := "https://southpark.fandom.com/wiki/Portal:Scripts/Season_One"

func scrape() {
	// ===========
	// INIT SQLITE
	// ===========
	db, err := gorm.Open("sqlite3", "/tmp/gorm.db")
	defer db.Close()

	// =================
	// REQUEST HTML PAGE 
	// =================
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	// ==================
	// LOAD HTML DOCUMENT
	// ==================
	docEp, err := goquery.NewDocument(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	docSeason, err := goquery.NewDocument(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	// ====================================
	// FIND IN ORDER OF HIERARCHY OF MODELS
	// ====================================

	// ** SEASON MODEL
	episodeAndSeasonNum := docEp.find("#mw-content-text").find("table").eq(-1).text().trim().split(':',1)[0];

	// season number
	if len(episodeAndSeasonNum) == 3 {
		seasonNum := episodeAndSeasonNum.substring(0,1)
	} else {
		seasonNum := episodeAndSeasonNum.substring(0,2)
	}

	// episode number
	if len(episodeAndSeasonNum) == 3 {
		episodeNum :=  episodeAndSeasonNum.substring(1)
	} else {
		episodeNum := episodeAndSeasonNum.substring(2)
	}

	// use different url to get length for total episodes
	totalEpisodes := 
	characterId := 

}	

func main() {
	scrape()
}


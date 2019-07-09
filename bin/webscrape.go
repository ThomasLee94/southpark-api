
package webscrape

import (
	// built-in imports
    "fmt"
	"log"
	"net/http"
	// SQLite driver
	"database/sql"
	// Models and urls
	"github.com/ThomasLee94/southpark-api/models/models"
	"github.com/ThomasLee94/southpark-api/blob/v2/bin/urls"
	// 3rd party imports
	"github.com/PuerkitoBio/goquery"
	"github.com/jinzhu/gorm"
	_ "github.com/mattn/go-sqlite3"
)

urlEp := "https://southpark.fandom.com/wiki/Cartman_Gets_an_Anal_Probe/Script"
urlSeason := "https://southpark.fandom.com/wiki/Portal:Scripts/Season_One"

func loadDocumentSeason(url_season) {

	""" Returns HTML body of url"""

	//    =================
	// || REQUEST HTML PAGE ||
	//    =================
	res, err := http.Get(url_season)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	//    ==================
	// || LOAD HTML DOCUMENT ||
	//    ==================

	docSeason, err := goquery.NewDocument(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	return docSeason

}

func loadDocumentEpisode(url_episode) {

	""" Returns HTML body of url"""

	//    =================
	// || REQUEST HTML PAGE ||
	//    =================
	res, err := http.Get(url_season)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	//    ==================
	// || LOAD HTML DOCUMENT ||
	//    ==================
	docEp, err := goquery.NewDocument(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	return docEp

}

func scrapeSeason(html_body) {
	""" Accepts HTML body and saves the Season model into db """ 

	// 	  ===========
	// || INIT SQLITE || 
	//    ===========
	db, err := gorm.Open("sqlite3", "/tmp/gorm.db")
	defer db.Close()

	//    ==================
	// || LOAD HTML DOCUMENT ||
	//    ==================
	docEp := loadDocument(html_body)


	//    ============
	// || SEASON MODEL ||
	//    ============

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
	totalEpisodes := 0
	episodeId := []string

	//    ===================
	// || SAVING SEASON MODEL ||
	//    ===================

	CREATE TABLE IF NOT EXIST `Season` (
		id INTEGER PRIMARY KEY,
		SeasonNumber INTEGER,
		TotalEpisodes INTEGER,
		FOREIGN KEY(episodeId) REFERENCES episode(id)
	)

	//    ===========================
	// || GOROUTINES FOR ASYNC TABLES ||
	//    ===========================

	channel := make(chan string)

	go scrapeEpisode()

}



func scrapeEpisode() {
	""" Accepts HTML body and saves Episode model into db """

	episodeNum := 

}

func main() {
	scrapeSeason()

}


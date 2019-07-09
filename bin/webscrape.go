
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

url_ep := "https://southpark.fandom.com/wiki/Cartman_Gets_an_Anal_Probe/Script"
url_season := "https://southpark.fandom.com/wiki/Portal:Scripts/Season_One"

func load_document_total_eps(url_season string) string {

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

func load_document_ep_model(url_episode string) string {

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

func scrape_total_ep_in_season_num(url string) string {

	""" Rreturns the number of episodes in given season page """

	doc := load_document_total_eps(url)

	total_episodes := doc.find("div.item").length
	return total_episodes


}

func scrape_season(url_episode string, url_season string) {
	""" Accepts HTML body and saves the Season model into db """ 

	// 	  ===========
	// || INIT SQLITE || 
	//    ===========
	db, err := gorm.Open("sqlite3", "/tmp/gorm.db")
	defer db.Close()

	//    ==================
	// || LOAD HTML DOCUMENT ||
	//    ==================
	docEp := load_document_ep_model(url_episode)


	//    ============
	// || SEASON MODEL ||
	//    ============

	episode_and_season_num := docEp.find("#mw-content-text").find("table").eq(-1).text().trim().split(':',1)[0];

	// season number
	if len(episodeAndSeasonNum) == 3 {
		season_num := episode_and_season_num.substring(0,1)
	} else {
		season_num := episode_and_season_num.substring(0,2)
	}

	// episode number
	if len(episodeAndSeasonNum) == 3 {
		episodeNum :=  episodeAndSeasonNum.substring(1)
	} else {
		episodeNum := episodeAndSeasonNum.substring(2)
	}

	// use different url to get length for total episodes
	total_episodes := load_document_total_eps(url_season)
	episode_id := []string

	//    ===================
	// || SAVING SEASON MODEL ||
	//    ===================

	CREATE TABLE IF NOT EXIST `Season` (
		id INTEGER PRIMARY KEY,
		season_number INTEGER,
		total_episodes INTEGER,
		FOREIGN KEY(episode id) REFERENCES Episode(id)
	)

	//    ===========================
	// || GOROUTINE FOR ASYNC TABLES ||
	//    ===========================

	channel := make(chan string)

	go scrape_episode()

}

func scrape_episode() {
	""" Accepts HTML body and saves Episode model into db """

	doc = load

	episode_num := 
	season_num := 

	CREATE TABLE IF NOT EXIST `Episode` (
		id INTEGER PRIMARY KEY,
		episode_number INTEGER,
		total_episodes INTEGER,
		FOREIGN KEY(Lines id) REFERENCES Lines(id)
	)

}

func scrape_lines() {
	""" Accepts HTML body and saves Lines model into db """

	doc = load

	character_name := 
	episode_num :=
	character_id :=  

	CREATE TABLE IF NOT EXIST `Lines` (
		id INTEGER PRIMARY KEY,
		episode_number INTEGER,
		total_episodes INTEGER,
		FOREIGN KEY(Character id) REFERENCES Character(id)
	)

}

func scrape_characters() {
	""" Accepts HTML body and saves Lines model into db """

	doc = load

	character_name := 
	lines_slice := 

	CREATE TABLE IF NOT EXIST `Character` (
		id INTEGER PRIMARY KEY,
		episode_number INTEGER,
		total_episodes INTEGER,
		FOREIGN KEY(Lines id) REFERENCES Lines(id)
	)

}

func main() {
	scrape_season()

}


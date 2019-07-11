
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

func load_doc(url string) string {

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
	doc, err := goquery.NewDocument(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	return doc

}

func scrape_season() {
	""" Returns the number of episodes in given season page """

	doc := load_doc(url_season)

	season_number_string := doc.find("h1.page-header__title").split(" ")[1]
	total_episodes := doc.find("div.item").length
	
	CREATE TABLE IF NOT EXIST `Season` (
		id INTEGER PRIMARY KEY,
		season_number STRING,
		total_episodes INTEGER,
		FOREIGN KEY(episode id) REFERENCES Episode(id)
	)

}

func scrape_episode(url_episode string) {
	""" Accepts HTML body and saves the Season model into db """ 

	// 	  ===========
	// || INIT SQLITE || 
	//    ===========
	db, err := gorm.Open("sqlite3", "/tmp/gorm.db")
	defer db.Close()

	//    ==================
	// || LOAD HTML DOCUMENT ||
	//    ==================
	docEp := load_doc(url_episode)


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
	doc_season := load_doc(url_season)
	doc_ep := load_doc(url_episode)
	total_eps_in_season := scrape_total_ep_in_season_num(url)
	scrape_season(url_episode, url_season)
	go scrape_episodes()
	go scrape_lines()
	go scrape_characters()
}


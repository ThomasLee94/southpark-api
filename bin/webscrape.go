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

// CHANNELS FOR CONCURRENT SCRAPING OF GIVEN MODEL
done_season := make(chan bool)
done_episode:= make(chan bool)
done_lines := make(chan bool)
done_character := make(chan bool)

func db_init() {
	// 	  ===========
	// || INIT SQLITE || 
	//    ===========
	db, err := gorm.Open("sqlite3", "/tmp/gorm.db")
	defer db.Close()
}

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

	db_init()

	doc := load_doc(url_season)

	season_number_string := doc.find("h1.page-header__title").split(" ")[1]
	total_episodes := doc.find("div.item").length

	
	
	CREATE TABLE IF NOT EXIST `Season` (
		id INTEGER PRIMARY KEY,
		season_number STRING,
		total_episodes INTEGER
	)

}

func scrape_episode(url_episode string) {
	""" Accepts HTML body and saves the Season model into db """ 

	db_init()

	docEp := load_doc(url_episode)

	//    ==============
	// || EPISODE MODEL ||
	//    ==============

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

	//    =====================
	// || SAVING EPISODE MODEL ||
	//    =====================

	CREATE TABLE IF NOT EXIST `Episode` (
		id INTEGER PRIMARY KEY,
		season_number INTEGER,
		total_episodes INTEGER,
		FOREIGN KEY(season id) REFERENCES Season(id)
	)

}

func scrape_lines() {
	""" Accepts HTML body and saves Lines model into db """

	db_init()

	doc = load

	character_name := 
	episode_num :=
	character_id :=  

	//    ============
	// || LINES MODEL ||
	//    ============

	CREATE TABLE IF NOT EXIST `Lines` (
		id INTEGER PRIMARY KEY,
		episode_number INTEGER,
		total_episodes INTEGER,
		FOREIGN KEY(Episode id) REFERENCES Episode(id)
	)

}

func scrape_characters() {
	""" Accepts HTML body and saves Lines model into db """

	db_init()

	doc = load

	character_name := 
	lines_slice := 

	//    ===============
	// || CHARACTER MODEL ||
	//    ===============

	CREATE TABLE IF NOT EXIST `Character` (
		id INTEGER PRIMARY KEY,
		episode_number INTEGER,
		total_episodes INTEGER,
		FOREIGN KEY(Lines id) REFERENCES Lines(id)
	)

}

func main(Urls_season map, Urls_episodes map) {
	doc_season := load_doc(url_season)
	doc_ep := load_doc(url_episode)
	total_eps_in_season := scrape_total_ep_in_season_num(url)

	// for key, value := range season_map {
			// go func(number string, url string) {
				// scrape_season(url_episode, url_season)
			// }(key, value)
			// done<-true
	// }
	// <- done_season

	scrape_season(url_episode, url_season)
	go scrape_episodes()
	go scrape_lines()
	go scrape_characters()
}


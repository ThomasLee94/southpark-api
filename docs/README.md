![](/images/southpark-banner.png)

# South Park API

This will serve as documentation for my custom made South Park API. 

Users will be able to:
	1.	Query for all lines per character. 

	2.	Query for character lines per episode.

	3.	Query all words said per character, per episode.

## Package Manager

* npm

## Data Collection

* [Nightmare.js](http://www.nightmarejs.org/)
* [Cheerio.js](https://cheerio.js.org/)

My data was scraped from [here](https://southpark.fandom.com/wiki/South_Park_Archives). If you would like to run the webscraper that I have provided, please refer to the Cheerio documentation. 

## Technology

* [Node.JS]
* [Express.JS] 

## Persistence Layer

* MongoDB


## REST

### Authentication

**baseURL:** https://.../api/auth

Only authenticated will be able to make RESTfull POST, UPDATE & DELETE API calls.  

| Verb          | Route                                   | Description                            |
| ------------- |:---------------------------------------:| --------------------------------:      |
| POST          | /sign-up                                | Sign up to get issued a token          |
| POST          | /login                                  | Login to be able to access routes      |
| DELETE        | /logout                                 | Delete issued token                    |


```
Example Sign-up request in JSON format with Insomnia or Postman.

{
	"username": "tom",
	"password": "123"
}

```

### Data Manipulation

**baseURL:** https://.../api/auth

| Verb          | Route                                   | Description                            |
| ------------- |:---------------------------------------:| --------------------------------:      |
| POST          | /create-episode/:season/:episode        | Create new episode                     |
| POST          | /create-line/:season/:episode           | Create new line                        |
| PUT           | /update-episode/:season/:episode        | Update existing episode                |
| PUT           | /update-line/:season/:episode           | Update existing line                   |
| DELETE        | /delete-episode/:season/:episode        | Delete existing episode                |
| DELETE        | /delete-episode/:season/:episode        | Delete existing line                   |


### Episode Objects

**baseURL:** https://.../api/episodes

#### Episode Schema

| Verb           | Route                                  | Description                            |
| -------------  |:--------------------------------------:| --------------------------------:      |
| GET            | /:season                               | Get all episodes for a given season    |
| GET            | /:episodeName                          | Get a specific episode by name         |

Example API call:
```
router.get('/api/episodes/4/episodes', (req, res) => {
  ...
})
```

### Character Objects

**baseURL:** https://.../api/characters

| Verb           | Route                                  | Description                            |
| -------------  |:--------------------------------------:| --------------------------------:      |
| GET            | /                                      | Get all characters                     |
| GET            | /:characterName                        | Get a specific character by name       |

### Line Objects

**baseURL:** https://.../api/lines

| Verb           | Route                                  | Description                            |
| -------------  |:--------------------------------------:| --------------------------------:      |
| GET            | /:season                               | Get all lines for a given season       |
| GET            | /:season/:episode/:characterName       | Get lines for a specific character by name for any episode   |
| GET            | /character/:characterName              | Get all lines for a specific character |

## License
This project is licensed under the Apache License 2.0 - see the <a href="https://github.com/ThomasLee94/southpark-api/blob/master/LICENSE">LICENSE</a> file for details

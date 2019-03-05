# South Park API

This will serve as documentation for my custom made South Park API. 

## Package Manager

* npm

## Data Collection

* Nightmare.js
* Cheerio.js

My data was scraped from here. If you would like to run the webscraper that I have provided 

## Technology

* Node.JS
* Express.JS

## Persistence Layer

* MongoDB


## REST
*baseURL:* https://.../api

### Authentication
Only authenticated will be able to make RESTfull POST, UPDATE & DELETE API calls.  

| Verb                | Route                                            | Description                            |
| -------------       |:------------------------------------------------:| --------------------------------:      |
| POST                | /sign-up                                         | Sign up to get issued a token          |
| POST                | /login                                           | Login to be able to access routes      |
| DELETE              | /logout                                          | Delete issued token                    |

### Episode Objects

| Verb                | Route                                            | Description                            |
| -------------       |:------------------------------------------------:| --------------------------------:      |
| GET                 | /episodes/:season/episodes                       | Get all episodes for a given season    |
| GET                 | /episodes/:episodeName                           | Get a specific episode by name         |

Example API call:
```
router.get('/api/episodes/4/episodes', (req, res) => {
  ...
})
```

### Character Objects

| Verb                | Route                                            | Description                            |
| -------------       |:------------------------------------------------:| --------------------------------:      |
| GET                 | /characters                                      | Get all characters                     |
| GET                 | /characters/:characterName                       | Get a specific character by name       |

### Line Objects

| Verb                | Route                                            | Description                            |
| -------------       |:------------------------------------------------:| --------------------------------:      |
| GET                 | /lines/:season                                   | Get all lines for a given season       |
| GET                 | /lines/:season/:episode/:characterName           | Get lines for a specific character by name for any episode of any season         |
| GET                 | /lines/character/:characterName                  | Get all lines for a specific character |

## Acknowledgement

* Hat tip to anyone who's code was used.

## License
This project is licensed under the Apache License 2.0 - see the <a href="">LICENSE</a> file for details

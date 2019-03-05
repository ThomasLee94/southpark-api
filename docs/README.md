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

### Authentication

*baseURL:* https://.../api/auth

Only authenticated will be able to make RESTfull POST, UPDATE & DELETE API calls.  

| Verb          | Route                                   | Description                            |
| ------------- |:---------------------------------------:| --------------------------------:      |
| POST          | /sign-up                                | Sign up to get issued a token          |
| POST          | /login                                  | Login to be able to access routes      |
| DELETE        | /logout                                 | Delete issued token                    |

### Data Manipulation

*baseURL:* https://.../api/auth

| Verb          | Route                                   | Description                            |
| ------------- |:---------------------------------------:| --------------------------------:      |
| POST          | /create-episode/:season/:episode        | Sign up to get issued a token          |
| POST          | /create-line/:season/:episode           | Login to be able to access routes      |
| PUT           | /update-episode/:season/:episode        | Delete issued token                    |
| PUT           | /update-line/:season/:episode           | Delete issued token                    |
| DELETE        | /delete-episode/:season/:episode        | Delete issued token                    |
| DELETE        | /delete-episode/:season/:episode        | Delete issued token                    |


### Episode Objects

*baseURL:* https://.../api/episodes

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

*baseURL:* https://.../api/characters

| Verb           | Route                                  | Description                            |
| -------------  |:--------------------------------------:| --------------------------------:      |
| GET            | /                                      | Get all characters                     |
| GET            | /:characterName                        | Get a specific character by name       |

### Line Objects

*baseURL:* https://.../api/lines

| Verb           | Route                                  | Description                            |
| -------------  |:--------------------------------------:| --------------------------------:      |
| GET            | /:season                               | Get all lines for a given season       |
| GET            | /:season/:episode/:characterName       | Get lines for a specific character by name for any episode   |
| GET            | /character/:characterName              | Get all lines for a specific character |

## Acknowledgement

* Hat tip to anyone who's code was used.

## License
This project is licensed under the Apache License 2.0 - see the <a href="https://github.com/ThomasLee94/southpark-api/blob/master/LICENSE">LICENSE</a> file for details

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
Only authenticated will be able to make RESTfull API calls.  

### Episode Objects

| Verb                | Route                                            | Description                       |
| -------------       |:------------------------------------------------:| --------------------------------: |
| GET                 | /episodes/:season/episodes                       |Get all scholarships               |
| GET                 | /episodes/:episodeName                           |Get a specific scholarship         |

Example API call:
```
router.get('/api/episodes/4/episodes', (req, res) => {
  ...
})
```

### Character Objects

| Verb                | Route                                            | Description                       |
| -------------       |:------------------------------------------------:| --------------------------------: |
| GET                 | /characters                                      | Get scholarship by ehtnicity      |
| GET                 | /characters/:characterName                       | Get scholarship by date           |

### Line Objects

| Verb                | Route                                            | Description                       |
| -------------       |:------------------------------------------------:| --------------------------------: |
| GET                 | /lines/:season                               |Get all matching scholarships      |
| GET                 | /lines/:season/:episode/:characterName       |Get the user account profile       |
| GET                 | /lines/character/:characterName              |Get the user account profile       |

## Acknowledgement

* Hat tip to anyone who's code was used.

## License
This project is licensed under the Apache License 2.0 - see the <a href="">LICENSE</a> file for details

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

* [Node.JS](https://nodejs.org/en/)
* [Express.JS](https://expressjs.com/) 

## Persistence Layer

* [MongoDB](https://www.mongodb.com/)

## REST

### Authentication

**baseURL:** https://.../api/auth

Only authenticated will be able to make RESTfull POST, UPDATE & DELETE API calls. JWT's were used for authentication.

| Verb          | Route                                   | Description                            |
| ------------- |:---------------------------------------:| --------------------------------:      |
| POST          | /sign-up                                | Sign up to get issued a token          |
| POST          | /login                                  | Login to be able to access routes      |
| DELETE        | /logout                                 | Delete issued token                    |

**Example Sign-up request.**
All parameters are in JSON format. 


```json

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

**Add Episode Example**
The following keys must be provided: 

```json
{
	"episodeName": "Example add episode",
	"seasonNumber": "12",
	"episodeNumber": "1",
	"line": "This is easy!",

}

```



**Add Line Example**
Lines cannot be added to characters that do no already exist.
The following keys must be provided:

```json
{
    "line": "Example line",
    "seasonNumber": "3",
    "episodeNumber": "1",
    "character": "Stan",
}

```


**Update Episode Example**
The following key-values must be provided:

```json
{
    "episodeName": "Example episode name",
    "episodeNumber": "6",
    "seasonNumber": "2",
}
```

**Update Line Example**
lineId must be provided in URL.
The following key-values must be provided:

```json
{
    "line": "Example line"
}
```


**Delete Episode Example**
The following key-values must be provided:

```json
{
    "episodeNumber": "5",
    "seasonNumber": "1",
}
```


**Delete Line Example**
***EXAMPLE URL***
lineId must be provided in the URL.


### Episode Objects

**baseURL:** https://.../api/episodes

#### Episode Schema

| Key           | Value                                  | Description                            |
| ------------- |:--------------------------------------:| --------------------------------:      |
| episodeName   | String                               	 | Name of episode    					  |
| episodeNumber | Number                                 | Episode number         				  |
| seasonNumber  | Number                                 | Season number         				  |
| characterId   | Schema Reference - 'Character'         | Character Schema reference   		  |
| lineId        | Schema Referene - 'Line'               | Line Schema reference        		  |


#### Episode Routes

| Verb           | Route                                  | Description                            |
| -------------  |:--------------------------------------:| --------------------------------:      |
| GET            | /:season/episodes                      | Get all episodes for a given season    |
| GET            | /:episodeId                            | Get a specific episode by id	       |

Example Episode by Season API call:
```
https://...heroku.app.com/3/episodes
```

```json
{
    "characterId": [
      "5c7dd325107279b93ee2db81",
      "5c7dd323107279b93ee2dac7",
      ...
    ],
    "lineId": [
      "5c7dd3f0107279b93ee33ae6",
      "5c7dd3f0107279b93ee33ae7",
      ...
    ],
    "_id": "5c7dd3f0107279b93ee33ae5",
    "episodeName": "\n World Wide Recorder Concert\n",
    "episodeNumber": 17,
    "seasonNumber": 3,
    "__v": 1
  },
  {
    "characterId": [
      "5c7dd322107279b93ee2d9b7",
      "5c7dd323107279b93ee2da89",
      ...
    ],
    "lineId": [
      "5c7dd3f3107279b93ee33c56",
      "5c7dd3f3107279b93ee33c57",
    ],
    "_id": "5c7dd3f3107279b93ee33c55",
    "episodeName": "\n Are You There God? It's Me, Jesus\n",
    "episodeNumber": 16,
    "seasonNumber": 3,
    "__v": 1
  },
  {
    "characterId": [
      "5c7dd34e107279b93ee2ef43",
      "5c7dd3f6107279b93ee33d7d",
      ...
    ],
    "_id": "5c7dd3f6107279b93ee33d7b",
    "episodeName": "\n Mr. Hankey's Christmas Classics\n",
    "episodeNumber": 15,
    "seasonNumber": 3,
    "__v": 1
  },
  {
    "characterId": [
      "5c7dd322107279b93ee2d9b7",
      "5c7dd323107279b93ee2dac3",
      ...
    ],
    "lineId": [
      "5c7dd3f8107279b93ee33ed1",
      "5c7dd3f8107279b93ee33ed2",
      ...
    ],
    "_id": "5c7dd3f8107279b93ee33ed0",
    "episodeName": "\n The Red Badge of Gayness\n",
    "episodeNumber": 14,
    "seasonNumber": 3,
    "__v": 1
  },
  {
    "characterId": [
      "5c7dd325107279b93ee2db09",
      "5c7dd323107279b93ee2dac3",
      ...
    ],
    ...
}
```

Some exampls episode id's:

```
Season 1, Episode 1: 5c7dd474107279b93ee37d69 => Name: Cartman Gets an Anal Probe
Season 1, Episode 2: 5c7dd471107279b93ee37c22 => Name: Weight Gain 4000

Season 2, Episode 1: 5c7dd451107279b93ee36c5c => Name: Terrance and Phillip in Not Without My Anus
Season 2, Episode 2: 5c7dd44f107279b93ee36ae2 => Name: Cartman's Mom is Still a Dirty Slut

Season 3, Episdoe 1: 5c7dd401107279b93ee3434c => Name: Korn's Groovy Pirate Ghost Mystery
Season 3, Episode 2: 5c7dd3fe107279b93ee341a9 => Name: Chinpokomon

Season 4, Episode 1: 5c7dd3ea107279b93ee337d5 => Name: Cartman's Silly Hate Crime 2000
Season 4, Episode 2: 5c7dd3e8107279b93ee33668 => Name: Timmy 2000

...
```

Example API call by episode id:
```
https://...herokuapp.com/5c7dd3cd107279b93ee32891
```
Received JSON
```js
{
    "_id" : ObjectId("5c7dd3cd107279b93ee32891"),
    "characterId" : [ 
        ObjectId("5c7dd328107279b93ee2dc06"), 
        ObjectId("5c7dd323107279b93ee2da89"), 
        ObjectId("5c7dd322107279b93ee2d9b7"), 
        ...
    ],
    "lineId" : [ 
        ObjectId("5c7dd3cd107279b93ee32892"), 
        ObjectId("5c7dd3cd107279b93ee32893"), 
        ObjectId("5c7dd3cd107279b93ee32894"), 
				...
    ],
    "episodeName" : "\n Helen Keller! The Musical\n",
    "episodeNumber" : 14,
    "seasonNumber" : 4,
    "__v" : 1
}
```

### Character Objects

**baseURL:** https://.../api/characters

#### Character Schema

| Key           | Value                                  | Description                            |
| ------------- |:--------------------------------------:| --------------------------------:      |
| name          | String                               	 | Character name    					  |
| lines         | [String]                               | Episode number         				  |

#### Character Routes
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

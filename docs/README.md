![](/images/southpark-banner.png)

# South Park API

This will serve as documentation for my custom made South Park API. 

Users will be able to:

	1.	Query for all episodes per season. 

	2.	Query for character lines per episode.

	3.	Query all words said per character, per episode.

## Package Manager

* npm

## Data Collection

* [Nightmare.js](http://www.nightmarejs.org/)
* [Cheerio.js](https://cheerio.js.org/)

My data was scraped from [here](https://southpark.fandom.com/wiki/South_Park_Archives). Source code for the webscrapping is [here](https://github.com/ThomasLee94/southpark-api/blob/master/bin/webscrapeText.js). If you would like to run the webscraper that I have provided, please refer to the Cheerio documentation. 

## Technology

* [Node.JS](https://nodejs.org/en/)
* [Express.JS](https://expressjs.com/) 

## Persistence Layer

* [MongoDB](https://www.mongodb.com/)

## REST

Currently only seasons 1-8 are available, more can be scrapped at a later date. 

### Authentication

**baseURL:** https://southpark-api.herokuapp.com/api/auth 

Only authenticated will be able to make RESTfull POST, UPDATE & DELETE API calls. JWT's were used for authentication.

| Verb          | Route                                   | Description                            |
| ------------- |:---------------------------------------:| --------------------------------:      |
| POST          | /sign-up                                | Sign up to get issued a token          |
| POST          | /login                                  | Login to be able to access routes      |
| GET           | /logout                                 | Delete issued token                    |

**Example Sign-up request.**
All parameters are in JSON format. 


```json
{
	"username": "tom",
	"password": "123"
}
```

### Data Manipulation

**baseURL:** https://southpark-api.herokuapp.com/api/auth

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
	"episodeNumber": "1"

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
    "character": "Stan"
}
```

**Update Episode Example**
The following key-values must be provided:

```json
{
    "episodeName": "Example episode name",
    "episodeNumber": "6",
    "seasonNumber": "2"
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
    "seasonNumber": "1"
}
```


**Delete Line Example**
lineId must be provided in the URL.
```
https://southpark-api.herokuapp.com/api/auth/delete-line/8/14/5c7dd322107279b93ee2d9b2
```

### Episode Objects

**baseURL:** https://southpark-api.herokuapp.com/api/episodes

#### Episode Schema

| Key           | Value                                  | Description                            |
| ------------- |:--------------------------------------:| --------------------------------:      |
| episodeName   | String                               	 | Name of episode    					  |
| episodeNumber | Number                                 | Episode number         				  |
| seasonNumber  | Number                                 | Season number         				  |
| characterId   | Schema Reference                       | Character Schema reference   		  |
| lineId        | Schema Referene                        | Line Schema reference        		  |


#### Episode Routes

| Verb           | Route                                  | Description                            |
| -------------  |:--------------------------------------:| --------------------------------:      |
| GET            | /:season/episodes                      | Get all episodes for a given season    |
| GET            | /:episodeId                            | Get a specific episode by id	         |

Example Episode by Season API call:
```
https://southpark-api.herokuapp.com/api/episodes/3/episodes 
```

```js
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
https://southpark-api.herokuapp.com/api/episodes/5c7dd3cd107279b93ee32891
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

**baseURL:** https://southpark-api.herokuapp.com/api/characters

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

Example All Charactres API call:
```
https://southpark-api.herokuapp.com/api/characters
```
Received JSON. This API call returns all the characters, which contain their lines. Expect a large response.
```js
{
    "lines": [
      "5c7dd322107279b93ee2d9b2",
      "5c7dd322107279b93ee2d9b3",
      ...
    ],
    "_id": "5c7dd322107279b93ee2d9b1",
    "name": "Narrator",
    "__v": 0
  },
  {
    "lines": [
      "5c7dd322107279b93ee2d9b5",
      "5c7dd322107279b93ee2d9fd"
    ],
    "_id": "5c7dd322107279b93ee2d9b4",
    "name": "Woodland Critters",
    "__v": 0
  },
  {
    "lines": [
      "5c7dd322107279b93ee2d9b8",
      "5c7dd322107279b93ee2d9bf"
      ...
    ],
    "_id": "5c7dd322107279b93ee2d9b7",
    "name": "Stan",
    "__v": 0
  },
  ...
}
```


### Line Objects

#### Line Schema

| Key           | Value                                  | Description                            |
| ------------- |:--------------------------------------:| --------------------------------:      |
| line          | String                               	 | Line content    					      |
| characterId   | Schema Reference                       | Character Schema reference             |
| episodeId     | Schema Reference                       | Episode Schema reference        		  |

#### Line Routes

**baseURL:** https://southpark-api.herokuapp.com/api/lines

| Verb           | Route                                  | Description                            |
| -------------  |:--------------------------------------:| --------------------------------:      |
| GET            | /:season                               | Get all lines for a given season       |
| GET            | /:season/:episode                      | Get all lines for an episode           |
| GET            | /:season/:episode/:characterId/:episodeId   | Get lines for a specific character by name for any episode   |

Example All Lines for a Season API call:
```
https://southpark-api.herokuapp.com/api/lines/6
```
Received JSON
```js
{
    "_id": "5c7dd366107279b93ee2fba6",
    "line": " Ah-a-a-alright, I'm done.\n",
    "characterId": "5c7dd366107279b93ee2fba5",
    "__v": 0
  },
  {
    "_id": "5c7dd366107279b93ee2fba7",
    "line": " You're done?\n",
    "characterId": "5c7dd323107279b93ee2dac3",
    "__v": 0
  },
  {
    "_id": "5c7dd366107279b93ee2fba8",
    "line": " Ye-yes, I-I've tallied up all the times you've been naughty and deducted the times you've been nice.\n",
    "characterId": "5c7dd366107279b93ee2fba5",
    "__v": 0
  },
  {
    "_id": "5c7dd366107279b93ee2fba9",
    "line": " Yeah, so how's it look?\n",
    "characterId": "5c7dd323107279b93ee2dac3",
    "__v": 0
  },
...
```

Example Lines for an Episode API call for season 3 episode 1:
```
https://southpark-api.herokuapp.com/api/lines/3/1
```
```js
{
    "_id": "5c7dd41a107279b93ee35036",
    "line": " Okay, children, we have a special guest today, a woman recruiting young people [she walks to the group and smiles] for a national choir tour. Now I know that choir tours are totally stupid and lame [she frowns], but please, give her your full attention. [to her] Go ahead.\n",
    "characterId": "5c7dd323107279b93ee2dac7",
    "__v": 0
  },
  {
    "_id": "5c7dd41a107279b93ee35038",
    "line": " Uh. Thank you, Mr. Garrison. [cheerfully] How are we all doing today?! [the kids' eyes wander] I can't hear you! I said, How are we all doing?! [Cartman farts]\n",
    "characterId": "5c7dd41a107279b93ee35037",
    "__v": 0
  },
  {
    "_id": "5c7dd41a107279b93ee35039",
    "line": " [angrily] Eric Cartman, you say ‘’excuse me”!\n",
    "characterId": "5c7dd323107279b93ee2dac7",
    "__v": 0
  },
  ...
```

Example Character Ids
```
Stan: 5c7dd322107279b93ee2d9b7
Butters: 5c7dd323107279b93ee2daca
Kyle: 5c7dd323107279b93ee2da89
```

Example Lines for a Season by Character API call:

Requires characterId & episodeId.
```
https://southpark-api.herokuapp.com/api/lines/character-lines/5c7dd323107279b93ee2daca/5c7dd3ea107279b93ee337d5
```
Received JSON
```js
{
    "_id": "5c7dd323107279b93ee2dacb",
    "line": " Well but, but what happened?\n",
    "characterId": "5c7dd323107279b93ee2daca",
    "__v": 0
  },
  {
    "_id": "5c7dd323107279b93ee2dad6",
    "line": " Aw well, come on. Let him read us the end.\n",
    "characterId": "5c7dd323107279b93ee2daca",
    "__v": 0
  },
  {
    "_id": "5c7dd325107279b93ee2daf7",
    "line": " Yeah. I think it'd be better to start lower.\n",
    "characterId": "5c7dd323107279b93ee2daca",
    "__v": 0
  },
  {
    "_id": "5c7dd325107279b93ee2db5f",
    "line": " Wuh be careful, Kyle.\n",
    "characterId": "5c7dd323107279b93ee2daca",
    "__v": 0
  },
  ...
```


## License
This project is licensed under the Apache License 2.0 - see the <a href="https://github.com/ThomasLee94/southpark-api/blob/master/LICENSE">LICENSE</a> file for details

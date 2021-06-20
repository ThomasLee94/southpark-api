![](/docs/images/southpark-banner.png)

# South Park API

This will serve as documentation for my custom made South Park API. 

Users will be able to:

	1.	Query for all episodes per season. 

	2.	Query for character lines per episode.

	3.	Query lines said per character, per episode.

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
https://southpark-api.herokuapp.com/api/episodes/1/episodes 
```

```js
[
  {
    "characterId": [
      "60cd771a4fcba1557213ca74",
      "60cd569a4fcba1557210fdc9",
      "60cd569a4fcba1557210fdda",
      ...
    
    ],
    "lineId": [
      {
        "_id": "60cd771a4fcba1557213ca77",
        "line": "...And so, these ancient…rowheads every month.\n",
        "characterId": {
          "lines": [],
          "_id": "60cd771a4fcba1557213ca74",
          "name": "Anthropologist",
          "__v": 0
        },
        "__v": 0
      },
      ...
    ],
    "_id": "60cd771a4fcba1557213ca71",
    "episodeName": "\nMecha-Streisand\n",
    "episodeNumber": 12,
    "seasonNumber": 1,
    "__v": 1
  },
]
```

Some exampls episode id's:

```
Season 1, Episode 2: 60cd7b524fcba1557214097a => Name: Weight Gain 4000

Season 2, Episode 17: 60cd6f7c4fcba15572134258 => Name: Gnomes

Season 3, Episdoe 10: 60cd6b144fcba1557212eca3 => Name: Chinpokomon
...
```

Example API call by episode id:
```
https://southpark-api.herokuapp.com/api/episodes/60cd6b144fcba1557212eca3
```
Received JSON
```js
{
  "characterId": [
    "60cd6b144fcba1557212eca6",
    "60cd569a4fcba1557210fdc9",
    "60cd6b154fcba1557212ecbc",
    ...
  ],
  "lineId": [
    {
      "_id": "60cd6b144fcba1557212eca9",
      "line": "Reowr.\n",
      "characterId": {
        "lines": [],
        "_id": "60cd6b144fcba1557212eca6",
        "name": "Kitty",
        "__v": 0
      },
      "__v": 0
    },
    {
      "_id": "60cd6b154fcba1557212ecae",
      "line": "No, Kitty, these are my spicy-hot Louisiana-baked Chicken Tenders!\n",
      "characterId": {
        "lines": [],
        "_id": "60cd569a4fcba1557210fdc9",
        "name": "Cartman",
        "__v": 0
      },
    ...
  ],
  "_id": "60cd6b144fcba1557212eca3",
  "episodeName": "\nChinpokomon\n",
  "episodeNumber": 10,
  "seasonNumber": 3,
  "__v": 1
}
```


### Character Objects

**baseURL:** https://southpark-api.herokuapp.com/api/characters

#### Character Schema

| Key           | Value                                  | Description                            |
| ------------- |:--------------------------------------:| --------------------------------:      |
| name          | String                               	 | Character name    					            |
| lines         | [String]                               | Episode number         				        |

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
[
  {
    "lines": [],
    "_id": "60cd566e4fcba1557210f8ba",
    "name": "Narrator",
    "__v": 0
  },
  {
    "lines": [],
    "_id": "60cd566f4fcba1557210f8c6",
    "name": "Woodland Critters",
    "__v": 0
  },
  {
    "lines": [],
    "_id": "60cd566f4fcba1557210f8d2",
    "name": "Stan",
    "__v": 0
  },
  ...
]
```


### Line Objects

#### Line Schema

| Key           | Value                                  | Description                            |
| ------------- |:--------------------------------------:| --------------------------------:      |
| line          | String                               	 | Line content    					              |
| characterId   | Schema Reference                       | Character Schema reference             |
| episodeId     | Schema Reference                       | Episode Schema reference        		    |

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
[
  {
    "_id": "60cd5c4e4fcba15572119abf",
    "line": "Ah-a-a-alright, I'm done.\n",
    "characterId": {
      "_id": "60cd5c4e4fcba15572119abc",
      "lines": [],
      "name": "Kyle Schwartz",
      "__v": 0
    },
    "__v": 0
  },
  {
    "_id": "60cd5c4e4fcba15572119ac4",
    "line": "You're done?\n",
    "characterId": {
      "_id": "60cd569a4fcba1557210fdc9",
      "lines": [],
      "name": "Cartman",
      "__v": 0
    },
    "__v": 0
  },
  {
    "_id": "60cd5c4e4fcba15572119ac9",
    "line": "Ye-yes, I-I've tallied up all the times you've been naughty and deducted the times you've been nice.\n",
    "characterId": {
      "_id": "60cd5c4e4fcba15572119abc",
      "lines": [],
      "name": "Kyle Schwartz",
      "__v": 0
    },
    "__v": 0
  },
...
]
```

Example Lines for an Episode API call for season 3 episode 1:
```
https://southpark-api.herokuapp.com/api/lines/3/1
```
```js
[
  {
    "_id": "60cd6eae4fcba1557213337f",
    "line": "Okay, children, we have a special guest today, a woman recruiting young people [she walks to the group and smiles] for a national choir tour. Now I know that choir tours are totally stupid and lame [she frowns], but please, give her your full attention. [to her] Go ahead.\n",
    "characterId": {
      "_id": "60cd569a4fcba1557210fdda",
      "lines": [],
      "name": "Mr. Garrison",
      "__v": 0
    },
    "__v": 0
  },
  {
    "_id": "60cd6eae4fcba15572133386",
    "line": "Uh. Thank you, Mr. Garrison. [cheerfully] How are we all doing today?! [the kids' eyes wander] I can't hear you! I said, How are we all doing?! [Cartman farts]\n",
    "characterId": {
      "_id": "60cd6eae4fcba15572133383",
      "lines": [],
      "name": "Ms. Stevens",
      "__v": 0
    },
    "__v": 0
  },
  {
    "_id": "60cd6eae4fcba1557213338b",
    "line": "[angrily] Eric Cartman, you say ‘’excuse me”!\n",
    "characterId": {
      "_id": "60cd569a4fcba1557210fdda",
      "lines": [],
      "name": "Mr. Garrison",
      "__v": 0
    },
    "__v": 0
  },  
  ...
]
```

Example Character Ids
```
Stan: 60cd566f4fcba1557210f8d2
Cartman: 60cd569a4fcba1557210fdc9
Kyle: 60cd56904fcba1557210fcb3
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

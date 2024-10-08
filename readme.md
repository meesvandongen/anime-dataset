# Anime Dataset

## Tables

- Anime: A list of all known anime on MyAnimeList. This includes TV shows, movies, OVAs, etc. This endpoint can be used together with the studios and genres tables.
  - https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/anime.csv
  - https://raw.githack.com/meesvandongen/anime-dataset/main/data/anime.csv (with proper Content-Type)
- Genres: A list of all known genres on MyAnimeList, together with their ID.
  - https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/genres.csv
  - https://raw.githack.com/meesvandongen/anime-dataset/main/data/genres.csv
- Studios: A list of all known studios on MyAnimeList, together with their ID.
  - https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/studios.csv
  - https://raw.githack.com/meesvandongen/anime-dataset/main/data/studios.csv

To save some extra space, same parts of the image URLs have been removed from the CSV files as well. A full URL can be constructed as follows:

```js
`https://cdn.myanimelist.net/images/anime/${image}.jpg`;
```

Where `${image}` is the part of the URL that is in the CSV file. For example, the image URL for the anime with ID 1 is `https://cdn.myanimelist.net/images/anime/4/19644.jpg`.

## Standalone

- Anime Standalone: A list of all known anime on MyAnimeList, together with their genres and studios. This endpoint can be used to get all information in one go, but is a bit bigger than the other tables combined.
  - https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/anime-standalone.csv
  - https://raw.githack.com/meesvandongen/anime-dataset/main/data/anime-standalone.csv

## Anime JSON

Slightly more data is available on the endpoints for individual anime. These endpoints are available on the following URLs:

- https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/anime/{id}.json
- https://raw.githack.com/meesvandongen/anime-dataset/main/data/anime/{id}.json

<details>
<summary>Example</summary>
  
https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/anime/1.json

```json
{
  "id": 1,
  "title": "Cowboy Bebop",
  "main_picture": {
    "medium": "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
    "large": "https://cdn.myanimelist.net/images/anime/4/19644l.jpg"
  },
  "alternative_titles": {
    "synonyms": [],
    "en": "Cowboy Bebop",
    "ja": "カウボーイビバップ"
  },
  "start_date": "1998-04-03",
  "end_date": "1999-04-24",
  "synopsis": "Crime is timeless. By the year 2071, humanity has expanded across the galaxy, filling the surface of other planets with settlements like those on Earth. These new societies are plagued by murder, drug use, and theft, and intergalactic outlaws are hunted by a growing number of tough bounty hunters.\n\nSpike Spiegel and Jet Black pursue criminals throughout space to make a humble living. Beneath his goofy and aloof demeanor, Spike is haunted by the weight of his violent past. Meanwhile, Jet manages his own troubled memories while taking care of Spike and the Bebop, their ship. The duo is joined by the beautiful con artist Faye Valentine, odd child Edward Wong Hau Pepelu Tivrusky IV, and Ein, a bioengineered Welsh Corgi.\n\nWhile developing bonds and working to catch a colorful cast of criminals, the Bebop crew's lives are disrupted by a menace from Spike's past. As a rival's maniacal plot continues to unravel, Spike must choose between life with his newfound family or revenge for his old wounds.\n\n[Written by MAL Rewrite]\n",
  "mean": 8.75,
  "rank": 46,
  "popularity": 43,
  "num_list_users": 1860555,
  "num_scoring_users": 962063,
  "nsfw": "white",
  "created_at": "2005-06-30T05:01:56+00:00",
  "updated_at": "2023-09-16T14:11:11+00:00",
  "media_type": "tv",
  "status": "finished_airing",
  "genres": [
    {
      "id": 1,
      "name": "Action"
    },
    {
      "id": 50,
      "name": "Adult Cast"
    },
    {
      "id": 46,
      "name": "Award Winning"
    },
    {
      "id": 24,
      "name": "Sci-Fi"
    },
    {
      "id": 29,
      "name": "Space"
    }
  ],
  "num_episodes": 26,
  "start_season": {
    "year": 1998,
    "season": "spring"
  },
  "broadcast": {
    "day_of_the_week": "saturday",
    "start_time": "01:00"
  },
  "source": "original",
  "average_episode_duration": 1440,
  "rating": "r",
  "studios": [
    {
      "id": 14,
      "name": "Sunrise"
    }
  ]
}
```

</details>

## CDN

You can choose to use https://raw.githack.com/

## Updates

The dataset is incrementally updated. Each day, 20 years of data is updated. Since the start of the dataset is 1917, it will take around a week to refresh the entire dataset.

## History

Since the dataset is stored in git, historical trends can be analyzed by looking at the commit history (if this repository keeps working in the future).

import { AnimeService, ApiError, OpenAPI } from "./api/index";
import { delay } from "./utils";

const clientId = process.env.CLIENT_ID;

if (!clientId) {
  throw new Error("CLIENT_ID is required.");
}

OpenAPI.HEADERS = {
  "X-MAL-CLIENT-ID": clientId,
};

const seasons = ["winter", "spring", "summer", "fall"];

interface Metadata {
  current_year: number;
}

let metadata: Metadata = await Bun.file("state.json").json();

const yearsToScrape = 20;
const limit = 400;

let hasReachedEnd = false;
let lastYearToScrape = metadata.current_year + yearsToScrape;
let year = metadata.current_year;

console.log(`Scraping from ${year} to ${lastYearToScrape}...`);

yearLoop: while (year < lastYearToScrape) {
  let season = 0;
  seasonLoop: while (season < 4) {
    let offset = 0;

    let hasNextPage = true;
    pageLoop: while (hasNextPage) {
      console.log(
        `Fetching page ${offset / limit + 1}, ${seasons[season]} ${year}...`,
      );
      const res = await AnimeService.animeSeasonYearSeasonGet({
        season: seasons[season],
        year: year,
        limit,
        offset,
        nsfw: true,
        fields:
          "id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics",
      }).catch((err) => {
        if (err instanceof ApiError) {
          if (err.status === 404) {
            console.log("404, we have reached the end of the list.");
            hasNextPage = false;
            hasReachedEnd = true;
          } else {
            console.error(err);

            throw err;
          }
        }
      });

      if (!res) {
        break yearLoop;
      }

      Promise.all(
        (res.data ?? []).map(async (anime) => {
          if (!anime.node) return;
          await Bun.write(
            `data/anime/${anime.node.id}.json`,
            JSON.stringify(anime.node, null, 2),
          );
        }),
      );

      hasNextPage = Boolean(res.paging?.next);
      offset += limit;

      console.debug("Waiting 3 seconds...");
      await delay(3_000);
    }

    season += 1;
  }

  year += 1;
}

console.log("Done!");

metadata.current_year = year;

if (hasReachedEnd) {
  metadata.current_year = 1917;
}

await Bun.write("state.json", JSON.stringify(metadata, null, 2));

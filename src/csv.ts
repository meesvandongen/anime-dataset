import fs from "fs";
import { stringify } from "csv-stringify";

const fileNames = fs.readdirSync("./data/anime");

const sortedFilenames = fileNames.toSorted(
  (a, b) => parseInt(a.split(".")[0]) - parseInt(b.split(".")[0]),
);

const data = sortedFilenames.map((fileName) => {
  const anime = JSON.parse(
    fs.readFileSync(`./data/anime/${fileName}`, "utf-8"),
  );

  if (!anime) {
    console.error(`Failed to parse ${fileName}`);
  }

  return {
    id: anime.id,
    title: anime.title,
    titleJa: anime.alternative_titles?.ja,
    titleEn: anime.alternative_titles?.en,
    image: anime.main_picture?.medium
      .replace("https://cdn.myanimelist.net/images/anime/", "")
      .replace(".jpg", ""),
    mean: anime.mean,
    num_list_users: anime.num_list_users,
    num_scoring_users: anime.num_scoring_users,
    num_episodes: anime.num_episodes,
    start_date: anime.start_date,
    end_date: anime.end_date,
    media_type: anime.media_type,
    status: anime.status,
    rating: anime.rating,
    average_episode_duration: anime.average_episode_duration,
    genres: (anime.genres ?? []).map((genre: any) => genre.name).join(", "),
    studios: (anime.studios ?? []).map((studio: any) => studio.name).join(", "),
  };
});

stringify(data, { header: true }, (err, output) => {
  if (err) throw err;
  fs.writeFileSync("./data/anime.csv", output);
});

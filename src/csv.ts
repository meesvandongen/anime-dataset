import fs from "fs";
import { stringify } from "csv-stringify";

const fileNames = fs.readdirSync("./data/anime");

const sortedFilenames = fileNames.toSorted(
  (a, b) => parseInt(a.split(".")[0]) - parseInt(b.split(".")[0]),
);

const allAnimeJsonData = sortedFilenames.map((fileName) => {
  return JSON.parse(fs.readFileSync(`./data/anime/${fileName}`, "utf-8"));
});
{
  const allAnimeCsvData = allAnimeJsonData.map((singleAnime) => {
    return {
      id: singleAnime.id,
      title: singleAnime.title,
      titleJa: singleAnime.alternative_titles?.ja,
      titleEn: singleAnime.alternative_titles?.en,
      image: singleAnime.main_picture?.medium
        .replace("https://cdn.myanimelist.net/images/anime/", "")
        .replace(".jpg", "")
        .replace(".webp", ""),
      mean: singleAnime.mean,
      rank: singleAnime.rank,
      num_list_users: singleAnime.num_list_users,
      num_scoring_users: singleAnime.num_scoring_users,
      num_episodes: singleAnime.num_episodes,
      start_date: singleAnime.start_date,
      end_date: singleAnime.end_date,
      media_type: singleAnime.media_type,
      status: singleAnime.status,
      rating: singleAnime.rating,
      average_episode_duration: singleAnime.average_episode_duration,
      genres: (singleAnime.genres ?? [])
        .map((genre: any) => genre.id)
        .join(";"),
      studios: (singleAnime.studios ?? [])
        .map((studio: any) => studio.id)
        .join(";"),
    };
  });

  stringify(allAnimeCsvData, { header: true }, (err, output) => {
    if (err) throw err;
    fs.writeFileSync("./data/anime.csv", output);
  });
}
{
  const allGenres: any[] = [];
  allAnimeJsonData.forEach((anime) => {
    anime.genres?.forEach((genre: any) => {
      if (!allGenres.find((g) => g.id === genre.id)) {
        allGenres.push(genre);
      }
    });
  });

  const sortedGenres = allGenres.toSorted((a, b) => a.id - b.id);

  stringify(sortedGenres, { header: true }, (err, output) => {
    if (err) throw err;
    fs.writeFileSync("./data/genres.csv", output);
  });
}
{
  const allStudios: any[] = [];
  allAnimeJsonData.forEach((anime) => {
    anime.studios?.forEach((studio: any) => {
      if (!allStudios.find((s) => s.id === studio.id)) {
        allStudios.push(studio);
      }
    });
  });

  const sortedStudios = allStudios.toSorted((a, b) => a.id - b.id);

  stringify(sortedStudios, { header: true }, (err, output) => {
    if (err) throw err;
    fs.writeFileSync("./data/studios.csv", output);
  });
}

{
  const allAnimedataStandalone = allAnimeJsonData.map((singleAnime) => {
    return {
      id: singleAnime.id,
      title: singleAnime.title,
      titleJa: singleAnime.alternative_titles?.ja,
      titleEn: singleAnime.alternative_titles?.en,
      image: singleAnime.main_picture?.medium,
      mean: singleAnime.mean,
      rank: singleAnime.rank,
      num_list_users: singleAnime.num_list_users,
      num_scoring_users: singleAnime.num_scoring_users,
      num_episodes: singleAnime.num_episodes,
      start_date: singleAnime.start_date,
      end_date: singleAnime.end_date,
      media_type: singleAnime.media_type,
      status: singleAnime.status,
      rating: singleAnime.rating,
      average_episode_duration: singleAnime.average_episode_duration,
      genres: (singleAnime.genres ?? [])
        .map((genre: any) => genre.name)
        .join(", "),
      studios: (singleAnime.studios ?? [])
        .map((studio: any) => studio.name)
        .join(", "),
    };
  });

  stringify(allAnimedataStandalone, { header: true }, (err, output) => {
    if (err) throw err;
    fs.writeFileSync("./data/anime-standalone.csv", output);
  });
}

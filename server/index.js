const csv = require("csv-parser");
const fs = require("fs");
const papa = require("papaparse");

const results = [];

class Searcher {
  songs;

  constructor() {
    this.songs = papa
      .parse(fs.readFileSync("songs.csv").toString())
      .data.map((song) => {
        return {
          title: song[0],
          album: song[1],
          lyrics: song[2],
        };
      });
  }

  search(query) {
    let results = [];

    // Go through each song, and check if it contains the query
    // if it does, add the specific section with the query highlighted to results (40 chars before and 40 chars after)
    this.songs.forEach((song) => {
      if (song.lyrics == undefined) {
        return;
      }

      if (song.lyrics.includes(query)) {
        let songResult = {
          title: song.title,
          album: song.album,
          matches: [],
        };

        let indices = [];

        let numOccurances = song.lyrics.split(query).length - 1;

        let currPos = 0;

        for (let i = 0; i < numOccurances; i++) {
          let index = song.lyrics.indexOf(query, currPos);
          indices.push({
            start: index + currPos - 40,
            end: index + currPos + query.length + 40,
          });
          currPos = index + currPos + query.length;
        }

        indices.forEach((index) => {
          let htmlStr = song.lyrics
            .substring(
              index.start < 0 ? 0 : index.start,
              index.end > song.lyrics.length ? song.lyrics.length : index.end
            )
            .replace(new RegExp(query, "gi"), `<mark>${query}</mark>`);

          if (htmlStr != "") {
            songResult.matches.push(htmlStr);
          }
        });

        results.push(songResult);
      }
    });

    return results;
  }
}

const fastify = require("fastify")({
  logger: true,
});

fastify.get("/search/:query", async (request, reply) => {
  const searcher = new Searcher();
  const results = searcher.search(request.params.query);

  reply.send(results);
});

fastify.listen(8000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});

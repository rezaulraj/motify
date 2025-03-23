import { Aggregate } from "mongoose";
import { Song } from "../model/songModel.js";

class SongController {
  getALlSongs = async (req, res, next) => {
    try {
      const song = await Song.find().sort({ createdAt: -1 });
      res.status(200).json(song);
    } catch (error) {
      console.log("Error in getAllSong");
      next(error);
    }
  };

  getFeaturedSongs = async (req, res, next) => {
    try {
      // fatch 6 random songs useing mongodb's aggregation pipeline
      const songs = await Song.aggregate([
        { $sample: { size: 6 } },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1,
          },
        },
      ]);
      res.status(200).json(songs);
    } catch (error) {
      console.log("Error in getFeaturedSongs");
      next(error);
    }
  };

  getMadeForYouSongs = async (req, res, next) => {
    try {
      // fatch 4 random songs useing mongodb's aggregation pipeline
      const songs = await Song.aggregate([
        { $sample: { size: 4 } },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1,
          },
        },
      ]);
      res.status(200).json(songs);
    } catch (error) {
      console.log("Error in getFeaturedSongs");
      next(error);
    }
  };

  getTrandingSongs = async (req, res, next) => {
    try {
      // fatch 4 random songs useing mongodb's aggregation pipeline
      const songs = await Song.aggregate([
        { $sample: { size: 4 } },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1,
          },
        },
      ]);
      res.status(200).json(songs);
    } catch (error) {
      console.log("Error in getFeaturedSongs");
      next(error);
    }
  };
}

export default new SongController();

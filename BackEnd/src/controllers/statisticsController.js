import { Album } from "../model/albumModel.js";
import { Song } from "../model/songModel.js";
import { User } from "../model/userModel.js";

class statisticsController {
  getStats = async (req, res, next) => {
    try {
      //   const totalSongs = await Song.countDocuments();
      //   const totalAlbums = await Album.countDocuments();
      //   const totalUsers = await User.countDocuments();
      // short form
      const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
        await Promise.all([
          Song.countDocuments(),
          Album.countDocuments(),
          User.countDocuments(),

          Song.aggregate([
            {
              $unionWith: {
                coll: "albums",
                pipeline: [],
              },
            },
            {
              $group: {
                _id: "$artist",
              },
            },
            {
              $count: "count",
            },
          ]),
        ]);
      res.status(200).json({
        totalSongs,
        totalAlbums,
        totalUsers,
        totalArtists: uniqueArtists[0]?.count || 0,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new statisticsController();

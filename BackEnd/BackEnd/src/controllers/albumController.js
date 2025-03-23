import { Album } from "../model/albumModel.js";
class AlbumController {
  getAllAlbums = async (req, res, next) => {
    try {
      const albums = await Album.find();
      res.status(200).json(albums);
    } catch (error) {
      console.log("Error in getAllAlbum", error);
      next(error);
    }
  };

  getAlbumById = async (req, res, next) => {
    try {
      const { albumId } = req.params;
      const album = await Album.findById(albumId).populate("songs");
      if(!album){
        return res.status(404).json({message: "ALbum Not found"})
      }
      res.status(200).json(album)
    } catch (error) {
        next(error)
    }
  };
}

export default new AlbumController();

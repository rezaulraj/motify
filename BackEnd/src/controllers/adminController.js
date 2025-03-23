import cloudinary from "../config/cloudinary.js";
import { Album } from "../model/albumModel.js";
import { Song } from "../model/songModel.js";

// helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error UploadToCloudinary", error);
    throw new Error("Error Uploading to cloudinary");
  }
};

class adminCreate {
  createSong = async (req, res, next) => {
    try {
      if (!req.files || !req.files.audioFile || !req.files.imageFile) {
        return res.status(400).json({ message: "plase uplaod all fiels" });
      }
      const { title, artist, albumId, duration } = req.body;
      const audioFile = req.files.audioFile;
      const imageFile = req.files.imageFile;

      const audioUrl = await uploadToCloudinary(audioFile);
      const imageUrl = await uploadToCloudinary(imageFile);

      const song = new Song({
        title,
        artist,
        imageUrl,
        duration,
        audioUrl,
        albumId: albumId || null,
      });
      await song.save();
      // if song belong to an album, update the album's songs array
      if (albumId) {
        await Album.findByIdAndUpdate(albumId, {
          $push: { songs: song._id },
        });
      }
      res.status(201).json(song);
    } catch (error) {
      console.log("Error in createSong", error);
      next(error);
    }
  };

  // Delete song
  deleteSong = async (req, res, next) => {
    try {
      const { id } = req.params;
      const song = await Song.findById(id);
      if (song.albumId) {
        await Album.findByIdAndUpdate(song.albumId, {
          $pull: { songs: song._id },
        });
      }
      await Song.findByIdAndDelete(id);
      res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
      console.log("Error in deleteSong", error);
      next(error);
    }
  };

  // Create new album
  createAlbum = async (req, res, next) => {
    try {
      const { title, artist, releaseYear } = req.body;
      const { imageFile } = req.files;
      const imageUrl = await uploadToCloudinary(imageFile);

      const album = new Album({
        title,
        artist,
        imageUrl,
        releaseYear,
      });
      await album.save();
      res.status(201).json(album);
    } catch (error) {
      console.log("Error in createAlbum", error);
      next(error);
    }
  };
  // delete a album
  deleteAlbum = async (req, res, next) => {
    try {
      const { id } = req.params;
      await Song.deleteMany({ albumId: id });
      await Album.findByIdAndDelete(id);
      res.status(200).json("Album delete successfully");
    } catch (error) {
      console.log("Error in deleteAlbum", error);
      next(error);
    }
  };

  checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin: true });
  };
}

export default new adminCreate();

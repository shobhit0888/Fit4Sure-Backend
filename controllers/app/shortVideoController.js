const ShortVideo = require("../../models/ShortVideo");
const firebaseApp = require("../../firebase");

const storage = firebaseApp.storage();

class ShortVideoController {
  static get_all_shortVideo = async (req, res) => {
    try {
      const shortVideo = await ShortVideo.find({ approved: true });
      const shortVideoWithVideoURLs = await Promise.all(
        shortVideo.map(async (shortVideo) => {
          const file = storage.bucket().file(shortVideo.video);
          const [signedUrl] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2500",
          });
          return {
            ...shortVideo.toObject(),
            video: signedUrl,
          };
        })
      );
      res.status(200).json({
        status: "success",
        shortVideos: shortVideoWithVideoURLs,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  static shortvideo_like = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const userId = req.userId;

      const video = await ShortVideo.findByIdAndUpdate(
        videoId,
        { $addToSet: { likes: userId } },
        { new: true }
      );

      res.status(200).json({ message: "Post liked", video });
    } catch (error) {
      console.error("Error liking the post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  static shortvideo_unlike = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const userId = req.userId;

      const video = await ShortVideo.findByIdAndUpdate(
        videoId,
        { $pull: { likes: userId } },
        { new: true }
      );

      res.status(200).json({ message: "Post unliked", video });
    } catch (error) {
      console.error("Error unliking the post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = ShortVideoController;

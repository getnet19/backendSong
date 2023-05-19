const jwt = require("jsonwebtoken");
const Album = require("../models/album");
const Artist = require("../models/artist");
const Song = require("../models/song");
const song = require("../models/song");

const virifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.jwt_sec, (err, user) => {
      if (err) res.status(401).json("token is invalid");
      req.user = user;
      next();
    });
  } else {
    res.status(501).json("You are not authenticated");
  }
};

const virifyTokenAndAuthorization = (req, res, next) => {
  virifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed");
    }
  });
};
const virifyTokenAdmin = (req, res, next) => {
  virifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed");
    }
  });
};

const virifyTokenUser = (req, res, next) => {
  virifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("you are not allowed");
    }
  });
};

//virifyTokenUserAlbum
const virifyTokenUserAlbumAuth = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.jwt_sec, (err, user) => {
      if (err) {
        return res.status(401).json("token is invalid");
      }
      req.user = user;
      const userId = req.user.id;
      const albumId = req.params.id;

      Album.findById(albumId)
        .exec()
        .then((album) => {
          if (!album) {
            return res.status(400).json("album not exist");
          }
          if (userId !== album.userId) {
            return res.status(403).json("you are not allowed");
          }
          req.album = album;
          next();
        })
        .catch((err) => {
          return res.status(500).json(err.message);
        });
    });
  } else {
    return res.status(500).json("you are not authenticated");
  }
};

//virifayArtist token
const virifyTokenArtistAuth = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.jwt_sec, (err, user) => {
      if (err) return res.status(401).json("token is invalid");
      req.user = user;
      const userId = req.user.id;
      const aritstId = req.params.id;

      Artist.findById(aritstId)
        .exec()
        .then((artist) => {
          if (!artist) return res.status(400).json("artist does not exist");
          if (userId !== artist.userId) {
            return res.status(403).json("you are not allowed");
          }
          req.artist = artist;
          next();
        })
        .catch((err) => res.status(500).json(err));
    });
  }
};

//virifyTokenSongAuth
const virifyTokenSongAuth = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt(token, process.env.jwt_sec, (err, user) => {
      if (err) return res.status(401).json("token is invalid");
      req.user = user;
      const userId = req.user.id;
      const songId = req.params.id;

      Song.findById(songId)
        .exec()
        .then((song) => {
          if (!song) return res.status(400).json("song does not exist");
        });
      if (song.userId !== req.user.id)
        return res.status(403).json("you are not alloed");
      req.song = song;
      next();
    });
  } else {
    res.status(500).json("you are not authnticated");
  }
};

module.exports = {
  virifyTokenUser,
  virifyToken,
  virifyTokenAndAuthorization,
  virifyTokenAdmin,
  virifyTokenUserAlbumAuth,
  virifyTokenArtistAuth,
  virifyTokenSongAuth
};

const Photo = require("../models/Photo");
const User = require("../models/User");

const {Types} = require("mongoose");

const insertPhoto = async (req, res) => {
  const {title} = req.body;
  const image = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);


  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if(!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, por favor tente mais tarde."]
    });
    return;
  };
  res.status(200).json(newPhoto);
}

const deletePhoto = async(req, res) => {
  const {id} = req.params;
  const reqUser = req.user;
 
  try {
    const objectId =  new Types.ObjectId(id);
    const photo = await Photo.findById(objectId);
    if(!photo){
      res.status(404).json({
        errors: ["Foto não encontrada."]
      })
      return;
    };
    if(!photo.userId.equals(reqUser._id)){
      res.status(422).json({
        errors: ["Houve um problema, por favor tente mais tarde."]
      })
      return;
    }
    await Photo.findByIdAndDelete(photo._id);
  
    res.status(200).json({
      id: photo._id,
      message: "Foto excluida com sucesso!"
    });
    
  } catch (error) {
    res.status(404).json({
      errors: ["Foto não encontrada."]
    })
    return;
  }
};

const getAllPhotos = async(req, res) => {
  const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

  res.status(200).json(photos);
};

const getUserPhotos = async (req, res) => {
  const {id} = req.params;
  try {
    const photos = await Photo.find({userId: id}).sort([['createdAt', -1]]).exec();
    res.status(200).json(photos) 
  } catch (error) {
    res.status(404).json({
      errors: ["Fotos não encontradas."]
    })
    return;
  }
};

const getPhotoById = async (req, res) => {
  const {id} = req.params;
  try {
    const objectId =  new Types.ObjectId(id);
    const photo = await Photo.findById(objectId);
    if(!photo){
      res.status(404).json({
        errors: ["Foto não encontrada."]
      })
      return;
    }
    res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({
      errors: ["Foto não encontrada."]
    })
    return;
  }
}

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById
}
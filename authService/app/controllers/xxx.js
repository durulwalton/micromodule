const getPhoto = async (req, res, next) => {
    const { serviceName } = req.params;
    const { fileType } = req.params;
    const { fileName } = req.params;
    // const authorization = req.headers.authorization;
    // console.log(imagePath);
    let imagePath;
    try {
      const mfileName = modifyUserImage(fileName);
      const rootDir = path.dirname(require.main.filename);
      const imageDirectoryName = serviceName + "Images";
      // console.log(rootDir);
      switch (serviceName) {
        case "walpack": {
          switch (fileType) {
            case "getPhotos": {
              imagePath = path.join(
                rootDir,
                "image",
                imageDirectoryName,
                "photos",
                mfileName,
              );
              break;
            }
            case "getDrivingLicense": {
              imagePath = path.join(
                rootDir,
                "image",
                imageDirectoryName,
                "drivingLicense",
                mfileName,
              );
              break;
            }
            case "getNid": {
              imagePath = path.join(
                rootDir,
                "image",
                imageDirectoryName,
                "nid",
                mfileName,
              );
              break;
            }
            case "getVehiclePapers": {
              imagePath = path.join(
                rootDir,
                "image",
                imageDirectoryName,
                "vehiclePapers",
                mfileName,
              );
              break;
            }
            case "getFeedback": {
              imagePath = path.join(
                rootDir,
                "image",
                imageDirectoryName,
                "feedback",
                mfileName,
              );
              break;
            }
            case "getPromotional": {
              imagePath = path.join(
                rootDir,
                "image",
                imageDirectoryName,
                "promotional",
                mfileName,
              );
              break;
            }
            default: {
              imagePath = path.join(
                rootDir,
                "image",
                imageDirectoryName,
                "others",
                mfileName,
              );
              break;
            }
          }
          break;
        }
        case "authorization": {
          switch (fileType) {
            case "getModuleIcons": {
              imagePath = path.join(
                rootDir,
                "image",
                imageDirectoryName,
                "moduleIcons",
                mfileName,
              );
              break;
            }
            default: {
              imagePath = path.join(
                rootDir,
                "image",
                imageDirectoryName,
                "others",
                mfileName,
              );
              break;
            }
          }
          break;
        }
        default: {
          imagePath = path.join(rootDir, "image", "othersImages", mfileName);
          break;
        }
      }
      // console.log(imagePath);
      // imagePath = "./photos/"+ mfileName;
    } catch (e) {
      // await createLog(e);
      console.log(e.message);
      res.status(500).send("Internal Server Error");
    }
  
    // console.log(imagePath);
    if (fs.existsSync(imagePath)) {
      const imageStream = fs.createReadStream(imagePath);
  
      res.setHeader("Content-Type", "image/jpeg, image/png");
      imageStream.pipe(res);
    } else {
      res.status(404).send("Image not found");
    }
  };
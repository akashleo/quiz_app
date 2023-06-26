import { Storage } from "@google-cloud/storage";
//import myKey from "../myKey.json";

const storage = new Storage({ keyFilename: "myKey.json" });
const bucket = storage.bucket("image-bucket-quizapp");

import util from "util";
import Multer from "multer";
//const maxSize = 5 * 1024 * 1024;

let processFile = Multer({
  storage: Multer.memoryStorage(),
  //limits: { fileSize: maxSize },
}).single("file");

let processFileMiddleware = util.promisify(processFile);


export const fileUpload = async (req, res, next) => {
  //console.log(req)
  try {
    await processFileMiddleware(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" , file: req});
    }
    
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = util.format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        // Make the file public

        await bucket.file(req.file.originalname).makePublic();
      } catch {
        return res.status(500).send({
          message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
          url: publicUrl,
        });
      }

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
};

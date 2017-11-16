let mongodb = require('mongodb'),
//connection = require('../../utility/dbconnection.js'),
//fs = require('fs'),
    shortid = require('shortid'),
stream = require('stream'),
{logger} = require('./logger.js'),
//logMsg = require('../../utility/utils.js').logMsg,
ObjectID = mongodb.ObjectID,
GridFSBucket = mongodb.GridFSBucket;


module.exports =  {
    
        uploadPayload: (db, containerName, file, fileName, dbName, encoding, mimetype, meta) => {
            
                    if(!file || !fileName)
                        return Promise.reject("Bad Request.");
            
                        let 
                        conn = db,
                        bucket = new GridFSBucket(conn, { bucketName: dbName }),
                        bufferStream = new stream.PassThrough();
                        bufferStream.end(file);
                        
                        let uploadStream = bucket.openUploadStream(fileName, {metadata: meta}),
                        uploadStream.id = shortid.generate(),
                        id = uploadStream.id,
                        promise = new Promise((resolve, reject) =>{
                            uploadStream.once('finish', function() {
                                logger.log("Payload Uploaded.");
                                return resolve({id});
                            });
            
                            uploadStream.once('error', function() {
                                logger.error( "Payload Uploaded Error.");
                                return reject("Error");
                            });
                        })
            
                        bufferStream.pipe(uploadStream);
                        return promise;
                }
    };


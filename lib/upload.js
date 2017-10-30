let mongodb = require('mongodb'),
//connection = require('../../utility/dbconnection.js'),
//fs = require('fs'),
//stream = require('stream'),
logger = require('./logger.js'),
//logMsg = require('../../utility/utils.js').logMsg,
ObjectID = mongodb.ObjectID,
GridFSBucket = mongodb.GridFSBucket;


module.exports = () => {
    return {
        uploadPayload: (db, containerName, file, fileName, dbName, encoding, mimetype) => {
            
                    if(!file || !fileName)
                        return Promise.reject("Bad Request.");
            debugger;
                        let 
                        conn = db,
                        bucket = new GridFSBucket(conn, { bucketName: dbName }),
                        bufferStream = new stream.PassThrough();
                        bufferStream.end(file);
                        
                        let uploadStream = bucket.openUploadStream(fileName, { name:"omkar" }),
                        id = uploadStream.id,
                        
                        promise = new Promise((resolve, reject) =>{
                            uploadStream.once('finish', function() {
                                logger.info("Payload Uploaded.", pod);
                                return resolve({id});
                            });
            
                            uploadStream.once('error', function() {
                                logger.error( "Payload Uploaded Error.", pod );
                                return reject("Error");
                            });
                        })
            
                        bufferStream.pipe(uploadStream);
                        return promise;
                        
                    
                    
                }
    }
}

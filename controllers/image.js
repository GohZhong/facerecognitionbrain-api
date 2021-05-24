const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '37b824f631ca426587dbad509b3af8da'
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data=> res.json(data))
  .catch(err=>res.status(400).json('Api failed'));
}

const handleImage = (req,res, db)=> {
    const { id,counter } = req.body;
    db('users').where({id})
    .increment('entries', counter)
    .returning('entries')
    .then(entry=>{
      res.json(entry);
    })
    .catch(err => res.status(400).json('Unable to get entries ',err))
}

module.exports={
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
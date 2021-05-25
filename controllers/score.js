const handleScore = (req, res, db)=> {
    db.select('name', 'entries', 'colour').from('users')
    .orderBy('entries','desc')
    // .limit(10)
    .then()
    .then(score=> {
      res.json(score);
    })
    .catch(()=>res.json('Error fetching score'))
}

module.exports = {
    handleScore: handleScore
}
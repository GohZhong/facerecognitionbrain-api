const handleSignIn = (req,res, db, bcrypt) => {
    const { email, password } = req.body;
    db.select('email','hash').from('login')
    .where({'email': email})
    .then(data => { 
      bcrypt.compare(password, data[0].hash, function(err, resp) {
        if(resp) {
          return db('users').select('*')
          .where({'email': email})
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json('Error retrieving user data ', err))
        } else {
          res.json(false);
        }
      })
      .catch(()=>res.json("Error comparing passwords"))
    })
    .catch(() =>res.json(false))
}

module.exports = {
    handleSignIn: handleSignIn
}
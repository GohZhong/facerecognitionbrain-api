const handleRegister = (req, res, db, bcrypt)=>{
  const { email, name, password, colour} = req.body;
  const hash = bcrypt.hashSync(password);
  if (email && password) {
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date(),
          colour: colour
        })
        .then(user => {
          res.json(user[0]);
        })
        .catch((err)=>res.status(400).json('Error appending database', err))
      })
      .then(trx.commit)
      .catch(trx.rollback)
      })
      .catch(()=>res.status(400).json(false))
    .catch(()=>res.status(400).json(false))
  } else {
    return res.json(false)
  }
  // const { name, email, password, colour } = req.body;
  // if(email && password) {
  //   bcrypt.hash(password, null, null, function(err, hash) {
  //     db.transaction(trx => {
  //       trx.insert({
  //         hash: hash,
  //         email: email,
  //       })
  //       .into('login')
  //       .returning('email')
  //       .then(loginEmail => {
  //         return trx('users')
  //         .returning('*')
  //         .insert({
  //           email: loginEmail[0],
  //           name: name,
  //           joined: new Date(),
  //           colour: colour
  //         })
  //         .then(user => {
  //           res.json(user[0]);
  //         })
  //         .catch((err)=>res.status(400).json('Error appending database', err))
  //       })
  //       .then(trx.commit)
  //       .catch(trx.rollback)
  //     })
  //     .catch(()=>res.status(400).json(false))
  //   })
  //   .catch(()=>res.status(400).json('Error hashing password'))
  // } else {
  //   return res.json(false)
  // }
}

module.exports = {
    handleRegister: handleRegister
}
const crypto = require('crypto')
const connection = require('../database/connection')


module.exports = {
  async list(req,res){
    const ongs = await connection('ongs').select('*')
    return res.json(ongs)
  },
  
  async create(req,res){
  const { name, email, whatsapp, city, uf } = req.body
  
  const id = crypto.randomBytes(3).toString('HEX')

  await connection('ongs').insert({
    id,
    name,
    email,
    city,
    uf,
    whatsapp
  })

  return res.json({ id })
  }


}
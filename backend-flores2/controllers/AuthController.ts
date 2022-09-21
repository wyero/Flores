import argon2 from 'argon2'
const db = require('../models')

export const Login = async (req: any, res: any) => {
    const user = await db.UserModel.findOne({
        where: {
            email: req.body.email
        }
    })
    if(!user) return res.status(404).json({msg: "Pengguna Tidak Ditemukan"})
    const pass = await argon2.verify(user.password, req.body.password)
    if(!pass) return res.status(400).json({msg: "Email atau Password Salah"})
    req.session.userId = user.id
    const id = user.id
    const nama = user.nama
    const email = user.email
    const role = user.role
    res.status(200).json({id, nama, email, role})
}

export const Me = async (req: any, res: any) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Silahkan Login Terlebih Dahulu"})
    }
    const user = await db.UserModel.findOne({
        attributes: ['id', 'nama', 'email', 'role'],
        where: {
            id: req.session.userId
        }
    })
    if(!user) return res.status(404).json({msg: "Pengguna Tidak Ditemukan"})
    res.status(200).json(user)
}

export const Logout = async (req: any, res: any) => {
    req.session.destroy((err: any)=>{
        if(err) return res.status(400).json({msg: "Tidak Dapat Keluar"})
        res.status(200).json({msg: "Logout Berhasil"})
    })
}
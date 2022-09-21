import argon2 from 'argon2'
const db = require('../models');

export const getUsers = async (req: any, res: any) => {
    try {
        const response = await db.UserModel.findAll({
            attributes: ['id', 'nama', 'email', 'role']
        })
        res.status(200).json(response)
    } catch (error: any) {
        res.status(500).json({msg: error.message})
    }
}

export const getUsersById = async (req: any, res: any) => {
    try {
        const response = await db.UserModel.findOne({
            attributes: ['id', 'nama', 'email', 'role'],
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error: any) {
        res.status(500).json({msg: error.message})
    }
}

export const createUsers = async (req: any, res: any) => {
    const {nama, email, password, ulangiPassword, role} = req.body
    if(password !== ulangiPassword) return res.status(400).json({msg: "Password Dan Ulangi Password Tidak Cocok"})
    const hashPassword = await argon2.hash(password)
    try {
        await db.UserModel.create({
            nama: nama,
            email: email,
            password: hashPassword,
            role: role
        })
        res.status(201).json({msg: "Admin Berhasil Ditambah"})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const updateUsers = async (req: any, res: any) => {
    const user = await db.UserModel.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!user) return res.status(404).json({msg: "Admin Tidak Ditemukan"})
    const {nama, email, password, ulangiPassword, role} = req.body
    let hash
    if(password === '' || password === null){
        hash = user.password
    }else{
        hash = await argon2.hash(password)
    }
    if(password !== ulangiPassword) return res.status(400).json({msg: "Password Dan Ulangi Password Tidak Cocok"})
    try {
        await db.UserModel.update({
            nama: nama,
            email: email,
            password: hash,
            role: role
        },{
            where: {
                id: user.id
            }
        })
        res.status(200).json({msg: "Admin Berhasil Diupdate"})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteUsers = async (req: any, res: any) => {
    const user = await db.UserModel.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!user) return res.status(400).json({msg: "Admin Tidak Ditemukan"})
    try {
        await db.UserModel.destroy({
            where: {
                id: user.id
            }
        })
        res.status(200).json({msg: "Admin Berhasil Dihapus"})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}
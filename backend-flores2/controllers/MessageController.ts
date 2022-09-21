import { DATE, DATEONLY, TIME } from "sequelize/types"

const db = require('../models')

export const getMessage = async (req: any, res: any) => {
    try {
        const response = await db.MessageModel.findAll()
        res.status(200).json(response)
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const getMessageById = async (req: any, res: any) => {
    try {
        const response = await db.MessageModel.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const createMessage = async (req: any, res: any) => {
    const {nama, email, nomortlpn, pesan} = req.body
    const tanggal = new Date()
    try {
        await db.MessageModel.create({
            nama: nama,
            email: email,
            nomortlpn: nomortlpn,
            pesan: pesan,
            tanggal: tanggal
        })
        res.status(200).json({msg: "Pesan Terkirim"})
    } catch (error: any) {
        console.log(error.message)
    }
}

export const deleteMessage = async (req: any, res: any) => {
    try {
        await db.MessageModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Pesan Berhasil Dihapus"})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}
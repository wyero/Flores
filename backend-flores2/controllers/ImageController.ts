const db = require('../models')
import path from 'path'
import fs from 'fs'

export const getImage = async (req: any, res: any) => {
    try {
        const response = await db.ImageModel.findAll()
        res.json(response)
    } catch (error: any) {
        console.log(error.message)
    }
}

export const getImageById = async (req: any, res: any) => {
    try {
        const response = await db.ImageModel.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json(response)
    } catch (error: any) {
        console.log(error.message)
    }
}

export const saveImage = async (req: any, res: any) => {
    if(req.files === null) return res.status(400).json({msg: "Gambar Belum Di Masukkan"})
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const allowedType = ['.png', '.jpg', '.jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Format Gambar Tidak Sesuai"})
    if(fileSize > 10000000) return res.status(422).json({msg: "Ukuran Gambar Harus Lebih Kecil Dari 10 MB"})

    file.mv(`./public/images/${fileName}`)
    try {
        await db.ImageModel.create({
            gambar: fileName,
            url: url
        })
        res.status(200).json({msg: "Gambar Berhasil Disimpan"})
    } catch (error: any) {
        console.log({msg: error.message})
    }
}

export const deleteImage = async (req: any, res: any) => {
    const image = await db.ImageModel.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!image) res.status(404).json({msg: "Gambar Tidak Ditemukan"})
    try {
        const filePath = `./public/images/${image.gambar}`
        fs.unlinkSync(filePath)
        await db.ImageModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Gambar Berhasil Dihapus"})
    } catch (error: any) {
        console.log({msg: error.message})
    }
}


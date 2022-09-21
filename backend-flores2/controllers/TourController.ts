const db = require('../models')
import fs from 'fs'
import path from 'path'

export const getTour = async (req: any, res: any) => {
    try {
        const response = await db.TourModel.findAll({})
        res.json(response)
    } catch (error: any) {
        console.log({msg: error.message})
    }
}

export const getTourById = async (req: any, res: any) => {
    try {
        const response = await db.TourModel.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json(response)
    } catch (error: any) {
        console.log(error.message)
    }
}

export const createTour = async (req: any, res: any) => {
    if(req.files === null) return res.status(400).json({msg: "Gambar Belum Di Masukkan"})
    const {nama, harga, lokasi, desksingkat, desklengkap} = req.body
    const file = req.files.file
    const file2 = req.files.file2
    const file3 = req.files.file3
    const ext = path.extname(file.name)
    const ext2 = path.extname(file2.name)
    const ext3 = path.extname(file3.name)
    const fileName = file.md5 + ext
    const fileName2 = file2.md5 + ext2
    const fileName3 = file3.md5 + ext3
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileName2}`
    const url3 = `${req.protocol}://${req.get("host")}/images/${fileName3}`
    const allowedType = ['.png', '.jpg', '.jpeg']
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Format Gambar Tidak Sesuai"})
    
    file.mv(`./public/images/${fileName}`)
    file2.mv(`./public/images/${fileName2}`)
    file3.mv(`./public/images/${fileName3}`)

    try {
        await db.TourModel.create({
            nama: nama,
            harga: harga,
            lokasi: lokasi,
            desksingkat: desksingkat,
            desklengkap: desklengkap,
            gambar: fileName,
            gambar1: fileName2,
            gambar2: fileName3,
            url: url,
            url1: url2,
            url2: url3
        })
        res.status(200).json({msg: "Tempat Wisata Berhasil Di Tambah"})
    } catch (error : any) {
        console.log({msg: error.message})
    }
}

export const updateTour = async (req: any, res: any) => {
    const tour = await db.TourModel.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!tour) res.status(400).json({msg: "Tempat Wisata Tidak Ditemukan"})
    let fileName = ""
    let fileName2 = ""
    let fileName3 = ""
    if(req.files === null || req.files === ""){
        fileName = db.TourModel.gambar
        fileName2 = db.TourModel.gambar1
        fileName3 = db.TourModel.gambar2
    }else{
        const file = req.files.file
        const file2 = req.files.file2
        const file3 = req.files.file3
        const ext = path.extname(file.name)
        const ext2 = path.extname(file2.name)
        const ext3 = path.extname(file3.name)
        fileName = file.md5 + ext
        fileName2 = file2.md5 + ext2
        fileName3 = file3.md5 + ext3
        const allowedType = ['.png', '.jpg', '.jpeg']
        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Format Gambar Tidak Sesuai"})

        const filePath = `./public/images/${tour.gambar}`
        const filePath2 = `./public/images/${tour.gambar1}`
        const filePath3 = `./public/images/${tour.gambar2}`
        fs.unlinkSync(filePath)
        fs.unlinkSync(filePath2)
        fs.unlinkSync(filePath3)

        file.mv(`./public/images/${fileName}`)
        file2.mv(`./public/images/${fileName2}`)
        file3.mv(`./public/images/${fileName3}`)
    }
    const {nama, harga, lokasi, desksingkat, desklengkap} = req.body
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileName2}`
    const url3 = `${req.protocol}://${req.get("host")}/images/${fileName3}`

    try {
        await db.TourModel.update({
            nama: nama,
            harga: harga,
            lokasi: lokasi,
            desksingkat: desksingkat,
            desklengkap: desklengkap,
            gambar: fileName,
            gambar1: fileName2,
            gambar2: fileName3,
            url: url,
            url1: url2,
            url2: url3
        },{
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Tempat Wisata Berhasil Di Update"})
    } catch (error: any) {
        console.log({msg: error.message})
    }
}

export const deleteTour = async (req: any, res: any) => {
    const tour = await db.TourModel.findOne({
        where: {
            id:req.params.id
        }
    })
    if(!tour) return res.status(404).json({msg: "Gambar Tidak DItemukan"})
    try {
        const filePath = `./public/images/${tour.gambar}`
        const filePath2 = `./public/images/${tour.gambar1}`
        const filePath3 = `./public/images/${tour.gambar2}`
        fs.unlinkSync(filePath)
        fs.unlinkSync(filePath2)
        fs.unlinkSync(filePath3)
        await db.TourModel.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Tempat Wisata Berhasil Dihapus"})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId = 0
        let isRoom = true

        while (isRoom) {
            /* Gera o numefro da sala */
            for(var i = 0; i < 6;  i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }

            const roomExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomExistIds.some(roomExistIds => roomExistIds === roomId)

            if(! isRoom){
                /* Insere o id e senha no DB */
                await db.run(`INSERT INTO rooms(
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }


        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE roomId = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE roomId = ${roomId} and read =1`)
        let isNoquestions

        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoquestions = true
            }
        }

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoquestions: isNoquestions})

    },
    async enter(req, res){     
        const roomId = req.body.roomId

        const isRoom = await module.exports.verifyRoom(roomId)

        console.log(`is Room Dentro de Enter ${isRoom}`)

        if(! isRoom){
            
            console.log("sala existe")
            res.redirect(`room/${roomId}`)
        }else{
            console.log("sala não existe")
            res.redirect('/')
        }

    },
    async verifyRoom (roomId){
        const db = await Database()
        let isRoom = true
//        console.log(`Verifica se a sala existe com o ID ${roomId}`)
        const roomExistIds = await db.all(`SELECT id FROM rooms`)
        console.log(`COd DB ${roomExistIds[1].id} Cod Recebido ${roomId}`)
        isRoom = roomExistIds.some(roomExistIds => roomExistIds.id === roomId)
        console.log(`IsRoom dentro de verifyRoom ${isRoom}`)
        return isRoom
    }
}
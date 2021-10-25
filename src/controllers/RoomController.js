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
        const db = await Database()
        
        const roomId = req.body.roomId

        //const verifyRoom = await db.all(`SELECT * FROM rooms WHERE id = ${roomId}`)

        //console.log(`Retorno do banco ${verifyRoom.pass}`)

        //if(verifyRoom.id == roomId){

            res.redirect(`room/${roomId}`)
        //}else{
        //    console.log("OIIIIIII")
            //res.redirect('/')
        //}

    }
}
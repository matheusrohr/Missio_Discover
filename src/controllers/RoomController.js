module.exports = {
    create(req, res){
        let roomId = 654321

        res.redirect(`/room/${roomId}`)
    }
}
const makePost = (req, res) => {
   res.send(req.file.filename)
   // console.log(req.file)
}

module.exports = { 
    makePost
}
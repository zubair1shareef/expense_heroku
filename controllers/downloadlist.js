exports.getDownloadList=(req,res)=>{
    req.user.getDownloadLists().then(list=>{
        res.status(200).json(list)
    })
}
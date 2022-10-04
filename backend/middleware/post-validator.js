//validateur de post

module.exports = (req, res, next) => {
    try {
        let ctrlInputs = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç '0-9]{2,}$");
        let content = "";
        if (req.body.post === undefined) {
            content = ctrlInputs.test(req.body.content);
        }else {
            let post = JSON.parse(req.body.post)
            content = ctrlInputs.test(post.content);
        }
        if(content){
            next();
        } else {
            res.status(402).json({ message: "Post incorrect" });
        }
    } 
    catch (error) {
        res.status(500).json({error});
    }
}
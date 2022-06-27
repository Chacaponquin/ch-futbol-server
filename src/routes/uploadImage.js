export const uploadImage = (req, res) => {
    console.log(req.files);
    res.status(200).end();
};
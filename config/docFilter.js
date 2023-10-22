const docFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(pdf|mp4|avi|json|xlsx)$/)) {
        req.fileValidationError = 'Only pdf,mp4 files are allowed!';
        return cb(new Error('Only pdf,mp4 files are allowed!'), false);
    }
    cb(null, true);
};
module.exports = docFilter;
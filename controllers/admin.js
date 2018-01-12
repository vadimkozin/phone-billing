module.exports = {
    // GET /
    showAdmin(req, res) {
        res.render('admin', {
            id: 'admin',
            title: 'Admin page!'
        });
    }
};
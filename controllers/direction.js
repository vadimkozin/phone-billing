const directions = require('../data/directions');

// для быстрого отображения кода(nid) на название(name) для направлений
const mapDirectionName = new Map();
for (let dir of directions) {
    mapDirectionName.set(Number(dir.nid), dir.name);
}
// mapDirectionName.forEach((v,k) => console.log(k,'=>', v));

module.exports = {

    // GET /directions - все направления
    showDirections(req, res) {
        res.render('directions', {
            id: 'directions',
            title: 'Направления',
            directions
        });
    },

    findDirection(req, res, next) {
        let id = req.params.id;
        let dir = directions.find(n => n.id == id);

        if (!dir) {
            let error = new Error(`Направление c id:${id} НЕ найдено`);
            error.status = 404;
            next(error);
        } else {
            req.direction = dir;

            next();
        }
    },

    // GET /directions/1 - направление с кодом 1
    showDirectionById(req, res) {
        res.render('direction', {
            id: 'direction',
            title: req.direction.name,
            direction: req.direction
        });      
    },

    // Возвращает имя направления по коду nid
    // getNameDirectionByNid(nid) {
    //     let dir = directions.find(dir => dir.nid == nid );
    //     return dir ? dir.name : '-';
    // }

    // Возвращает имя направления по коду nid
    getNameDirectionByNid(nid) {
        let name = mapDirectionName.get(Number(nid));
        return name ? name : '-';
    }

};

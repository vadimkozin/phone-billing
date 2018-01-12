const tariffs = require('../data/tariffs');
const direction = require('./direction');
const customer = require('./customer');

module.exports = {
    // GET /tariffs  -  все тарифы
    showTariffs(req, res) {
        res.render('tariffs', {
            id: 'tariffs',
            title: 'Тарифы',
            tariffs
        });
    },

    // GET /tariffs/1 - возвращает тариф по уникальному коду (id)
    showTariffById(req, res) {
        res.render('tariff', {
            id: 'tariff',
            title: `тариф : ${req.tariff.id}`,
            tariff: req.tariff
        });      
    },

    findTariff(req, res, next) {
        let id = req.params.id;
        let tariff = tariffs.find(n => n.id == id);

        if (!tariff) {
            let error = new Error(`Тариф c id:${id} НЕ найден`);
            error.status = 404;
            next(error);
        } else {
            req.tariff = tariff;

            next();
        }
    },

    // GET /tariffs/customers/1 - тарифы для клиента 1
    showTariffsForCustomer(req, res) {
        let cid = req.params.id;
        let tariffsForCustomer = tariffs.filter(n => n.cid == cid);
        
        if (tariffsForCustomer.length === 0) {
            res.render('404', {
                message: `тарифы для клиента с кодом : ${cid} НЕ найдены`,
            });

        } else {

            tariffsForCustomer.map(tar => tar.name = direction.getNameDirectionByNid(tar.nid));
            
            res.render('tariff-customer', {
                id: 'tariff-customer',
                title: `тарифы для: ${customer.getNameByCid(cid)} (${cid})`,
                tariffs: tariffsForCustomer
            });  
        }   
    },

    // GET /tariffs/customers/:cid/directions/:nid- тариф для клиента (cid) на одно направление(nid)
    showTariffCustomerOnDirection(req, res) {
        let cid = req.params.cid;
        let nid = req.params.nid;
        
        let tariffCustomerOnDirection = tariffs.filter(n => n.cid == cid && n.nid == nid)[0];
        
        if  (!tariffCustomerOnDirection) {
            res.render('404', {
                message: `тариф для клиента с кодом : ${cid} на направление: ${nid} НЕ найден`,
            });          
        } else {
            tariffCustomerOnDirection.name = direction.getNameDirectionByNid(nid);
            console.log(tariffCustomerOnDirection);
            res.render('tariff-customer-direction', {
                id: 'tariff-customer-direction',
                title: `тариф для: ${customer.getNameByCid(cid)} (${cid})`,
                tariff: tariffCustomerOnDirection,
                customer : {}
            });      
        }
    }
};
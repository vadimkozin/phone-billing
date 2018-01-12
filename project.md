#Проект: Телефонный биллинг
Техническое задание

#Сущности (то сути таблицы в БД):
numbers:    Телефонные номера (id, number, cid)     // cid = customer_id
customers:  Организации (id, name, inn, ...)
directions: Направления (id, nid, name, ...)        // nid = name_id
tariffs:    Тарифы (id, nid, cid, tar, ...)
data:       Данные  (id, date, number_from, number_to, second, ...)
itog:	    Итоги (id, year, month, cid, calls, sum_min, amount)
log:        Логирование (id, date, message, ..)

#Реализовать (get-request):
http://api/numbers                  // все номера с привязкой к организации
http://api/numbers/:id			    // подробно по номеру
http://api/numbers/customers/:id	// все номера для клиента
http://api/customers			    // все организации
http://api/customers/:id		    // подробно по одной организации
http://api/directions               // все направления (страны, города, ..)
http://api/directions/:id           // подробно по одному направлению
http://api/tariffs			        // все тарифы
http://api/tariffs/:id			    // подробно по одному тарифу
http://api/tariffs/customers/:custid	// тарифы для клиента (custid) на все направления
http://api/tariffs/customers/:custid/directions/:nameid  // тариф для клиента (custid) на одно направление(nameid)
...
#Реализовать CRUD
Так же нужно реализовать АПИ на создание, чтение, редактирование и удаление (CRUD) для :
numbers, customers, diretions, tariffs.

Данные для биллинга (data) - просто есть, поступают из внешнего источника.

#Биллинг реализовать по следующему маршруту:
POST: http://api/billing?year=xxxx&month=xx   	// биллинг за год year и месяц month

#Результат биллинга:
http://api/billing/year/:year/month/:month			// результат за year & month
http://api/billing/year/:year/month/:month/customer/:customer	// результат за year & month & customer


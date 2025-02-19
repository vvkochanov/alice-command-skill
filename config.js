/*
    Конфигурационный файл для https://github.com/subnetsRU/alice-command-skill
    Описание параметров в комментариях ниже, а более подробно со скриншотами смотрите тут https://wiki.yaboard.com/s/nw
*/

module.exports = {
    log: {
	type: 'all',		//cli - только в консоль; log - только в файл; all - вывод в консоль и файл;
	file: 'acs.log',	//название файла с логами, по умолчанию acs.log
    },
    //SSL сертификаты для сервера навыка. Можно использовать как самоподписанные так и sslforfree.com или let's encript
    ssl: {
	crt: './ssl/fullchain.pem',		//пpwdуть до файла с SSL сертификатом
	key: './ssl/privkey.pem',		//путь до файла с ключом от SSL сертификата
    },
    port: 8443,		//порт, на котором будут ожидаться запросы от яндекс диалогов
    //логин + пароль для авторизации в yandex (подробности в документации)
    login: 'dmF2YW50',
    pass: 'UG9kNTM3Z2VO',
    //или куки для авторизации в yandex (подробности в документации)
    cookie: '',
    speaker: 'REPLACE-BY-YANDEX-STATION-ID',	//id устройства яндекс.станция, взять на https://iot.quasar.yandex.ru/m/user/devices (example: ,{"id":"2077cfa6-2365-4ed4-97d5-4b46895762af","name":"Яндекс Станция","type":"devices.types.smart_speaker.yandex.station","capabilities":[],"properties":[],"groups":[],"skill_id":"Q"}]})
    auth:{
	//Кому разрешено использовать навык (несколько user_id/application перечисляются через запятую), взять из запроса в навык (session.user.user_id и session.application.application_id) (https://yandex.ru/dev/dialogs/alice/doc/protocol-docpage/#request)
	 user_id: ['REPLACE-BY-USER-USER-ID'],
	 application: ['REPLACE-BY-APPLICATION-APPLICATION-ID'],
	 //
    },
    timer_period: 5,	//с какой переодиностью обрабатывать таймеры, значение задавать в минутах, по умолчанию 5 минут.
    intents: {		//интенты, навык будет реагировать на них
	help: ['справка', 'помощь', 'что ты умеешь'],
	enable: ['включи','включить'],
	disable: ['выключи','выключить'],
	timers: ['таймер'],
	action_add: ['добавить','добавь'],
	action_del: ['удалить','удали'],
	report: ['отчет','отсчет','счет','а что','о чем'],
    },
    scenarios: {	//id сценариев взять на https://iot.quasar.yandex.ru/m/user/scenarios (example: {"id":"49c84e35-d1f3-4f8b-bc26-fe1ddd383d3f","name":"Включи люстру","icon":"day","devices":["люстра"]})
	//формат: 'имя, которое вы использовали в созданном вами сценарии': 'ID сценария'
	enable: {	//сценарии на включение, пример
	    'люстру': 'REPLACE-BY-ENABLE-SCENARIO-ID',	//сценарий: включи люстру
	    'лампу': 'REPLACE-BY-ENABLE-SCENARIO-ID',	//сценарий: включи лампу
	},
	disable:{	//сценарии на выключение, пример
	    'люстру': 'REPLACE-BY-DISABLE-SCENARIO-ID',	//сценарий: выключи люстру
	    'лампу': 'REPLACE-BY-DISABLE-SCENARIO-ID',	//сценарий: выключи лампу
	}
    },
};

/*
Из данного примера конфигурации можно составить несколько общих сценариев для умного дома (https://yandex.ru/quasar/iot), которые обработает данный навык.
Вам потребуется создать сценарии:
    * включи люстру
    * включи лампу
    * выключи люстру
    * выключи лампу

А затем можно будет создать общие сценарии, которые будут вызывать данный навык. Например такие:
    1: фраза -> включи люстру и лампу
    1: действие -> попроси <название-вашего-навыка>, включить люстру и лампу
    
    2: фраза -> выключи люстру и лампу 
    2:действие -> попроси <название-вашего-навыка>, выключить люстру и лампу
    
    3: фраза -> выключи люстру и включи лампу 
    3: действие -> попроси <название-вашего-навыка>, выключить люстру и включить лампу

    4: фраза -> выключи лампу и включи люстру 
    4: действие -> попроси <название-вашего-навыка>, выключить лампу и включить люстру

    5: фраза -> попроси <название-вашего-навыка> выключить лампу через 15 минут
    5: действие -> через 15 минут лампа выключиться

Схема работы:
    * создаем свой ОБЫЧНЫЙ приватный диалог на dialogs.yandex.ru/developer
    * устанавливаем и запускаем код навыка на сервере/хостинге
    * создаем нужные сценарии для умного дома и вносим их в конфиг навыка
*/

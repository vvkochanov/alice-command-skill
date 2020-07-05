# alice-command-skill
Навык для Яндекс Алисы, который позволяет выполнять несколько сценариев умного дома.

Например:
* включи люстру и телевизор
* выключи люстру и включи телевизор
* включи аквариум и телевизор и выключи люстру

А так же выполнять сценарии по таймеру. Например:
* добавить таймер включи ночную громкость в 23 часа
* добавить таймер включи утреннюю громкость в 8 часов
* добавить таймер включи люстру в 19 часов 30 минут
* добавить таймер выключи люстру в 22 часа 15 минут

### Install

```shell
# git clone https://github.com/subnetsRU/alice-command-skill.git
# cd alice-command-skill
# npm install
```
Отредактируйте config.js и добавьте необходимую информацию, а затем запустите навык:
```shell
# npm start
```

Более подробное описание доступно на [wiki.yaboard.com](https://wiki.yaboard.com/): [Выполнить_несколько_сценариев_за_один_раз,_таймеры_для_сценариев](https://wiki.yaboard.com/s/nw).

### Todos
 - разовые таймеры (например: выключи телевизор через X минут)
 - озвучивание установленных таймеров

License
----

MIT

P.S. Идея взята [отсюда](https://flows.nodered.org/node/node-red-contrib-yandex-alice-command).
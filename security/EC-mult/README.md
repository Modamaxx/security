## Умножение точки эллиптической кривой, выполненное на WEBASM
![image](https://user-images.githubusercontent.com/29023498/119530761-fd238780-bd8b-11eb-86db-33ca962892e5.png)
Программа поддерживает ввод собственных параметров для эллиптичской кривой, скаляра, а также точки, на которую будет производиться умножение. Эти данные можно ввести либо в десятичной СС, либо в шестнадцатеричной. Также есть кнопка для вставки данных из стандарта СТБ 34.101.45-2013 (см. **Полезные ссылки**).  
- Внимание!!! В стандарте все числа в шестандцатеричной СС даны в формате LITTLE Endian, а программа работает с числами в формате BIG Endian, поэтому при ручном копировании из стандарта необходимо их конвертировать с помощью конвертера (ссылка на него есть в разделе **Полезные ссылки**).

Для запуска обязательно нужно использовать сервер. Сервер Node JS включён в репозиторий в составе готового примера в папке example, команда для запуска: `node server.js`. Также допускается использование любого сервера, например, при наличии установленного Python, его можно запустить с помощью команды `python -m http.server`, затем перейти на http://localhost:8000 и открыть нужный html-файл.

Вычисление точки происходит по методу double-and-add, поэтому это может занять некоторое время, в среднем 11 секунд для значений из стандарта. Во время вычисления страница зависнет и не будет доступна ни для каких действий, так как WEBASM на данный момент не поддерживает асинхронное вычисление.

### Команды для ручной компиляции
1. Создание папки для расположения выходных файлов
```bash
mkdir my_example
```
3. Компиляция проекта
```bash
emcc EC/Project1/*.cpp EC/BigInteger.cpp EC/EllipticCurve.cpp EC/point.cpp -O3 -s WASM=1 \
-s EXPORTED_FUNCTIONS="['_test', '_mult', '_multDec', '_decToHex', '_hexToDec']" \
-s EXPORTED_RUNTIME_METHODS="['ccall','cwrap']" \
-o my_example/EC.html \
--shell-file assets/shell_minimal.html \
-s ERROR_ON_UNDEFINED_SYMBOLS=0 -s ASSERTIONS=1
```
3. Копирование скрипта с вспомогательными функциями
```bash
cp assets/custom_script.js my_example
```

### Полезные ссылки
https://andrea.corbellini.name/ecc/interactive/modk-mul.html - умножение точек ЭК  
http://www.save-editor.com/tools/wse_hex.html#littleendian - конвертер BIG Endian <-> LITTLE Endian  
http://apmi.bsu.by/assets/files/std/bign-spec29.pdf - СТБ 34.101.45-2013 (удобно копировать текст)

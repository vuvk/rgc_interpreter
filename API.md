# Манипуляции с объектами
| Имя функции | Входные параметры | Результат | Описание |
| ------ | ------ | ------ | ------ |
|objectGetId| - |int|Возвращает идентификатор обрабатываемого в данный момент объекта|
|objectIsInView| uint |bool|Проверяет находится ли объект в области видимости камеры|
|distanceBetweenObjects| uint uint |double|Возвращает расстояние между двумя объектами, принимает в параметрах идентификаторы объектов для проверки|
|objectSetPosition|uint double double double| - |Установить объект в позицию (x, y, z). Принимает 4 параметра: идентификатор объекта, координаты для переноса - x, y, z|
|objectSetPositionX|uint double | - |Установить объект в позицию (x). Принимает 2 параметра: идентификатор объекта, координата для переноса x|
|objectSetPositionY|uint double | - |Установить объект в позицию (y). Принимает 2 параметра: идентификатор объекта, координата для переноса y|
|objectSetPositionZ|uint double | - |Установить объект в позицию (z). Принимает 2 параметра: идентификатор объекта, координата для переноса z|
|objectMove|uint double double double| - |Сдвинуть объект на указанное расстояние. Принимает 4 параметра: идентификатор объекта, величина переноса - x, y, z|
|objectGetPositionX|uint| double |Получить позицию X объекта. Принимает 1 параметр: идентификатор объекта|
|objectGetPositionY|uint| double |Получить позицию Y объекта. Принимает 1 параметр: идентификатор объекта|
|objectGetPositionZ|uint| double |Получить позицию Z объекта. Принимает 1 параметр: идентификатор объекта|
|objectSetRotation|uint double double double| - |Установить углы поворотов объекта по осям (x, y, z). Принимает 4 параметра: идентификатор объекта, углы - pitch, yaw, roll|
|objectSetRotationX|uint double| - |Установить угол поворота объекта по оси oX. Принимает 2 параметра: идентификатор объекта, угол - pitch|
|objectSetRotationY|uint double| - |Установить угол поворота объекта по оси oY. Принимает 2 параметра: идентификатор объекта, угол - yaw|
|objectSetRotationZ|uint double| - |Установить угол поворота объекта по оси oZ. Принимает 2 параметра: идентификатор объекта, угол - roll|
|objectRotate|uint double double double| - |Повернуть объект на указанные углы по осям. Принимает 4 параметра: идентификатор объекта, углы - pitch, yaw, roll|
|objectGetRotationX|uint| double |Получить тангаж (pitch) объекта. Принимает 1 параметр: идентификатор объекта|
|objectGetRotationY|uint| double |Получить рысканье (yaw) объекта. Принимает 1 параметр: идентификатор объекта|
|objectGetRotationZ|uint| double |Получить крен (roll) объекта. Принимает 1 параметр: идентификатор объекта|

# Пользовательские данные у объектов
| Имя функции | Входные параметры | Результат | Описание |
| ------ | ------ | ------ | ------ |
|objectAddVarNumber|uint string double|-|Привязать к объекту пользовательский параметр в виде числа. Принимает 3 параметра: идентификатор объекта, имя переменной, значение|
|objectAddVarBool|uint string bool|-|Привязать к объекту пользовательский параметр в виде булевого значения. Принимает 3 параметра: идентификатор объекта, имя переменной, значение|
|objectAddVarString|uint string string|-|Привязать к объекту пользовательский параметр в виде строки. Принимает 3 параметра: идентификатор объекта, имя переменной, значение|
|objectSetVar|uint string (*)|-|Изменить значение пользовательской переменной. Функция полиморфна. Принимает 3 параметра: идентификатор объекта, имя переменной, значение. Если тип нового значения не соответствует указанному ранее типу, то значение изменено не будет |
|objectGetVar|uint string|(*)|Получить значение пользовательской переменной. Функция полиморфна. Принимает 2 параметра: идентификатор объекта, имя переменной|
|objectRemoveVar|uint string|-|Удалить пользовательскую переменную. Принимает 2 параметра: идентификатор объекта, имя переменной|
|objectClearVars|uint|-|Удалить все пользовательские переменные, привзяанные к объекту. Принимает 1 параметр: идентификатор объекта|
|objectIsVarNumber|uint string|bool|Проверка типа привязанной ранее пользовательской переменной. Возвращает true, если переменная является числом. Принимает 2 параметра: идентификатор объекта, имя переменной|
|objectIsVarBool|uint string|bool|Проверка типа привязанной ранее пользовательской переменной. Возвращает true, если переменная является булевым значением. Принимает 2 параметра: идентификатор объекта, имя переменной|
|objectIsVarString|uint string|bool|Проверка типа привязанной ранее пользовательской переменной. Возвращает true, если переменная является строкой. Принимает 2 параметра: идентификатор объекта, имя переменной|


# Математика
| Имя функции | Входные параметры | Результат | Описание |
| ------ | ------ | ------ | ------ |
|distanceBetweenPoints2d|double double double double|double|Возвращает расстояние между двумя двухмерными точками|
|distanceBetweenPoints3d|double double double double double double|double|Возвращает расстояние между двумя трехмерными точками|
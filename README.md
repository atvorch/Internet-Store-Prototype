
### Для запуска
* npm i
* npm run start

## Стек технологий
  Проект делал в связке React & Redux & TypeScript & Styled-Components.
  Проект создан при помощи create-react-app.

## Описание логики

В приложении есть общий стор который состоит из 3 модулей: cart, goods, general:
  * cart - отвечает за содержимое корзины. Содержит экшены для добавления и удаления товара из корзины.
  * goods - отвечает за список товаров. Содержит экшены для инициализации наименований и самих товаров.
  * general - отвечает за курс валюты. Содержит экшен для его изменения.
При открытии страници читаем файл с наименованиями, после этого читаем файл с товарами,  запускаем таймер с интервалом 3 секунды (не ставил 15, что бы было сразу наглядно, можно поменять в home.tsx константу UPDATE_FREQUENCY) на чтение товаров из файла и изменение курса валют.

Каждое изменение курса валют отражается на ценах в списке товаров, в корзине по итоговой цене каждого продукта и по итоговой цене всей корзины. 
Так-же добавил отображение курса валют, что бы можно было наглядно понять почему ячейки подсвечиваются красным или зеленым.

В тз небыло указано в каком случае показывать сообщение о том что количество товара ограничено, по этому выбрал ориентир в 5 единиц. Если на складе товара <= 5 показываю сообщение что товар в ограниченнном количестве. 

## Функционал 

   * При нажатии на ячейку в списке товаров, товар добавляется в корзину в количестве 1 штуки. 
   * Если в корзине товар уже есть и количество на складе позволяет добавить еще, добавляет еще 1 шт.
   * Если уменьшить количество товара в инпуте в корзине до 0 он автоматический удалится из корзины.
  
## Время

На задачу ушло 5 часов: 
  * 3 часа - основная логика: стор, компоненты, работа с чтением данных из файла и маппинг товаров с наименованиями
  * 1 час - стилизацию
  * 1 час - тестирование и фикс багов.

## Замечания

* Постарался сделать немного приближенно к дизайну, но на пиксель перфект не стал тратить времяю.
* В файле с данными товаров data.json присутствуют свойства которые в тз небыли упомянуты (СV, B, Pl), это немного сбивает столку.
* В тз поставлена задача каждые 15 секунда считывать данные из файла с товарами и в ручную манипулировать курсом валют, а так же подсвечивать ячейки товаров в зависимости от того как изменилась цена. Так как цена товаров не меняется, то курс валют затрагивает все ячейки, и если курс поднялся - все загорятся красным, упал - все загорятся зеленым.

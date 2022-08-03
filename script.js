ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map("map", {
        center: [57.768, 40.927],
        zoom: 13,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    });
    
    myMap.events.add('click', (e) => {
      const clickedCoords = e.get('coords')

      var myPolyline = new ymaps.Polyline([
        // Указываем координаты вершин.
        clickedCoords,
    ], {
      balloonContentHeader: `<p>Добавьте описание к точке</p>`,
      balloonContentBody: `<p>Название</p><input type="text" /><p>Описание</p><input type="text" /><p>Загрузить изображение</p><input type="file" /> <button>Сохранить</button>`,
    }, {
        // Задаем опции геообъекта.
        // Цвет с прозрачностью.
        strokeColor: "#00000088",
        // Ширину линии.
        strokeWidth: 4,
        // Максимально допустимое количество вершин в ломаной.
        editorMaxPoints: 20,
        // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
        editorMenuManager: function (items) {
            items.push(
              {
                title: "Отменить",
                onClick: function () {
                    myMap.geoObjects.remove(myPolyline);
                }
              },
              {
                title: "Добавить описание",
                onClick: function () {
                  myPolyline.balloon.open()
                }
              }
            );
            return items;
        }
    });

    // Добавляем линию на карту.
    myMap.geoObjects.add(myPolyline);
    myPolyline.editor.startEditing();
    
    })
}
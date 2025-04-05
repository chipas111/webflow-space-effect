# Space Travel

[demo](https://webgl-space-travel.requin.pro/)

WebGL space scene with lightspeed warp effect.

**Strongly** inspired by https://nova.app/. Entirely rewritten in typescript.

Use [three.js](https://threejs.org/) JavaScript 3D library under the hood.

## Использование в Webflow

### Установка

1. В настройках страницы Webflow, в секции "Custom Code", добавьте в HEAD:

```html
<!-- Three.js библиотека -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r127/three.min.js"></script>

<!-- Стили для canvas -->
<style>
.space-travel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    margin: 0;
    padding: 0;
}
</style>
```

2. Добавьте Canvas элемент на страницу через Webflow интерфейс:
   - Перетащите элемент "Embed" на страницу
   - В настройках элемента добавьте: `<canvas class="space-travel"></canvas>`

3. В конце секции BODY (перед закрывающим тегом </body>) добавьте:

```html
<!-- Эффект космического путешествия -->
<script src="https://cdn.jsdelivr.net/gh/chipas111/webflow-space-effect@main/dist/space-travel.umd.js"></script>
<script>
// Ждем полной загрузки страницы
window.addEventListener('load', function() {
    // Находим canvas элемент
    const canvas = document.querySelector(".space-travel");
    if (canvas && window.SpaceTravel) {
        // Создаем эффект
        const spaceEffect = new window.SpaceTravel({
            canvas,
            throttle: 0.5 // Скорость эффекта (0-1)
        });
        spaceEffect.start();

        // Сохраняем доступ к эффекту для Interactions
        window.spaceEffect = spaceEffect;
    }
});
</script>
```

### Управление через Webflow Interactions

Вы можете управлять эффектом через Interactions в Webflow. Примеры:

1. Изменение скорости при наведении:
```javascript
window.spaceEffect.throttle = 0.8; // Увеличить скорость (0-1)
```

2. Пауза/возобновление при клике:
```javascript
if (window.spaceEffect.throttle > 0) {
    window.spaceEffect.pause();
} else {
    window.spaceEffect.resume();
}
```

3. Плавное изменение скорости:
```javascript
// Увеличить скорость
window.spaceEffect.throttle = Math.min(1, window.spaceEffect.throttle + 0.1);

// Уменьшить скорость
window.spaceEffect.throttle = Math.max(0, window.spaceEffect.throttle - 0.1);
```

## API

### Опции

- `canvas`: HTMLCanvasElement - canvas элемент для рендеринга
- `throttle`: number (0-1) - скорость эффекта (по умолчанию: 0)

### Методы

- `start()`: Запускает анимацию
- `pause()`: Приостанавливает анимацию
- `resume()`: Возобновляет анимацию
- `resize()`: Обновляет размеры при изменении окна
- `destroy()`: Очищает ресурсы

## Usage

### Script

```html
<canvas id="space-travel"></canvas>
<script type="module">
  import SpaceTravel from "https://unpkg.com/space-travel?module";
  new SpaceTravel({ canvas: document.getElementById("space-travel") }).start();
</script>
```

### Module

```console
$ npm install space-travel
```

From your application js file :

```js
import SpaceTravel from "space-travel";
new SpaceTravel({ canvas: document.getElementById("space-travel") }).start();
```

### Interactions

You can bind DOM events to interact with instance state (`throttle`, `opacity`) or call methods (`pause()`, `resume()`, `resize()`).
See [src/main.ts](https://github.com/frequin/space-travel/blob/master/src/main.ts) as an example.

## Documentation

### `class SpaceTravel`

#### constructor

```js
const scene = new SpaceTravel(parameters);
```

#### `parameters`

| name                            | value                            | description                                                                                        |
| ------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| `parameters.canvas`             | **required**                     | HTML canvas to be rendered                                                                         |
| `parameters.throttle`           | _optionnal_ default : `0`        | Number between `0` and `1`. Initial speed with relative increasing intensity.                      |
| `parameters.throttleLerpFactor` | _optionnal_ default : `0.035`    | Number defining an acceleration factor to reach a new throttle value                               |
| `parameters.opacity`            | _optionnal_ default : `1`        | Number between `0` and `1`. Initial global opacity.                                                |
| `parameters.opacityLerpFactor`  | _optionnal_ default : `0.016`    | Number between `0` and `1`. Number defining an acceleration factor to reach a new opacity value.   |
| `parameters.startOpacity`       | _optionnal_ default : `0`        | Number between `0` and `1`. Global opacity on scene creation before reaching `parameters.opacity`. |
| `parameters.backgroundColor`    | _optionnal_ default : `0x08000f` | Color (hex number or css string value) filling the canvas background                               |
| `parameters.starfield`          | _optionnal_                      | starfield parameters (see below)                                                                   |
| `parameters.nebulae`            | _optionnal_                      | nebulae parameters (see below)                                                                     |

#### `starfield` parameters

| name                            | value                                                                               | description                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `starfield.count`               | _optionnal_ default : `1500`                                                        | Number of stars in the scene                                                            |
| `starfield.size`                | _optionnal_ default : `0.005`                                                       | Size of stars in the scene                                                             |
| `starfield.speed`               | _optionnal_ default : `0.0005`                                                      | Speed of star movement in the scene                                                    |
| `starfield.opacity`             | _optionnal_ default : `0.5`                                                         | Opacity of stars in the scene                                                           |
| `starfield.color`               | _optionnal_ default : `0xffffff`                                                    | Color of stars in the scene                                                              |
| `starfield.fade`                | _optionnal_ default : `0.0001`                                                      | Fade rate of stars in the scene                                                         |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                             |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                             |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                             |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                             |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                     |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                     |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                     |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                     |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                   |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                   |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `starfield.maxOpacity`          | _optionnal_ default : `1`                                                           | Maximum opacity of stars in the scene                                                 |
| `starfield.minFade`             | _optionnal_ default : `0.00001`                                                     | Minimum fade rate of stars in the scene                                                 |
| `starfield.maxFade`             | _optionnal_ default : `0.001`                                                       | Maximum fade rate of stars in the scene                                                 |
| `starfield.minDistance`         | _optionnal_ default : `100`                                                         | Minimum distance between stars in the scene                                                 |
| `starfield.maxDistance`         | _optionnal_ default : `200`                                                         | Maximum distance between stars in the scene                                                 |
| `starfield.minAngle`            | _optionnal_ default : `0`                                                           | Minimum angle between stars in the scene                                                 |
| `starfield.maxAngle`            | _optionnal_ default : `360`                                                         | Maximum angle between stars in the scene                                                 |
| `starfield.minSpeed`            | _optionnal_ default : `0.0001`                                                      | Minimum speed of star movement in the scene                                                 |
| `starfield.maxSpeed`            | _optionnal_ default : `0.0005`                                                      | Maximum speed of star movement in the scene                                                 |
| `starfield.minSize`             | _optionnal_ default : `0.001`                                                       | Minimum size of stars in the scene                                                 |
| `starfield.maxSize`             | _optionnal_ default : `0.01`                                                        | Maximum size of stars in the scene                                                 |
| `starfield.minOpacity`          | _optionnal_ default : `0.1`                                                         | Minimum opacity of stars in the scene                                                 |
| `
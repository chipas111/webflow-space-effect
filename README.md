# Space Travel

[demo](https://webgl-space-travel.requin.pro/)

WebGL space scene with lightspeed warp effect.

**Strongly** inspired by https://nova.app/. Entirely rewritten in typescript.

Use [three.js](https://threejs.org/) JavaScript 3D library under the hood.

## Использование в Webflow

### Установка

1. Добавьте следующие скрипты и стили в раздел "Custom Code" в секции HEAD:

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
}
</style>
```

2. Добавьте Canvas элемент на страницу через Webflow интерфейс и назначьте ему класс `space-travel`

3. В самом конце секции BODY (перед закрывающим тегом </body>) добавьте:

```html
<!-- Эффект космического путешествия -->
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/webflow-space-effect@main/dist/space-travel.min.js"></script>
<script>
// Ждем полной загрузки страницы
window.addEventListener('load', function() {
    // Находим canvas элемент
    const canvas = document.querySelector(".space-travel");
    if (canvas && window.SpaceTravel) {
        // Создаем эффект
        const spaceTravel = new window.SpaceTravel({
            canvas,
            throttle: 0.5
        });
        spaceTravel.start();
    }
});
</script>
```

### Настройка эффекта

Вы можете настроить следующие параметры эффекта:

- `throttle`: число от 0 до 1 - скорость эффекта (по умолчанию: 0)
- Другие параметры можно найти в разделе API ниже

### Управление через Interactions в Webflow

Вы можете использовать Webflow Interactions для управления эффектом. Например:

1. Для изменения скорости при наведении:
```javascript
const spaceEffect = document.querySelector('.space-travel').__spaceTravel;
if (spaceEffect) {
    spaceEffect.throttle = 0.8; // Увеличить скорость
}
```

2. Для паузы/возобновления:
```javascript
const spaceEffect = document.querySelector('.space-travel').__spaceTravel;
if (spaceEffect) {
    spaceEffect.pause(); // или spaceEffect.resume()
}
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
| `
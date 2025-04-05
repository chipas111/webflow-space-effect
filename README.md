# Webflow Space Effect

Эффект космического путешествия для Webflow с использованием Three.js

## Установка в Webflow

1. В настройках страницы Webflow добавьте следующие скрипты перед закрывающим тегом `</body>`:

```html
<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.162.0/three.min.js"></script>
<!-- Space Effect -->
<script src="https://cdn.jsdelivr.net/gh/[ваш-username]/webflow-space-effect@main/dist/space-effect.umd.js"></script>
```

2. Добавьте div элемент для контейнера эффекта:

```html
<div id="space-container" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"></div>
```

3. Добавьте код инициализации в Custom Code:

```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('space-container');
  const effect = new SpaceEffect({
    container: container,
    speed: 1,
    starCount: 1000
  });

  // Опционально: управление через Webflow Interactions
  window.spaceEffect = effect;
});
</script>
```

## Управление через Webflow Interactions

Вы можете управлять эффектом через Webflow Interactions, используя Custom Code в действиях:

### Изменение скорости:
```javascript
window.spaceEffect.setSpeed(2); // Значение от 0 до 10
```

### Пауза:
```javascript
window.spaceEffect.pause();
```

### Возобновление:
```javascript
window.spaceEffect.resume();
```

## Параметры

При инициализации можно настроить следующие параметры:

- `container`: DOM элемент для рендеринга (по умолчанию: document.body)
- `speed`: Скорость движения звезд (по умолчанию: 1)
- `starCount`: Количество звезд (по умолчанию: 1000)

## Разработка

1. Установите зависимости:
```bash
npm install
```

2. Запустите сборку:
```bash
npm run build
```

Собранные файлы будут находиться в директории `dist/`.
# 🎯 Guía de Reconocimiento AR - Mundial 2026

Esta guía te explica cómo configurar el reconocimiento de imágenes para detectar escudos de países y mostrar modelos 3D específicos.

## 📋 Pasos para configurar el reconocimiento de escudos

### 1️⃣ Preparar las imágenes de los escudos

1. Guarda las imágenes de los escudos que quieres detectar
2. **Requisitos de las imágenes:**
   - Formato: PNG o JPG
   - Resolución recomendada: 480x480 a 1024x1024 píxeles
   - Imágenes claras con buen contraste
   - Evita fondos muy similares al escudo
   - La imagen debe tener suficientes detalles únicos

**💡 Tip:** Cuanto más distintivo sea el escudo, mejor será el reconocimiento.

### 2️⃣ Compilar los targets

#### Opción A: Usando la herramienta web (Recomendado)

1. Abre el archivo **`public/targets/compile-targets.html`** en tu navegador
2. Arrastra las imágenes de los escudos (O haz clic para seleccionar)
   - **IMPORTANTE:** El orden importa. La primera imagen será Target 0, la segunda Target 1, etc.
3. Haz clic en **"Compilar Targets"**
4. Se descargará automáticamente el archivo **`targets.mind`**
5. Coloca el archivo `targets.mind` en la carpeta **`public/targets/`**

#### Opción B: Usando Node.js (Avanzado)

```bash
npm install -g mindar-image-cli
mindar-image-cli compile path/to/images/folder public/targets/targets.mind
```

### 3️⃣ Configurar los modelos 3D en ar.html

En el archivo `public/ar.html`, encontrarás la configuración de cada target. Por ejemplo:

```html
<!-- Target 0: Escudo de Mexico -->
<a-entity id="mexicoTarget" mindar-image-target="targetIndex: 0">
  <a-entity
    id="copaEntity"
    gltf-model="#copaModel"
    position="0 0.25 0"
    scale="0.5 0.5 0.5"
    rotation="0 0 0"
  ></a-entity>
</a-entity>
```

**Para agregar más escudos:**

1. Agrega el modelo 3D en los assets:
```html
<a-assets timeout="15000">
  <a-asset-item id="copaModel" src="./models/CopaMexicoOficial.glb"></a-asset-item>
  <a-asset-item id="usaModel" src="./models/CopaUSA.glb"></a-asset-item>
  <!-- Agrega más modelos aquí -->
</a-assets>
```

2. Crea un nuevo target entity:
```html
<!-- Target 1: Escudo de USA -->
<a-entity id="usaTarget" mindar-image-target="targetIndex: 1">
  <a-entity
    gltf-model="#usaModel"
    position="0 0.25 0"
    scale="0.5 0.5 0.5"
  ></a-entity>
</a-entity>
```

3. Agrega el listener de eventos:
```javascript
const usaTarget = document.getElementById('usaTarget');

usaTarget.addEventListener('targetFound', () => {
  debugLog('¡Escudo de USA detectado!');
  document.getElementById('statusText').textContent = 'Escudo USA detectado';
  infoPanel.textContent = 'Estados Unidos - Anfitrión del Mundial 2026';
  infoPanel.style.display = 'block';
});

usaTarget.addEventListener('targetLost', () => {
  debugLog('Escudo USA perdido');
  document.getElementById('statusText').textContent = 'Buscando escudo...';
  infoPanel.style.display = 'none';
});
```

## 🎨 Ejemplo completo: México

### Paso 1: Orden de las imágenes en el compilador
```
1. mexico-escudo.png  → Target 0
```

### Paso 2: Configuración en ar.html
```html
<!-- Ya está configurado -->
<a-entity id="mexicoTarget" mindar-image-target="targetIndex: 0">
  <a-entity
    gltf-model="#copaModel"
    position="0 0.25 0"
    scale="0.5 0.5 0.5"
    animation="property: rotation; to: 0 360 0; loop: true; dur: 6000"
  ></a-entity>
</a-entity>
```

### Paso 3: Probar
1. Guarda la imagen del escudo de México
2. Compílala usando `compile-targets.html`
3. Coloca `targets.mind` en `public/targets/`
4. Abre la app en https://localhost:3000
5. Ve a la sección AR
6. Apunta la cámara al escudo impreso o en pantalla

## 🔧 Ajustes de posición y escala

Puedes modificar estos valores según necesites:

```html
<a-entity
  gltf-model="#copaModel"
  position="X Y Z"      <!-- Mover el modelo: adelante/atrás, arriba/abajo, izq/der -->
  scale="X Y Z"         <!-- Tamaño del modelo -->
  rotation="X Y Z"      <!-- Rotación en grados -->
>
```

### Ejemplos:
- `position="0 0.5 0"` - Sube el modelo 0.5 unidades
- `scale="1 1 1"` - Modelo más grande
- `rotation="0 45 0"` - Rotar 45 grados en Y

## 🚨 Solución de problemas

### El escudo no se detecta
- ✅ Verifica que `targets.mind` esté en `public/targets/`
- ✅ Asegúrate de que la imagen tiene buen contraste
- ✅ Prueba con mejor iluminación
- ✅ El escudo debe ocupar al menos 1/3 de la pantalla
- ✅ Mantén la cámara estable

### El modelo no aparece
- ✅ Verifica que el archivo `.glb` esté en `public/models/`
- ✅ Revisa la consola del navegador (F12) para ver errores
- ✅ Verifica que el `targetIndex` coincida con el orden de compilación

### La app no se carga
- ✅ Asegúrate de usar HTTPS (MindAR requiere cámara segura)
- ✅ El servidor debe estar en https://localhost:3000
- ✅ Acepta los permisos de cámara cuando lo solicite

## 📱 Probar en móvil

1. Tu computadora y móvil deben estar en la misma red WiFi
2. Obtén la IP de tu computadora:
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```
3. En el móvil, ve a: `https://TU_IP:3000`
4. Acepta el certificado autofirmado (advertencia de seguridad)

## 🎯 Mejores prácticas

1. **Calidad de imagen:** Usa imágenes de alta calidad con detalles únicos
2. **Tamaño consistente:** Todas las imágenes deben tener tamaños similares
3. **Iluminación:** Los escudos deben estar bien iluminados al escanear
4. **Contraste:** Fondo diferente al color del escudo
5. **Cantidad:** No exceder 10-15 targets para mejor rendimiento

## 📚 Recursos adicionales

- [MindAR Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [GLTF Models](https://sketchfab.com/)

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para ver mensajes de debug detallados.

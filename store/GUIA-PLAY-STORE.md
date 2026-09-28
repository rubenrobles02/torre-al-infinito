# Guía para publicar Torre al Infinito en Google Play

## Archivos listos

| Qué | Dónde | Para qué |
|---|---|---|
| **App para subir** | `release/torre-al-infinito-1.0.0.aab` | Es lo que se sube a Play Console |
| APK de prueba | `release/torre-al-infinito-1.0.0.apk` | Para instalarla en tu móvil y probarla |
| Icono 512×512 | `store/graphics/icono-512.png` | Icono de la ficha |
| Gráfico destacado 1024×500 | `store/graphics/grafico-destacado-es.png` y `-en.png` | Imagen de cabecera de la ficha |
| Capturas de pantalla | Las tuyas | Mínimo 2 por idioma, formato 9:16 |
| Textos de la ficha | `store/ficha-es.md` y `store/listing-en.md` | Nombre, descripciones y notas de la versión |
| Política de privacidad | https://rubenrobles02.github.io/torre-al-infinito/privacy.html | Campo "Política de privacidad" |

Datos de la app:
- **ID de la app (package):** `io.github.rubenrobles02.torrealinfinito`. **No se puede cambiar nunca** una vez publicada.
- **Versión:** 1.0.0 (código de versión 1)
- **Android:** mínimo Android 7.0 (API 24), orientado a Android 16 (API 36)

## ⚠️ La clave de firma: haz una copia YA

La carpeta `C:\Users\Gabriel\android-keys\` contiene:
- `torre-al-infinito-upload.jks`: la clave con la que se firma la app.
- `keystore.properties`: la contraseña de la clave.

**Copia esa carpeta entera a un sitio seguro**, por ejemplo un USB o tu Google Drive privado. Nunca la subas a GitHub.

Si la pierdes, podrás seguir actualizando el juego, pero tendrás que pedir a Google que restablezca la clave de subida, lo que lleva días. Con la firma de apps de Google Play (paso 3), Google guarda la clave final y la tuya solo sirve para subir versiones.

## Paso a paso en Play Console

### 1. Crear la app
1. Entra en https://play.google.com/console y pulsa **Crear app**.
2. Nombre: **Torre al Infinito**. Idioma predeterminado: **Español (España) – es-ES**.
3. Tipo: **Juego**. Gratis o de pago: **Gratis**.
4. Acepta las declaraciones y pulsa **Crear app**.

### 2. Configurar la app (Panel → "Configura tu app")
Rellena cada apartado con estas respuestas:

- **Política de privacidad:** `https://rubenrobles02.github.io/torre-al-infinito/privacy.html`
- **Acceso a la app:** Toda la funcionalidad está disponible sin restricciones.
- **Anuncios:** No, la app no contiene anuncios.
- **Clasificación de contenido:** rellena el cuestionario IARC:
  - Categoría: *Juego*.
  - Violencia, sangre, miedo, sexualidad, lenguaje soez, drogas, apuestas: **No** a todo. El obrero se cae de forma cómica, sin heridas ni sangre.
  - ¿Los usuarios pueden interactuar o compartir contenido?: **No**.
  - ¿Compras digitales?: **No**. Las monedas se ganan jugando, no se compran con dinero.
  - ¿Comparte la ubicación del usuario?: **No**.
  - Resultado esperado: PEGI 3 / Everyone.
- **Público objetivo:** elige **13-15, 16-17 y 18+**. Si incluyes menores de 13 años, la app entra en el programa de Familias, que tiene requisitos y revisiones extra. Se puede ampliar más adelante.
- **Seguridad de los datos:**
  - ¿Tu app recoge o comparte datos de usuario? **No**.
  - Todo se guarda solo en el dispositivo, y eso no cuenta como "recogida" para Google.
- **Aplicación gubernamental / funciones financieras / salud / noticias:** **No** a todo.
- **Categoría y datos de contacto** (Presencia en tienda → Configuración de la tienda):
  - Categoría **Juegos → Casual**.
  - Tu correo de contacto. Google lo muestra en la ficha.

### 3. Ficha de la tienda
Presencia en tienda → **Ficha principal de Play Store**:
1. Pega el nombre, la descripción breve y la descripción completa de `store/ficha-es.md`.
2. Sube el **icono** `icono-512.png`, el **gráfico destacado** `grafico-destacado-es.png` y tus **capturas de pantalla** de teléfono.
3. Pulsa **Gestionar traducciones → Añadir inglés (en-US)** y rellena la versión en inglés con `store/listing-en.md` y `grafico-destacado-en.png`.

### 4. Prueba cerrada (obligatoria en cuentas personales nuevas)
Las cuentas de desarrollador personales creadas después de noviembre de 2023 tienen que hacer una **prueba cerrada con al menos 12 personas durante 14 días seguidos** antes de poder publicar para todo el mundo. Comprueba en tu Play Console si te lo pide.

1. **Pruebas → Prueba cerrada → Crear canal** (o usa el canal "Alpha").
2. En **Testers**, crea una lista de correo con los Gmail de al menos 12 personas. Cada una tiene que aceptar la invitación con el enlace que da Play Console y dejar la app instalada.
3. **Crear versión:**
   - La primera vez, Google te pregunta por la **firma de apps de Google Play**: acepta **Usar la firma de apps de Google Play** (recomendado).
   - Sube `release/torre-al-infinito-1.0.0.aab`.
   - Nombre de la versión: `1.0.0`. Notas de la versión: las de `ficha-es.md`.
4. **Revisar versión → Iniciar lanzamiento**. La revisión de Google suele tardar de unas horas a unos días.
5. Pasados los 14 días con 12 testers, en el **Panel** aparece la opción de **solicitar acceso a producción**. Google te hace unas preguntas sobre la prueba y, al aprobarlo, puedes publicar para todos.

### 5. Producción
**Producción → Crear versión**, elige la misma versión o una nueva, y **Iniciar lanzamiento a producción**.

## Probar la app en tu móvil antes de subirla
1. Pasa `release/torre-al-infinito-1.0.0.apk` al móvil, por USB, Google Drive o correo.
2. Ábrelo. Android pedirá permitir "instalar apps de origen desconocido" para esa app (Archivos, Drive…). Acéptalo solo para instalarla.
3. Comprueba sobre todo: que carga, que el botón **atrás** pausa y vuelve al menú, que **Salir** cierra la app, y que va fluido. Si no, prueba la calidad Media o Baja.

## Publicar una actualización más adelante
1. Haz los cambios en `index.html`.
2. Sube el número de versión en `android/app/build.gradle`: `versionCode` +1 (2, 3, 4…) y `versionName` (1.0.1, 1.1.0…). Google rechaza un AAB con un `versionCode` que ya subiste.
3. En la carpeta del proyecto:
   ```
   npm run sync
   cd android
   gradlew bundleRelease
   ```
   El AAB nuevo sale en `android/app/build/outputs/bundle/release/app-release.aab`.
4. En Play Console, crea una versión nueva en el canal que toque y sube ese archivo.

Para compilar hace falta que `android/keystore.properties` exista. Es una copia de `C:\Users\Gabriel\android-keys\keystore.properties` y no se sube a GitHub. Las herramientas (Java y SDK de Android) están en `C:\Users\Gabriel\android-tools\`.

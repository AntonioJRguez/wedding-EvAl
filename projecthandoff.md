# Eva & Alfonso — Project Handoff

Boda: **18.09.2027 — Ciudad Real** (sede por confirmar).
Sitio estático (HTML/CSS/JS puro, sin build ni dependencias de npm). Abrir `index.html` directamente o servir con Live Server.

## Estructura de archivos

```
index.html             ← página principal (la que sirve GitHub Pages): sin marco, símbolo de anillos entrelazados
css/style-old.css       ← hoja de estilos de index.html
withpictureframe.html  ← versión secundaria/referencia: hero con marco ornamental (marco-01.svg) + flores a los lados
css/style.css           ← hoja de estilos de withpictureframe.html
js/main.js              ← compartido por ambas páginas
fonts/Nouveau Nostalgia.ttf
images/README.txt      ← nombres de archivo y proporciones que espera cada foto
```

`index.html` y `withpictureframe.html` se intercambiaron el 2026-08-29 (antes era al revés). `withpictureframe.html` se conserva a propósito como referencia de diseño — no borrar — para reutilizar ideas suyas (el marco, la disposición de flores, etc.) en la web principal más adelante. Cada una tiene un botón flotante rosa chillón "⚠ DEV: ..." (a propósito desentona con el diseño) que enlaza a la otra, para poder compararlas.

## Dirección de diseño

Editorial minimalista, más revista de arte/diseño independiente que web de boda tradicional. Mucho blanco, tipografía protagonista, fotografía de aspecto analógico.

**Principio de proyecto:** siempre se prioriza CSS lo más moderno posible, pero adaptado a lo más válido/compatible para todos los navegadores — evitar depender de features de borde sin buen soporte.

**Tipografía:**
- Display: `Nouveau Nostalgia` (self-hosted, `/fonts`) — "Eva y Alfonso" del hero y todos los títulos importantes,los demás puedes usar `Fraunces`. Monograma "E × A" (nav/footer).
- Serif editorial: `Fraunces` (Google Fonts, con itálica) — pull-quote de Historia, títulos del Programa, enlaces del menú móvil. Tiene acentos completos.
- Sans funcional: `Inter` (Google Fonts) — cuerpo de texto.
- Mono técnico: `Space Mono` (Google Fonts) — etiquetas, números, nav, meta.

**Paleta** (definida en `:root` de `css/style.css`, editable por variable):

| Token | Hex | Rol asignado |
|---|---|---|
| `--ink` | `#020202` | Texto principal |
| `--paper` | `#F7F5F0` | Fondo principal |
| `--wine` | `#3E0415` | Acento Home (`--accent-home`) |
| `--burgundy` | `#860408` | Acento RSVP (`--accent-rsvp`, botones) |
| `--plum` | `#5D0C48` | Acento Historia (`--accent-historia`) |
| `--purple` | `#663D74` | Acento La boda (`--accent-boda`) |
| `--magenta` | `#8F0155` | Selección de texto (`--color-selection`) |
| `--rust` | `#773903` | Etiquetas de foto / gráficos (`--color-graphic`) |
| `--brown` | `#8E5C02` | Texto secundario/meta (`--color-secondary`) |
| `--mustard` | `#CC8A02` | Acento Programa (`--accent-programa`) |
| `--orange` | `#F07802` | Interacción/CTA global (`--color-interaction`) |
| `--olive` | `#545310` | Sin asignar todavía |
| `--green` | `#1F5C01` | Acento Lugar (`--accent-lugar`) |
| `--yellow-green` | `#838300` | Acento Música (`--accent-musica`) |
| `--stone-grey` | `#3A3A3A` | *(añadido fuera de la paleta original)* — titular de portada, más suave que `--ink` |

Cada sección tiene su color vía `--section-accent` / `--accent-*`, así que recolorear una sección es cambiar una sola línea.

## Secciones (en orden, con ancla)

1. **`#home`** — Hero minimalista centrado (vertical y horizontal). "Eva *y* Alfonso" (conector en cursiva, tamaño reducido al 50%, ligeramente bajado respecto a la línea base). Fecha + lugar en mono. Cuenta atrás en vivo hasta 2027-09-18 (actualiza cada segundo, muestra "Hoy es el día." al llegar). Sin foto ni masthead — se simplificó tras feedback ("quiero más minimalismo").
2. **Foto de apertura** — bloque a pantalla completa fuera de `<section>`, panorámica 21:9, con parallax sutil. Es la "fotografía potente" de la pareja.
3. **`#historia`** — "Cómo empezó (más o menos)". Copy de ejemplo con tono irreverente (contraste arte/medicina) — **placeholder de texto, sustituir por la historia real**.
4. **`#boda`** — Datos prácticos (fecha, lugar, ceremonia, celebración, dress code, cómo llegar) + mapa de Google embebido centrado en Ciudad Real (genérico, sin API key).
5. **`#programa`** — Horario tipo programa de exposición, 6 franjas con hora placeholder.
6. **`#rsvp`** — Formulario: nombre, asistencia (radio), acompañante (checkbox condicional), preferencias alimentarias (select), mensaje. **Solo frontend**: valida y muestra confirmación en pantalla, pero no envía a ningún backend todavía. El punto de conexión (Formspree/Netlify Forms) está comentado en `index.html` junto al `<form>`.
7. **`#lugar`** — 2 fotos + dirección/aparcamiento/alojamiento (todo placeholder).
8. **`#musica`** — Tracklist de ejemplo ("Cara A/B") + CTA que enlaza al mensaje del RSVP para sugerencias.
9. **Footer** — Monograma "E × A", fecha, mensaje, volver arriba.

## Microinteracciones

- Scroll reveal por sección (`IntersectionObserver`, respeta `prefers-reduced-motion`).
- Nav fija: fondo al hacer scroll + resalta la sección activa.
- Menú móvil a pantalla completa.
- Cursor personalizado (círculo "Ver") sobre fotos, solo en dispositivos con puntero fino.
- Parallax sutil en la foto de apertura.
- Patrón de fondo tipo damasco (`images/pattern-damask-black.png`; también existe `images/pattern-damask-gold.png` con el color original, sin usar por ahora) en `#historia` y `#programa`: textura casi invisible de base (5% opacidad) + un foco tipo linterna (círculo de 650px, borde muy difuminado) que sigue al cursor y revela el motivo con más contraste. Solo en dispositivos con puntero fino; en táctil se queda la textura ambiente sin foco. Nota: esto se aparta bastante del minimalismo "sin ornamentos" del brief inicial — se añadió a petición explícita del usuario, con la intensidad reducida a propósito (blanco y negro, muy sutil) para no romper del todo la identidad editorial.

## Fotos: sistema de "huecos", no placeholders

Por petición explícita, no hay cajas decorativas ni texto instructivo sobre las fotos. Si el archivo no existe todavía, el hueco queda en blanco (mismo tamaño/proporción reservada) con solo la etiqueta numerada de esquina ("N.º 01", etc.). Ver `images/README.txt` para el nombre de archivo y proporción exacta que espera cada hueco. Eva va a añadir también dibujos propios más adelante — el mismo mecanismo (poner un archivo con el nombre esperado) sirve igual para eso.

## Nota sobre la fuente Nouveau Nostalgia.ttf

Verificado con `fontTools` (105 glifos en total):

- **Bug real encontrado**: los codepoints de á é í ó ú ñ Ñ ü Ü *están* mapeados en la fuente, pero apuntan al mismo glifo que su letra sin acentuar (á = mismo contorno que "a", ñ = mismo que "n", etc.). No existe ningún trazo de tilde/virgulilla dibujado en el archivo. Resultado: cualquier palabra con acento se renderiza en esta fuente **sin el acento, de forma silenciosa** (el HTML es correcto, el problema es solo visual). No es un problema de codificación del proyecto.
- **Fix aplicado**: `Nouveau Nostalgia` se restringió a los únicos usos que nunca llevan tilde (nombres del hero, monograma, cifras). Todo lo demás pasó a `Fraunces` (serif editorial de Google Fonts con acentos completos) — ver sección Tipografía arriba.
- Tampoco incluye `×` (multiplicación), `¿`, `¡`, guiones en/em (– —) ni punto medio (·) — sin impacto porque esos caracteres solo aparecen donde ya no se usa esta fuente, excepto el `×` del monograma "E × A", que se deja tal cual a propósito (cae a Times New Roman como fallback solo en ese carácter).
- Si en algún momento se quiere arreglar el archivo de fuente en sí (añadir tildes reales dibujadas): abrir el `.ttf` en FontForge y componer cada glifo acentuado a mano, ya que no hay ninguna marca de acento existente en el archivo para reutilizar.

## Pendiente / por confirmar

- Fotos reales (6 archivos, ver `images/README.txt`).
- Sede exacta de la boda en Ciudad Real.
- Horarios reales (ceremonia, celebración, programa del día).
- Dress code definitivo (el texto actual es un placeholder con el tono pedido, no el real).
- Fecha límite de RSVP.
- Historia real de la pareja (el texto actual es de ejemplo).
- Playlist real (tracklist actual es de ejemplo).
- Backend del RSVP: elegir servicio (Formspree / Netlify Forms / Google Form) cuando se quiera recibir respuestas reales.
- Aparcamiento/alojamiento en la sección Lugar.

# Saint Wiki — Caballeros del Zodiaco

Sitio web estático sobre el universo de **Saint Seiya**. Muestra las categorías de
Caballeros de Oro, Plata y Bronce, además de otros personajes, con un buscador que
filtra por nombre, armadura o técnica.

Proyecto académico de **Diseño Web 2**.

## Tecnologías

- HTML5
- CSS3
- JavaScript (sin librerías)
- Datos en archivos JSON

## Estructura

```
├── index.html          Página principal
├── css/
│   └── estilos.css     Estilos del sitio
├── js/
│   └── main.js         Carga de categorías y buscador
├── data/
│   ├── oro.json        Caballeros de Oro
│   ├── plata.json      Caballeros de Plata
│   ├── bronce.json     Caballeros de Bronce
│   └── otros.json      Otros personajes
└── IMAGENES/           Imágenes organizadas por categoría
```

## Cómo verlo en local

Los datos se cargan con `fetch`, por lo que **no alcanza con abrir `index.html`
haciendo doble clic**. Hay que servir la carpeta con un servidor local:

```bash
python -m http.server 8123
```

Luego abrir <http://localhost:8123> en el navegador.

Alternativas: extensión **Live Server** de VS Code o `npx serve`.

## Publicarlo en GitHub Pages

1. Crear un repositorio en GitHub (por ejemplo `Caballeros-del-Zodiaco`).
2. Subir el proyecto:

   ```bash
   git init -b main
   git add .
   git commit -m "Saint Wiki: sitio optimizado"
   git remote add origin https://github.com/USUARIO/Caballeros-del-Zodiaco.git
   git push -u origin main
   ```

3. En GitHub entrar en **Settings → Pages**.
4. En *Source* elegir **Deploy from a branch**, rama **main** y carpeta **/ (root)**.
5. Guardar y esperar unos minutos. La URL queda así:

   `https://USUARIO.github.io/Caballeros-del-Zodiaco/`

El archivo `.nojekyll` ya está incluido para que GitHub Pages publique el sitio
tal cual, sin procesarlo con Jekyll.

## Optimización aplicada

- Retratos de personajes: JPG de 500 × 500 px.
- Portadas de categorías: JPG de 600 × 335 px.
- Banner del encabezado: JPG de 1500 × 300 px.
- Fondos: JPG de 1600 × 900 px (antes PNG de más de 2 MB cada uno).
- Logo y favicon: PNG de 256 × 256 px (conserva la transparencia).
- Imágenes de personajes con dimensiones declaradas y `decoding="async"`.
- Estilos de foco visibles y soporte para `prefers-reduced-motion`.

## Créditos

- Bosquejo original: Grisel (Diseño Web 1)
- Desarrollo Web: Anabel, Cynthia y Diego (Diseño Web 2)

Saint Seiya y sus personajes pertenecen a sus respectivos autores. Este sitio
tiene fines educativos y no comerciales.

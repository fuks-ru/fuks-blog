# Typedoc Theme Hierarchy

![plot](./.github/images/demo.jpg)

## Installing

---

```bash
npm i typedoc-theme-hierarchy -D
```

## Usage

---

```bash
typedoc --entryPoints src --entryPointStrategy expand --out docs --plugin ./node_modules/typedoc-theme-hierarchy/dist/index.js --theme hierarchy

cp -R ./node_modules/typedoc-theme-hierarchy/dist/assets/* ./docs/assets && cp -R ./node_modules/@fortawesome/fontawesome-free ./docs/assets/fontawesome
```
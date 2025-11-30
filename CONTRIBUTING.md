#  Guía de Contribución

¡Bienvenido al equipo! Este documento define cómo trabajamos juntos para mantener el código ordenado, evitar conflictos y asegurarnos de que el proyecto escale sin problemas.

Como somos un equipo ágil, la comunicación es clave, pero seguir estas reglas técnicas evitará desastres.

---

##  Estrategia de Ramas (Git Flow Simplificado)

Tenemos dos ramas principales que son permanentes:

1.  **`main` (Producción):** 🔴 **INTOCABLE**. Contiene solo el código listo para el usuario final. Nadie hace commit directo aquí.
2.  **`develop` (Desarrollo):** 🟡 **Nuestra Base**. Aquí se fusionan todas las nuevas funcionalidades. De aquí sacamos copias para trabajar.

### Naming Convention (Nombres de Ramas)
Cuando crees una rama nueva para trabajar, usa estos prefijos:

* `feat/nombre-tarea`: Para nuevas funcionalidades (ej: `feat/login-page`, `feat/navbar`).
* `fix/nombre-bug`: Para arreglar errores (ej: `fix/error-boton-pago`).
* `chore/nombre-tarea`: Para configuración o mantenimiento (ej: `chore/configurar-eslint`).
* `docs/nombre-tarea`: Para documentación (ej: `docs/actualizar-readme`).

---

## Flujo de Trabajo Diario (The Workflow)

Sigue estos 6 pasos **siempre** que empieces una tarea nueva:

### 1. Sincronizar (Antes de empezar)
Asegúrate de tener lo último que subió el socio para no trabajar sobre código viejo.
```bash
git checkout develop
git pull origin develop
```

### 2. Crear Rama
Crea tu espacio de trabajo personal para la tarea.

```bash
git checkout -b feat/mi-nueva-funcionalidad
```

### 3. Programar y Guardar (Commit)
Haz tus cambios. Cuando termines una parte lógica, guárdalo. Usamos Conventional Commits (ver sección abajo).

```bash
git add .
git commit -m "feat: descripción clara de lo que hice"
```

### 4. Subir Cambios (Push)
Sube tu rama a la nube (GitHub).

```bash
git push origin feat/mi-nueva-funcionalidad
```

### 5. Pull Request (PR)
Ve a GitHub.

Abre un Pull Request comparando tu rama contra develop.

Avisa al socio: "Ya subí el Login, revísalo porfa".

### 6. Limpieza (Después del Merge)
Una vez que el PR fue aprobado y fusionado en GitHub:

```bash
git checkout develop
git pull origin develop
git branch -d feat/mi-nueva-funcionalidad
```

---

## 📝 Reglas de Commits (Conventional Commits)
Para mantener el historial limpio, usa estos prefijos en tus mensajes de commit:

* **feat**: Una nueva característica (ej: `feat: añade botón de modo oscuro`).
* **fix**: Solución a un bug (ej: `fix: corrige error de validación en formulario`).
* **docs**: Cambios solo en documentación.
* **style**: Cambios de formato (espacios, comas) que no afectan el código.
* **refactor**: Reescritura de código sin cambiar funcionalidad.
* **chore**: Tareas de build, dependencias, configuración.

**Ejemplo incorrecto:** ❌ `git commit -m "arreglos"`

**Ejemplo correcto:** ✅ `git commit -m "fix: soluciona crash al hacer click en el header"`

---

## 🎨 Estándares de Código
* **TypeScript**: Usamos tipado estricto. Evita usar `any` en la medida de lo posible.
* **Componentes**: Estructura modular dentro de `src/components`.
* **Arquitectura**:
    * UI -> llama a -> Server Actions.
    * Server Actions -> llaman a -> Services.
    * Services -> tocan la -> Base de Datos.

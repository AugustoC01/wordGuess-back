# Word Guess Game API

## Tabla de Contenidos

---

1. [Introducción](#introduccion)
2. [Palabras almacenadas](#palabras-almacenadas)
3. [Endpoints](#endpoints)
   - [GET `/api/wordGame`](#1-get-apiwordGame)
   - [POST `/api/wordGame`](#2-post-apiword)
4. [Manejo de Errores](#manejo-de-errores)
5. [Autenticación](#autenticacion)
6. [Límites de Uso](#limites-de-uso)
7. [Pasos para Clonarlo y Ejecutarlo](#pasos-para-clonarlo-y-ejecutarlo)

## Introducción

---

Backend del juego adivinar la palabra. Permite generar una palabra aleatoria de una lista y validar las palabras que los usuarios ingresen en cada intento.

### Palabras almacenadas

Las palabras válidas están almacenadas en el archivo `words.json`, ubicado en la carpeta `src/mocks`. Solo se pueden adivinar palabras de 5 letras contenidas en este archivo.

## Endpoints

---

### 1. GET `/api/wordGame`

Este endpoint obtiene una palabra aleatoria de la lista almacenada en `words.json` la almacena en redis y devuelve el Id asociado a esa partida.

#### **Parámetros**

Parametro opcional, si el juego ya fue iniciado puede enviarse el Id que guardaba la partida, en caso de un juego nuevo se genera un Id nuevo.

```json
{
  "gameId": "zg3kq",
  "wordToGuess": "PERRO"
}
```

#### **Respuesta**

- **200 OK**: Genera una palabra, la almacena en redis y devuelve el Id asociado.
  ```json
  {
    "gameId": "up3jv"
  }
  ```

### 2. POST `/api/wordGame`

Este endpoint permite enviar una palabra, junto con su Id asociado a redis, para compararla con la palabra generada.

#### **Parámetros**

Recibe un objeto JSON con la palabra ingresada por el usuario y el Id asociado a esa palabra en redis:

```json
{
  "gameId": "up3jv",
  "value": "PODER"
}
```

- **value**: Una palabra de 5 letras.

#### **Respuesta**

- **200 OK**: Devuelve un objeto con dos propiedades:

  - **result**: Un array de 5 elementos donde:
    - `1` significa que la letra en esa posición es correcta.
    - `0` significa que la letra está en la palabra pero en otra posición.
    - `-1` significa que la letra no está en la palabra.
    - `-2` si la palabra no existe en la lista.
  - **letters**: Un array con las letras de la palabra enviada por el usuario que no pertenecen a la palabra.

  ```json
  {
    "result": [1, 0, -1, 0, 0],
    "letters": [
      { "letter": "D", "status": -1 },
      ...
    ]
  }
  ```

- **400 Bad Request**: Si no se envía una palabra válida, se recibe el siguiente error:

  ```json
  {
    "message": "Missing required word!"
  }
  ```

- **500 Internal Server Error**: Si ocurre un error en el servidor.

## Manejo de Errores

---

La API tiene un manejador de errores global. Si el método `POST` recibe una palabra vacía, devolverá un error 400 con el mensaje `Missing required word!`. Otros errores se manejarán con un código de estado 500.

## Autenticación

---

No requiere autenticación, y los CORS están configurados para permitir el acceso desde cualquier origen.

## Límites de Uso

---

No hay límites de uso. La API puede ser consumida sin restricciones.

## Pasos para Clonarlo y Ejecutarlo

---

### Clonar el repositorio

```bash
git clone https://github.com/AugustoC01/wordGuess-back.git
cd wordGuess-back
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

### Ejecutar en producción

```bash
npm run tsc
npm start
```

### Ejecutar los tests

```bash
npm test
```

## License

MIT
**Free Software, Hell Yeah!**

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

Este endpoint genera una palabra aleatoria de la lista almacenada en words.json, la almacena en Redis y devuelve la palabra junto con el gameId asociado a la partida. Si se proporciona un gameId en los parámetros de la URL y corresponde a una partida existente, el endpoint reutiliza ese gameId. Si el gameId no existe o no se proporciona, se genera un nuevo gameId y se asocia a la partida.

#### **Parámetros**

- **gameId** (opcional): ID de la partida que se desea recuperar o continuar. Si no se envía o el ID no existe, se generará un nuevo `gameId`.

**Ejemplo de solicitud:**

```http
GET /api/wordGame/zg3kq
```

#### **Respuesta**

- **200 OK**: Retorna el gameId junto con la palabra generada para la partida.
  ```json
  {
    "gameId": "up3jv",
    "wordToGuess": "PERRO"
  }
  ```

### 2. POST `/api/wordGame`

Este endpoint permite enviar una palabra ingresada por el usuario, junto con su `gameId` asociado en Redis, para compararla con la palabra generada en la partida.

#### **Cuerpo de la Solicitud**

Recibe un objeto JSON con los siguientes campos:

- **gameId**: ID de la partida, generado previamente por el endpoint de creación.
- **value**: Palabra de 5 letras ingresada por el usuario para comparar con la palabra generada.

**Ejemplo de solicitud:**

```json
{
  "gameId": "up3jv",
  "value": "PODER"
}
```

#### **Respuesta**

- **200 OK**: Devuelve un objeto JSON con los siguientes campos:

  - **result**: Array de 5 elementos, donde cada posición representa el estado de la letra en esa posición:
    - `1`: La letra en esa posición es correcta.
    - `0`: La letra está en la palabra, pero en una posición diferente.
    - `-1`: La letra no está en la palabra.
    - `-2`: La palabra ingresada no existe en la lista de palabras válidas.
  - **letters**: Un array con las letras de la palabra enviada por el usuario que no pertenecen a la palabra.

**Ejemplo de respuesta:**

```json
{
  "result": [1, 0, -1, 0, 0],
  "letters": [{ "letter": "D", "status": -1 }]
}
```

- **400 Bad Request**: Devuelve un error si no se envía una palabra válida.

**Ejemplo de respuesta:**

```json
{
  "message": "Missing required word!"
}
```

- **500 Internal Server Error**: Devuelve un error si ocurre un problema inesperado en el servidor.

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

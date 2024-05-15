# energialy

## Levantar Back End en entorno local

El servidor de Energialy está desarrollado con [Node.js](https://nodejs.org/) v10+. Es necesario tener instalado Node.js con la versión recomendada.

Una vez clonado el repositorio, ir a la rama `dev` pararse en la carpeta `api` en la terminal y ejecutar `npm install` para instalar las dependencias.
```sh
git checkout dev
cd ./api
npm install
```
Para la base de datos se utiliza [Postgres](https://www.postgresql.org/). Se debe tener instalado Postgres (versión 14, 15 o 16) y desde SQL Shell (psql) o la GUI de Postgres (pgAdmin 4) crear una nueva base de datos llamada energialy.
```sql
CREATE DATABASE energialy;
```
Para las variables de entorno, crear un archivo `.env` y pegar las siguientes variables.
```sh
# .env
DB_USER={your_postgres_name_user} # por default es postgres
DB_PASSWORD={your_postgres_password}
DB_HOST=localhost:5432
DB_NAME=energialy
SSL_MODE= # este debe quedar vacío
BASE_URL=http://localhost:3000 # esto es el servidor del frontend en local

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```
Para generar nuestros secrets podemos usar **Node**. Para eso iniciamos Node desde la terminal y ejecutamos el siguiente comando dos veces.
```sh
node
crypto.randomBytes(64).toString("hex");
crypto.randomBytes(64).toString("hex");
```
Copiamos el primero para el access token secret y el segundo para el refresh token secret y lo pegamos en el `.env` (sin las comillas).

Con las dependencias instaladas, la base de datos creada y las variables de entorno configuradas, ya estamos listos para levantar el servidor.
```sh
npm start
```
Si todo está bien, deberías ver el siguiente mensaje:
```sh
[nodemon] starting `node index.js`
%s listening at 3001
```

## Levantar Frontend

Una vez clonado el repositorio:

```sh
cd client
npm i
npm run dev 
```

# Proyecto-Integrado
Lo primero que debes hacer para empezar a usar este proyecto en local es descargar o clonar este repositorio

#Base de datos
En este repositorio encontratas todos los scripts para crear la base de datos

#Dependenmcias
Una vez tengas abierto el pryecto en tu entorno de desarollo deberas instalar todas las dependecias que hay en los archivos 
package.json

#Crear usuarios

La creacion de usuarios esta implementada en el backend pero no en el front
para crear usuarios sin necesidad del front deberas introducir lo siguiente:

En el Postman deberas poner la url para la creacion de usuarios, una vez la hayas introducido
deberas irte a la pestaña de body y dar click en raw.

Ahí es donde deberas introducir lo siguiente:

{
	"name": "xxx",
	"username": "xxx",
	"email": "xxxx@xxxx.com",
	"password": "xxxxx",
	"roles": ["user","admin"]
}


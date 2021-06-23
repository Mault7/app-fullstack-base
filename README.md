Autor: Jose Mauricio Lara Tapia 2021
# Introduccion
El proyecto consiste en un sistema de control y visualización de dispositivos hogareños (persianas, luces empotradas y/o elementos conectados a la red eléctrica). Es el trabajo final de la asignatura "Desarrollo de Aplicaciones Web" de la Especialización en Internet de las Cosas (CEIoT) de la Facultad de Ingeniería de la Universidad de Buenos Aires (FIUBA)

## Para correr la aplicación es necesario ejecutar los comados que se describen a continuaicion:

```sh
git clone https://github.com/Mault7/app-fullstack-base.git
```
se realiza un clone del proyecto o tambien se ingresa al link y se descarga en formato zip el proyecto.

instalacion de docker:

Se instalará docker y docker-compose, teniendo en cuenta que la distribución Linux deberá ser debian 9 o superior.
```sh
sudo apt-get update 
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```
Importar clave y verificar huella
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg |sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
```
Agregar repositorio de docker e instalar
```sh
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
Configurar permisos y grupo
```sh
sudo groupadd docker
sudo usermod -aG docker $USER
sudo gpasswd -a $USER docker
```
Reiniciar servicio
```sh
sudo service docker restart
```
Verificar la instalación
```sh
sudo docker run hello-world
```
Si la instalación ha concluido exitosamente, se mostrará por consola el mensaje de saludo del hello-world.

Instalar ahora el Docker-compose:

Descargar y dar permisos al programa
```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
``` 
Verificar la versión
```sh
docker-compose --version
```
Deberá mostrarse la versión `1.26.2`

A continuación se deberá reiniciar el sistema.
```sh
sudo reboot
```
```sh
docker-compose up




Descargar imágenes:

Se deberán descargar las siguientes imágenes de docker para que nuestra aplicación pueda correr.

```sh
docker pull harmish/typescript
docker pull mysql:5.7
docker pull phpmyadmin/phpmyadmin
docker pull abassi/nodejs-server:10.0-dev
```
Una vez finalizada la descarga, se deberá levantar el servicio de docker desde la ruta de la carpeta del fork, por ejemplo 'cd /home/usuario/app-fullstack-base'.

```sh
docker-compose up
```

Esto iniciará los siguientes servicios:
- Mysql server
- PhpMyadmin
- NodeJs server y monitor
- Monitor de Typescript

Otros comandos útiles de docker-compose que cabe destacar (solo para referencia):

Para iniciar docker compose:
```sh 
docker-compose up
```
Para ver los procesos:
```sh 
docker-compose ps
```
Para detener el servicio:
```sh 
docker-compose stop
```
Para reiniciar el servicio:
```sh 
docker-compose restart
```

# Frontend
Una vez realizada la instalación anterior, ingrese desde un navegador de internet a la url: http://localhost:8000 para visualizar la página web.


ACLARACION IMPORTANTE: Es importante tomar en cuenta que se tiene que eperar un momento a que se suban todos los elementos de docker antes de abrir la web , de lo contrario , no se podra visualizar nada 

Esta aplicacion maneja materialize un framework de css para estilos de aplicaciones web

La programacion de esta aplicacion esta basada en typescript y html

La funcionalidad del del itema es administrar dispositivos electricos hogarenos se pueden agregar dispositivos nuevo, modificar existentes y eliminarlos.

tenemos control on/off para los diferentes elementos del sistema 


trabaja directamente con api en nodejs lo que se pretende a futuro es manejar una base de datos donde impacte directamente las condifuraciones.


# Backend
 Para el lado de backend en el código se podrán observar todos los métodos encargados de guardar los datos provenientes del frontend.
Se optó por utilizar solo recepción de métodos por POST y GET. Para los métodos POST, se recojen los datos desde el objeto `req.body`.

Dentro del código del programa del backend se optó por comentar las acciones de nuestras apis con notas sobre qué es lo que hace cada pedacito de código en particular.
# Licencia
GLP
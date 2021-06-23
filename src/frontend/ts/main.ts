
interface DeviceInt {
    id: string;
    name: string;
    description: string;
    state: string;
    type: number;
}
class Main implements GETResponseListener, EventListenerObject, POSTResponseListener {
    myf: MyFramework;
    view: ViewDevices;
    //estas variables son para captura de los identificadores y estados de cada objeto de la aplicacion
    private getId: string;
    public checkbuttonAddOredit; string;
    private getIdDel: string;
    //esta funcion controla todos los eventos de click realizados en la app
    handleEvent(evt: Event): void {
        let sw: HTMLElement = this.myf.getElementByEvent(evt);
        alert("Se hizo click " + sw.id);
        //en estas condicionales preguntamos cual de los botones se presiono y extraemos tanto IDs como estados para accionar el comportamiento en la maquina de estados
        if (sw.id.substr(0, 5) == "edit_") {
            this.getId = sw.id.substring(5);
            this.checkbuttonAddOredit = "";
            alert(this.getId);
            alert(this.checkbuttonAddOredit);
        }
        if (sw.id == "add_dev") {
            this.checkbuttonAddOredit = "anadir";
            alert(this.checkbuttonAddOredit);
        }
        if (sw.id.substr(0, 4) == "del_") {
            this.getIdDel = sw.id.substring(4);
            alert(this.getIdDel);

        }


        //Esta es la maquina de estaods principal que se acciona con los eventos de click
        switch (sw.textContent) {
            //este apartado es para el forulario modal tanto para edtar dispositivos como anadir nuevos
            case "+ agregar dispositivos":
            case "Editar":
                //tenemos un formulario modal prinicpalmente el cual se despliega al tocar el boton de editar o anadir
                //Limpiamos el formulario
                (<HTMLInputElement>this.myf.getElementById('titulo_modal')).innerHTML = "Ingrese el nuevo dispositivo";
                (<HTMLInputElement>this.myf.getElementById('nombre_dispositivo')).value = "";
                (<HTMLInputElement>this.myf.getElementById('descripcion_dispositivo')).value = "";
                (<HTMLInputElement>this.myf.getElementById('tipo_dispositivo')).value = "";

                break;
            //esta accion despliega los dipositivos que se guardan en el ficjero datos.jason 
            case "Listar dispositivos":
                this.myf.requestGET("http://localhost:8000/devices", this);
                break;
            //si se apreta el boton de guardar del formualario extramos los datos y modificamos el datos.json
            case "Guardar":
                alert("Editando dispositivo: " + this.getId);
                //  alert(getId);
                let nombre: string = (<HTMLInputElement>this.myf.getElementById('nombre_dispositivo')).value;
                let descripcion: string = (<HTMLInputElement>this.myf.getElementById('descripcion_dispositivo')).value;
                //let tipo: any = (<HTMLInputElement>this.myf.getElementById('tipo_dispositivo')).value;
                let formdata = { "id": "", "name": "", "description": "", "state": "", "type": "" };
                //guardamos datos en el json para  enviar al post

                //para anair a nuevo dispositivo se entra aqui
                if (this.checkbuttonAddOredit == "anadir") {
                    formdata = { "id": "0", "name": `${nombre}`, "description": `${descripcion}`, "state": "0", "type": "0" }
                    this.myf.requestPOST(`http://localhost:8000/insert`, formdata, this);
                    this.myf.requestGET("http://localhost:8000/devices", this);
                    this.checkbuttonAddOredit == "";
                    alert(this.checkbuttonAddOredit);
                }
                //para editar un dispositivo se entra aqui
                // if(this.checkbuttonAddOredit == "editar"){
                else {
                    formdata = { "id": `${this.getId}`, "name": `${nombre}`, "description": `${descripcion}`, "state": "0", "type": "0" };
                    this.myf.requestPOST(`http://localhost:8000/editdev`, formdata, this)
                    this.myf.requestGET("http://localhost:8000/devices", this);
                }
                // }
                break;
            //si se presiona el boton de eliminar borramos el dispositivo
            case "Eliminar":
                let dataDel = { "id": `${this.getIdDel}` };
                this.myf.requestPOST(`http://localhost:8000/delet`, dataDel, this)
                this.myf.requestGET("http://localhost:8000/devices", this);
                alert("Se elimino");
                break;

            default:
                //si se realiza alguna accion en los checkbox realizamos un post a las apis
                let data = { "id": sw.id.substring(4), "state": this.view.getSwitchStateById(sw.id) };
                alert(sw.id);
                this.myf.requestPOST("devices", data, this);
                break;
        }
    }

    //controlamos las peticiones get y administramos los eventos de click en los elementos de la app
    handleGETResponse(checkbuttonAddOredit: number, response: string): void {
        if (checkbuttonAddOredit == 200) {
            console.log(response);
            let data: DeviceInt[] = JSON.parse(response);
            console.log(data);
            this.view.showDevices(data);
            for (let disp of data) {
                // this.idjson;
                let checkdisp = this.myf.getElementById("dev_" + disp.id);
                let edit = this.myf.getElementById("edit_" + disp.id);
                let del = this.myf.getElementById("del_" + disp.id)
                let save = this.myf.getElementById("modalsave");

                checkdisp.addEventListener("click", this);
                edit.addEventListener("click", this);
                del.addEventListener("click", this);
                save.addEventListener("click", this);
            }



        }
    }

    handlePOSTResponse(checkbuttonAddOredit: number, response: string): void {
        if (checkbuttonAddOredit == 200) {
            console.log(response);
        }
    }

    main(): void {
        this.myf = new MyFramework();
        this.view = new ViewDevices(this.myf);
        this.myf.configClick("add_dev", this);
        this.myf.configClick("lis_dev", this);
    }

}

window.onload = () => {
    let Obj: Main = new Main();
    Obj.main();
};
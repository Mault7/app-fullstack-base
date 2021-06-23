interface DeviceInt {
    id: string;
    name: string;
    description: string;
    state: string;
    type: number;
}
class ViewDevices {

    myf: MyFramework;

    constructor(myf: MyFramework) {
        this.myf = myf;
    }
    //Esta seccion crea los elementos tipo cards de materialize para mostrar los dispositivos
    showDevices(list: DeviceInt[]): void {
        let devicesUl: HTMLElement = this.myf.getElementById("devicesList"); // cargo la lista de objetos en el DOM

        let items: string = "";

        for (let i in list) {
            let checkedStr: string = "";
            if (list[i].state == "1")
                checkedStr = "checked";


            switch (list[i].type) {

                case 0:

                    items += `<div class="col s3 m3 l3">
                <div class="card colorFondo darken-1">
                    <div class="card-content white-text">
                        <ul>
                            <li class="collection-item avatar">
                                <img src="static/images/lightbulb.png" class="circle">
                                <span id="nombre_${list[i].id}" class="card-title">${list[i].name}</span>
                                <p id="descrip_${list[i].id}"> ${list[i].description}
                                </p>
                                <a href="#!" class="secondary-content">
                                    <div class="switch">
                                        <label>
                                            Off
                                            <input type='checkbox' id="dev_${list[i].id}" ${checkedStr}>
                                            <span class="lever"></span>
                                            On
                                        </label>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-action">
                        <a id="edit_${list[i].id}" class="waves-effect waves-light btn center modal-trigger btn" href="#modal1">Editar</a>
                        <a id="del_${list[i].id}" class="waves-effect waves-light btn center">Eliminar</a>
                    </div>
                </div>
            </div>`
                    break;
                case 1:
                    items += `<div class="col s3 m3 l3">
                <div class="card colorFondo darken-1">
                    <div class="card-content white-text">
                        <ul>
                            <li class="collection-item avatar">
                                <img src="static/images/window.png" class="circle">
                                <span id="nombre_${list[i].id}" class="card-title">${list[i].name}</span>
                                <p id="descrip_${list[i].id}"> ${list[i].description}
                                </p>
                                <a href="#!" class="secondary-content">
                                    <div class="switch">
                                        <label>
                                            Off
                                            <input type='checkbox' id="dev_${list[i].id}" ${checkedStr}>
                                            <span class="lever"></span>
                                            On
                                        </label>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-action">
                        <a id="edit_${list[i].id}" class="waves-effect waves-light btn center modal-trigger btn" href="#modal1">Editar</a>
                        <a id="del_${list[i].id}" class="waves-effect waves-light btn center" >Eliminar</a>
                    </div>
                </div>
            </div>`
                    break;
                default:
                    break;
            }

        }

        devicesUl.innerHTML = items;

    }

    getSwitchStateById(id: string): boolean {
        let el: HTMLInputElement = <HTMLInputElement>this.myf.getElementById(id);
        return el.checked;
    }

}
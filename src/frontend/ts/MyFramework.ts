
interface GETResponseListener {
    handleGETResponse(status: number, response: string): void;
}
interface POSTResponseListener {
    handlePOSTResponse(status: number, response: string): void;
}
class MyFramework {


    getElementById(id: string): HTMLElement {

        let Element: HTMLElement = document.getElementById(id);
        return Element;
    }

    getElementByEvent(event: Event): HTMLElement {

        return <HTMLElement>event.target;
    }

   
    requestGET(url: string, listener: GETResponseListener): void {
        //PARA HACER PETICION AJAX SE GENERA EL OBJETO
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        //SETEAMOS LA FUNCION DE CALLBACK
        xhr.onreadystatechange = function () {
            // NOS ASEGURAMOS DE SOLO ACCIONAR CUANDO EL ESTADO DE PETICION TERMINE
            if (xhr.readyState == 4) {
                //NOS SEGURAMOS DE QUE LA PETICION ES SATISFACTORIA
                if (xhr.status == 200) {
                    //LISTAMOS OS DATOS LLEGADOS DE LA PETICION
                    listener.handleGETResponse(xhr.status, xhr.responseText);
                }
                else {
                    //SI NOS LLEGA UN ESTADO DISTINTO AL 200 NO LISTAMOS NADA
                    listener.handleGETResponse(xhr.status, null);
                }
            }
        };
        //REALIZAMOS LA CONFIGRACION DE HACIA DONDE VAMOS A HACER LA PETICION
        xhr.open('GET', url, true);
        // NO ENVIAMOS NADA COMO RESPUESTA
        xhr.send(null);
    }

    requestPOST(url: string, data: any, listener: POSTResponseListener): void {
        
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    listener.handlePOSTResponse(xhr.status, xhr.responseText);
                }
                else {
                    listener.handlePOSTResponse(xhr.status, null);
                }
            }
        };

        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }

    configClick(id: string, listener: EventListenerObject): void {   
        let b: HTMLElement = this.getElementById(id);
        b.addEventListener("click", listener);
    }
}
class Main
{
    public getElementById(id:string):HTMLElement
    {
        return document.getElementById(id);
    }
    public getElementByIdvalue(id:string):any
    {
        return <any> document.getElementById(id).value;
    }
    public getElementByIdchecked(id:string):boolean
    {
        return <boolean> document.getElementById(id).checked;
    }



}

window.addEventListener("load",()=>
{
    let miObj:Main = new Main();
    let button=miObj.getElementById("Add_dev");
    
    button.addEventListener("click",()=>
    {
        let input1=miObj.getElementByIdvalue("device");
        let input2=miObj.getElementByIdvalue("description");
        let checkbox1=miObj.getElementByIdchecked("check1");
        let checkbox2=miObj.getElementByIdchecked("check2");
        if ((input1!=0 && input2!=0 )&& (checkbox1!=false || checkbox2!=false)) {
            alert("los inputs son: " + input1 + "  " + input2 + checkbox1 + checkbox2);
        }
        else 
        {
            alert ("llene los cuadros y seleccione los controladores para el dispositivo");
        }
    })
})
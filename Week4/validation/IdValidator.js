export class IdValidator{
    constructor(){
        this.idPattern = /^[A-Za-z0-9]{5,10}$/;
    }
    isValid(id){
        return this.idPattern.test(id);
    }
}
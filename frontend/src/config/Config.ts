export default class Config {
    private websitename: string;
    private weburl: string;

    constructor(){
        this.websitename = "Flex Form"
        this.weburl = "http://localhost:8000/"
    }

    // ************************ Getter & Setters ************************
    
    public get websiteName(){
        return this.websitename;
    }

    public set websiteName(value: string){
        this.websitename = value;
    }

    public get webUrl(){
        return this.weburl;
    }

}
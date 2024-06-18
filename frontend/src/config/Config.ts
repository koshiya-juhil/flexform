export default class Config {
    private websitename: string;
    private serverurl: string;
    private weburl: string;

    constructor(){
        this.websitename = "Flex Form"
        this.serverurl = "http://localhost:8000/"
        this.weburl = "http://localhost:3000/"
    }

    // ************************ Getter & Setters ************************
    
    public get websiteName(){
        return this.websitename;
    }

    public set websiteName(value: string){
        this.websitename = value;
    }

    public get serverUrl(){
        return this.serverurl;
    }

    public get webUrl(){
        return this.weburl;
    }

}
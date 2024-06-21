export default class Config {
    private websitename: string;
    private serverurl: string = '';
    private weburl: string = '';
    private servermode: string = import.meta.env.VITE_SERVER_MODE;

    constructor(){
        this.websitename = "Flex Form"
        
        if(this.servermode == 'dev'){
            this.serverurl = "http://localhost:8000/"
            this.weburl = "http://localhost:3000/"
        }
        else if(this.servermode == 'prod'){
            this.serverurl = "https://flexform-kqne.onrender.com/"
            this.weburl = "http://localhost:3000/"
        }
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
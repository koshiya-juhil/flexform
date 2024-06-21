export default class Config {
    private websitename: string;
    private serverurl: string = '';
    private weburl: string = '';
    private servermode: string = import.meta.env.VITE_SERVER_MODE;

    constructor(){
        this.websitename = "Flex Form"
        
        if(this.servermode == 'dev'){
            this.serverurl = import.meta.env.VITE_DEV_SERVER_URL;
            this.weburl = import.meta.env.VITE_DEV_URL;
        }
        else if(this.servermode == 'prod'){
            this.serverurl = import.meta.env.VITE_PROD_SERVER_URL;
            this.weburl = import.meta.env.VITE_PROD_URL;
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
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { APP_CONSTANTS_NEW } from "src/app/app.contants";

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    downloadFile(data:any[], filename='data', headerDisplay: string[], headersToParse: string[]){
        let csvData = this.convertToCSV(data, headerDisplay, headersToParse);
        console.log('parsed data : ', csvData);
        let blob = new Blob(['\ufeff' + csvData], {type: 'text/csv;charset=utf-8;'});
        let downloadLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') !=-1 && navigator.userAgent.indexOf('Chrome')== -1;
        if (isSafariBrowser){
            downloadLink.setAttribute("target", "_blank");
        }
        downloadLink.setAttribute("href", url);
        downloadLink.setAttribute("download", filename + ".csv");
        downloadLink.style.visibility = "hidden";
        downloadLink.click();
    }

    convertToCSV(data:any[], headerDisplay: string[], headersToParse: string[]){
        let array = typeof data != 'object'? JSON.parse(data): data;
        let str = '';
        let row = 'Row No,';
        for(let index in headerDisplay){
            row+= headerDisplay[index] + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for(let i=0; i<data.length; i++){
            let line = (i+1) + '';
            for(let index in headersToParse){               
                let head = headersToParse[index];               
                line+= ',' + data[i][head];
            }
            str +=line + '\r\n';
        }
        return str;
    }
    
    getURLForString(urlname: string) : string{
        let result:string | undefined;
        result = APP_CONSTANTS_NEW.find(x => x.url_name == urlname)?.url_value;
        if (result){
            return result;
        }
        return '';
    }    
}
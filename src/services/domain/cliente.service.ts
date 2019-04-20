import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { ClienteDTO } from '../../models/cliente.dto';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService) {        
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string) /*retirar a tipagem do método para que todos os dados do backend sejam retornados*/ {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(obj: ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
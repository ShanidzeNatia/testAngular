import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserFullData } from '../interface/user-fulldata.interface';
import { UserData } from '../interface/user-data.interface';


@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private isloggedIn: boolean;

    constructor(private http: HttpClient){
        this.isloggedIn = false;
    }

    login(data): Observable<any>{
        return this.http.get('https://chs.gnerc.org/authapi/apilogin?email='+data.email+'&password='+data.password, data).pipe(
            map(receive => {
                localStorage.setItem('token', receive['token']);
                return receive;
            })
        )
    }

    checkToken(data): Observable<UserData>{
        return this.http.get<UserFullData>('https://chs.gnerc.org/authapi/checkToken?token='+data).pipe(
            map(receive => {
                if(receive.user !== null){
                    this.isloggedIn=true;
                }
                return receive.user;
            })
        )
    }

    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }

    logoutUser(): void{
        this.isloggedIn = false;
        localStorage.removeItem('token');
    }
}

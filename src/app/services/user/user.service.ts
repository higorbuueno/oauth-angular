import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../../interfaces/user-info';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _userInfo = new BehaviorSubject<UserInfo>(null);

    setUserInfo(userInfo: UserInfo) {
        this._userInfo.next(userInfo);
    }

    get userInfo(): UserInfo {
        return this._userInfo.getValue();
    }

}

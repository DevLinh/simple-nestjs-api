import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    signin() {
        return {msg: 'Hello signin'};
    }

    signup() {
        return {mg: 'Hello signup'};
    }
}
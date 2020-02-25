import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class FirebaseAuthService {

    constructor(public afAuth: AngularFireAuth) { }

    fireLogin(email, password) {
        let _that = this;
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    // alert('Wrong password.');
                } else {
                    // alert(errorMessage);

                    _that.fireRegister(email, password);
                }
                console.log(error);
            });
    }

    fireRegister(email, password) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                console.log('The password is too weak.');
            } else {
                console.log(errorMessage);
            }
            console.log(error);
        });
    }

    fireChangePassword(newPassword: string, email: string) {
        var user = this.afAuth.auth.currentUser;
        console.log(user, 'user');
        if (user == null) {
            this.fireRegister(email, newPassword);
        } else {
            user.updatePassword(newPassword).then(function () {
                console.log('password then');
                // Update successful.
            }).catch(function (error) {
                console.log('password catch');
                // An error happened.
            });
        }
    }

}
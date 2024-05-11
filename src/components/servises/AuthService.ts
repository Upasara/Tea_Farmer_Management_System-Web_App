import { User } from "../models/User";
import {signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from "../../firebase";
import { USERS } from "../../dbUtils";

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserUpdateData {
  email: string;
}


export class AuthService {
  private static readonly TOKEN_KEY = "token";
  public static async userLogin(email: string, password: string) {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data;
  }



  public static async getUserFromEmail(email: string) {
    try {
      const q = query(collection(db, USERS), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      const data: User[] = [];
      querySnapshot.forEach(doc => {
        const donor = doc.data() as User;
        data.push(donor);
      });
      return data[0];
    } catch (e) {
      return e;
    }
  };


  public static userLogout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY); //TODO read token from cookie and remove this implementation
  }

  public static getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY); //TODO read token from cookie and remove this implementation
  }

  public static setToken(token: string): void {
    localStorage.setItem(AuthService.TOKEN_KEY, token); //TODO read token from cookie and remove this implementation
  }
}

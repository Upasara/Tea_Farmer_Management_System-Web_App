import { addDoc, collection, doc, deleteDoc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from "../../firebase";
import { COMPANY_UPDATES, COMPLAINS, TEA, USERS } from "../../dbUtils";
import { UserDetails } from "../models/User";
import { CompanyUpdates } from "../models/CompanyUpdates";
import { Complains } from "../models/Complains";
import { TeaDetails } from "../models/Tea";

export class AdminService {
    public static async getAllUsers() {
        try {
            const q = query(collection(db, USERS), where('role', '==', 'USER'));
            const querySnapshot = await getDocs(q);
            const data: UserDetails[] = [];
            querySnapshot.forEach(doc => {
                const donor = doc.data() as UserDetails;
                console.log(donor)
                donor.id = doc.id;
                data.push(donor);
            });
            return data;
        } catch (e) {
            return e;
        }
    };

    public static async addUser(updatedUser: UserDetails) {
        try {
            const user = await addDoc(collection(db, USERS), updatedUser);
            return user;
        } catch (e) {
            return e;
        }
    };

    // public static async searchUser(searchQuery: any) {
    //     try {
    //         const usersRef = collection(db,USERS);
    //         query(collection(db, USERS), where('role', '==', 'USER'));
    //         const query = usersRef.where('name', '>=', searchQuery).where('name', '<=', searchQuery + '\uf8ff');
    //         return query;
    //     } catch (e) {
    //         return e;
    //     }
    // };



    public static async addNew(updatedUser: TeaDetails) {
        try {
            const userRef = doc(db, USERS, updatedUser?.id);
            const newCollectionRef = collection(userRef, TEA);
            const newDocRef = await addDoc(newCollectionRef, updatedUser);
            const user = await doc(db, USERS, updatedUser.id);
            try {
                await updateDoc(user, {
                    lastUpdatedAt: updatedUser.createdAt,
                })
                return user;
            } catch (e) {
                return e;
            }
        } catch (e) {
            return e;
        }
    };




    public static async getAllUpdates() {
        try {
            const q = query(collection(db, COMPANY_UPDATES));
            const querySnapshot = await getDocs(q);
            const data: CompanyUpdates[] = [];
            querySnapshot.forEach(doc => {
                const donor = doc.data() as CompanyUpdates;
                donor.id = doc.id;
                data.push(donor);
            });
            return data;
        } catch (e) {
            return e;
        }
    };

    public static async companyUpdates(companyUpdates: CompanyUpdates) {
        try {
            const user = await addDoc(collection(db, COMPANY_UPDATES), companyUpdates);
            return user;
        } catch (e) {
            return e;
        }
    };


    public static async deleteUpdate(updatedUser: CompanyUpdates) {
        try {
            const userRef = doc(db, COMPANY_UPDATES, updatedUser?.id);
            deleteDoc(userRef);
        } catch (e) {
            return e;
        }
    };

 

    public static async getAllComplains() {
        try {
            const q = query(collection(db, COMPLAINS));
            const querySnapshot = await getDocs(q);
            const data: Complains[] = [];
            querySnapshot.forEach(doc => {
                const donor = doc.data() as Complains;
                donor.id = doc.id;
                data.push(donor);
            });
            return data;
        } catch (e) {
            return e;
        }
    };

    public static async addReview(updatedComplain: Complains) {
        const user = await doc(db, COMPLAINS, updatedComplain.id);
        try {
            await updateDoc(user, {
                reply: updatedComplain.reply,
            })
            return user;
        } catch (e) {
            return e;
        }
    };

}

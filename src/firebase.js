import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: "AIzaSyCmbuULltMhgN7Aka3nf-aW_nxbUaBraLk",
    authDomain: "private-note-ffa81.firebaseapp.com",
    projectId: "private-note-ffa81",
    storageBucket: "private-note-ffa81.appspot.com",
    messagingSenderId: "128581451587",
    appId: "1:128581451587:web:a0382dc0fa8af1e361b9f6",
    measurementId: "G-CKEQ0XBEV0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const random = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

async function addNote(message, warning, reference, encryption, selfdestruct) {
    const secretkey = random(8);
    const passkey = random(10);
    try {
        const data = await addDoc(collection(db, "notes"), {
            note: message,
            warn: warning,
            refer: reference,
            encrypt: encryption,
            destruct: selfdestruct.value,
            secret: secretkey,
            passkey: passkey
        });
        return {
            action: 'create-note',
            status: 'success',
            message: {
                id: data.id,
                secret: secretkey,
                passkey: passkey
            }
        };
    } catch (error) {
        console.error(error);
        return {
            action: 'create-note',
            status: 'failed',
            message: "An unknown error occured. Try again later!",//error,
        };
    }
};

async function getNote(id, key) {
    const docRef = doc(db, 'notes', id);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.secret === key) {
                
                return {
                    action: 'get-note',
                    status: 'success',
                };
            } else if (data.passkey === key) {
                return {
                    action: 'get-note',
                    status: 'success',
                    proceed: 'destroy',
                };
            }
        } else {
            return {
                action: 'get-note',
                status: 'failed',
                message: "Note does not exists in the database.",
            };
        }
    } catch (error) {
        console.error(error);
        return {
            action: 'get-note',
            status: 'failed',
            message: "An unknown error occured. Try again later!",//error,
        };
    }
};

export {
    addNote,
    getNote,
};
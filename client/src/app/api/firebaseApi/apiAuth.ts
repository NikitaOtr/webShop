import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
         sendPasswordResetEmail, updateProfile, sendEmailVerification } from 'firebase/auth';

export const apiAuth = {
    registration(email: string, password: string, nickname) {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
            .then(data => {
                apiAuth.updateUser(nickname);
                sendEmailVerification(data.user);
                return data.user;
            });
    },

    login(email: string, password: string) {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then(data => data.user);
    },

    updateUser(nickname) {
        const auth = getAuth();
        return updateProfile(auth.currentUser, { displayName: nickname });
    },

    changePassword(email: string) {
        const auth = getAuth();
        return sendPasswordResetEmail(auth, email);
    },
};



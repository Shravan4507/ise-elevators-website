import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from './config';

// Sign in with email and password
export const loginAdmin = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error: any) {
        let errorMessage = 'Login failed. Please try again.';

        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password.';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Invalid email or password.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later.';
                break;
        }

        return { success: false, error: errorMessage };
    }
};

// Sign out
export const logoutAdmin = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error };
    }
};

// Change password
export const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
        const user = auth.currentUser;
        if (!user || !user.email) {
            return { success: false, error: 'No user logged in.' };
        }

        // Re-authenticate the user first
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);

        return { success: true };
    } catch (error: any) {
        let errorMessage = 'Failed to change password.';

        switch (error.code) {
            case 'auth/wrong-password':
                errorMessage = 'Current password is incorrect.';
                break;
            case 'auth/weak-password':
                errorMessage = 'New password is too weak. Use at least 6 characters.';
                break;
            case 'auth/requires-recent-login':
                errorMessage = 'Please log out and log in again before changing password.';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Current password is incorrect.';
                break;
        }

        return { success: false, error: errorMessage };
    }
};

// Get current user
export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};

// Auth state listener
export const onAuthChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// Types
export interface Quote {
    id?: string;
    name: string;
    email: string;
    phone: string;
    elevatorType: string;
    floors: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    createdAt: Timestamp | null;
}

export interface Enquiry {
    id?: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    createdAt: Timestamp | null;
}

// Collection references
const quotesCollection = collection(db, 'quotes');
const enquiriesCollection = collection(db, 'enquiries');

// =====================
// QUOTES CRUD
// =====================

export const addQuote = async (quoteData: Omit<Quote, 'id' | 'createdAt' | 'status'>) => {
    try {
        const docRef = await addDoc(quotesCollection, {
            ...quoteData,
            status: 'new',
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding quote:', error);
        return { success: false, error };
    }
};

export const getQuotes = async (): Promise<Quote[]> => {
    try {
        const q = query(quotesCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Quote[];
    } catch (error) {
        console.error('Error getting quotes:', error);
        return [];
    }
};

export const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
        const quoteRef = doc(db, 'quotes', id);
        await updateDoc(quoteRef, { status });
        return { success: true };
    } catch (error) {
        console.error('Error updating quote:', error);
        return { success: false, error };
    }
};

export const deleteQuote = async (id: string) => {
    try {
        const quoteRef = doc(db, 'quotes', id);
        await deleteDoc(quoteRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting quote:', error);
        return { success: false, error };
    }
};

// =====================
// ENQUIRIES CRUD
// =====================

export const addEnquiry = async (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
    try {
        const docRef = await addDoc(enquiriesCollection, {
            ...enquiryData,
            status: 'new',
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding enquiry:', error);
        return { success: false, error };
    }
};

export const getEnquiries = async (): Promise<Enquiry[]> => {
    try {
        const q = query(enquiriesCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Enquiry[];
    } catch (error) {
        console.error('Error getting enquiries:', error);
        return [];
    }
};

export const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
    try {
        const enquiryRef = doc(db, 'enquiries', id);
        await updateDoc(enquiryRef, { status });
        return { success: true };
    } catch (error) {
        console.error('Error updating enquiry:', error);
        return { success: false, error };
    }
};

export const deleteEnquiry = async (id: string) => {
    try {
        const enquiryRef = doc(db, 'enquiries', id);
        await deleteDoc(enquiryRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting enquiry:', error);
        return { success: false, error };
    }
};

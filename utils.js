import * as SecureStore from 'expo-secure-store';

export async function saveUserSession(token) {
    try {
        await SecureStore.setItemAsync('token', token);
        const token3 = await SecureStore.getItemAsync('token');
        console.log(token3);
    } catch (error) {
        console.log('Error saving user session:', error);
    }
}
export async function loadUserSession() {
    try {
        return await SecureStore.setItemAsync('token');

    } catch (error) {
        console.log('Error loading user session:', error);
    } finally {
        return null
    }
}
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from './reducers/appReducer';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export async function saveUserSession(token) {
    try {
        await SecureStore.setItemAsync('token', token);
        const token3 = await SecureStore.getItemAsync('token');
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



export const useDataFetching = (url, setData) => {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + token
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log(error.message);
                dispatch(setError({ networkError: error.message }))
            }
        };

        fetchData();
    }, [url]);

};


// Animation utilitis for home screen animation
export const useLoadingAnim = () => {
    const [loadingItems, setLoadingItems] = useState([])


    const comOpacity = useSharedValue(0); // Initial opacity value
    const animateComponent = () => {
        comOpacity.value = withTiming(1, { duration: 400 }); // Fade-in animation with a duration of 1000ms
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: comOpacity.value, // Apply the animated opacity value to the component
        };
    });


    useEffect(() => {
        allImageLoaded()
    }, [loadingItems])


    const allImageLoaded = () => {
        let bool = true;
        if (loadingItems.length == 0) return false;
        loadingItems.forEach(i => {
            if (!i) bool = false;
        });

        if (bool) {
            animateComponent()
        }
        return bool
    }


    return [setLoadingItems, animatedStyle]
}
export const handleLoadStart = (index, setLoadingImage) => {
    setLoadingImage(prevState => {
        let newState = [...prevState];
        newState[index] = false;
        return newState;
    });
};

export const handleLoad = (index, setLoadingImage) => {
    setLoadingImage(prevState => {
        let newState = [...prevState];
        newState[index] = true;
        return newState;
    });
};
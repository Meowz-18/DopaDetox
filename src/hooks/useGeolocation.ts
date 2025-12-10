import { useState, useEffect } from 'react';

interface GeolocationState {
    coords: GeolocationCoordinates | null;
    error: GeolocationPositionError | null;
    loading: boolean;
}

export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
        coords: null,
        error: null,
        loading: false,
    });

    const getPosition = () => {
        if (!navigator.geolocation) {
            setState(s => ({ ...s, error: { code: 0, message: "Geolocation not supported", PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 } as GeolocationPositionError, loading: false }));
            return;
        }

        setState(s => ({ ...s, loading: true }));

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({ coords: position.coords, error: null, loading: false });
            },
            (error) => {
                setState({ coords: null, error, loading: false });
            }
        );
    };

    return { ...state, getPosition };
}

import {useNavigate, useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {useBlocker} from "./useBlocker";

export function useCallbackPrompt(when) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPrompt, setShowPrompt] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    const cancelNavigation = useCallback(() => {
        setShowPrompt(false);
    }, []);

    // handle blocking when user click on another route prompt will be shown
    const handleBlockedNavigation = useCallback(
        (nextLocation) => {
            // in if condition we are checking next location and current location are equals or not
            if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
                setShowPrompt(true);
                setLastLocation(nextLocation);
                return false;
            }
            return true;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [confirmedNavigation, location]
    );

    const confirmNavigation = useCallback(() => {
        setShowPrompt(false);
        setConfirmedNavigation(true);
    }, []);

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            navigate(lastLocation.location.pathname);

            // Clean-up state on confirmed navigation
            setConfirmedNavigation(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmedNavigation, lastLocation]);

    useBlocker(handleBlockedNavigation, when);

    return [showPrompt, confirmNavigation, cancelNavigation];
}

import { useDispatch } from "react-redux";
import { signOut } from "../states/userSlice";

export const useSidebarController = () => {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            dispatch(signOut());
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };

    return { handleSignOut };
};

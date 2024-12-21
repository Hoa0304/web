import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../types/auth.types';

const PrivateRoute: React.FC = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);

    return currentUser ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;

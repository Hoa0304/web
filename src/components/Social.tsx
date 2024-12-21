import React from 'react';
import google from '../assets/icons/google.svg';
import facebook from '../assets/icons/Facebook.svg';
import { FaApple } from 'react-icons/fa';

const Social: React.FC = () => {
    return (
        <div className="flex justify-center gap-4">
            <button>
                <img src={facebook} alt="Facebook" />
            </button>
            <button>
                <FaApple className="text-primary" size={30} />
            </button>
            <button>
                <img src={google} alt="Google" />
            </button>
        </div>
    );
};

export default Social;
import React from 'react';
import { Link } from 'react-router-dom';
import girlImage from '../assets/images/girl.png';
import { AiOutlineMail } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { MdPersonOutline } from 'react-icons/md';
import { useSignUpController } from '../hooks/auth/useSignUpController';
import { useShowPassword } from '../hooks/auth/useShowPassword';

const SignUp: React.FC = () => {
    const {
        loading,
        handleInputChange,
        setConfirmPassword,
        handleSubmit,
    } = useSignUpController();

    const { showPassword, toggleShowPassword, showConfirmPassword, toggleShowConfirmPassword } = useShowPassword();


    return (
        <div className="flex justify-end">
            <figure className="hidden lg:block h-full fixed w-[40%] -bottom-16 left-0">
                <img src={girlImage} alt="Sign up" className="object-cover" style={{ marginLeft: '-12%' }} />
            </figure>
            <div className="w-full md:w-1/3 p-5 mr-56 3xl:mt-[5%]">
                <h1 className="font-poppins text-left font-normal my-7 text-white" style={{ fontSize: '30px' }}>Sign up</h1>
                <p className="text-left text-primary font-poppins font-light text-base mb-4">If you already have an account register</p>
                <p className="text-left text-primary font-poppins font-light text-base mb-8">
                    You can <Link to="/" className="text-secondary font-medium">Login here!</Link>
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <InputField
                        type="email"
                        placeholder="Enter your email address"
                        id="email"
                        icon={<AiOutlineMail />}
                        label="Email"
                        onChange={handleInputChange}
                    />
                    <InputField
                        type="text"
                        placeholder="Enter your User name"
                        id="userName"
                        icon={<MdPersonOutline size={20} />}
                        label="Username"
                        onChange={handleInputChange}
                    />
                    <div className="relative">
                        <InputField
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your Password"
                            id="password"
                            icon={<FiLock />}
                            label="Password"
                            onChange={handleInputChange}
                            toggleShowPassword={toggleShowPassword}
                        />
                    </div>
                    <div className="relative">
                        <InputField
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your Password"
                            id="confirm"
                            icon={<FiLock />}
                            label="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            toggleShowPassword={toggleShowConfirmPassword}
                        />
                    </div>
                    <Button className='bg-secondary h-12 rounded-custom' disabled={loading}>
                        {loading ? 'Loading...' : 'Register'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

import React from 'react';
import InputField from '../common/InputField';
import { FiSearch } from 'react-icons/fi';
import search from '../../assets/images/bg.png';
import star from '../../assets/icons/starBoldBig.svg';
import girl from '../../assets/icons/girl.svg';

interface SearchSectionProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchTerm, setSearchTerm }) => (
    <section className="lg:mb-20 w-full relative lg:h-1/2 flex items-center rounded-2xl">
        <figure className="absolute w-full h-full left-0 right-0 top-0 z-10 opacity-70 rounded-3xl hidden xl:flex flex-shrink">
            <img src={search} alt="Placeholder" className="w-full h-full object-cover rounded-2xl" />
        </figure>
        
        <figure className="absolute z-10 bg-transparent top-11 right-16 xl:flex hidden xl:top-12 xl:right-32 2xl:top-1/5 2xl:right-64 3xl:top-16 3xl:right-40 3xl:w-[50%] 3xl:h-[100%]">
            <img src={girl} alt="girl" className="bg-transparent w-[100%]" />
        </figure>

        <figure className="absolute -top-10 -right-[4rem] lg:flex hidden">
            <img src={star} alt="star" className="bg-transparent w-[80%]" />
        </figure>
        <figure className="absolute -bottom-10 -left-10 z-0 xl:flex hidden">
            <img src={star} alt="star" className="bg-transparent w-[80%]" />
        </figure>

        <InputField
            type="text"
            placeholder="Search"
            id="search"
            icon={<FiSearch />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            classNamePrefix="lg:w-[25%] md:w-[40%] bg-transparent md:ml-0 lg:ml-20 z-20"
        />
    </section>
);

export default SearchSection;

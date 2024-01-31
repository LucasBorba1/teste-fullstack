import React from "react";
import { FunctionComponent } from "react";
import { useSearchParams } from "react-router-dom";


const SearchBar = () => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();
        setSearchParams({search: encodeURI(searchQuery)})
        window.location.reload();
    };

    return(
        <form className="w-full" onSubmit={onSearch}>
            <input className="w-full px-5 py-1 h-10 sm:px-5 sm:py-3 rounded-full focus:outline-none"
            placeholder="Pesquisar por nome de usuário"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
        </form>
    )
} 

export default SearchBar;
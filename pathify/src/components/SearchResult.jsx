import { useNavigate } from 'react-router-dom';
import "./SearchResult.css";

export const SearchResult = ({result}) => {
    const navigate = useNavigate();
    console.log(result);
    return(
        <div className="search-result"
         onClick={(e) => navigate(`/profile/${result.username}`)}>
            <div className="user-info">
                <div className="user-details">
                    <img src="https://via.placeholder.com/150" alt="User Picture" className="user-picture" />
                    <div className="user-specific">
                        <h1>Name: {result.username}</h1>
                        {result.privacy.email ? (<h2>Email: {result.email}</h2>) : (null)}
                        <h3>Major: {result.major}</h3>                         
                        <h3>Industry: {result.industry}</h3>  
                    </div> 
                </div>
            </div>
        </div>
    )
};
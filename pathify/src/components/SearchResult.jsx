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
                    <div className="user-specific">
                        <h1>{result.username}</h1>
                        <p>
                            <strong>Email: </strong>
                            {result.privacy.email ? (
                                <a href={`mailto:${result.email}`} className='email-link'>
                                    {result.email}
                                </a>
                            ) : (
                                'not listed'
                            )}
                        </p>
                        <p><strong>Major:</strong> {result.major}</p>                         
                        <p><strong>Industry:</strong> {result.industry}</p>  
                    </div> 
                </div>
            </div>
        </div>
    )
};
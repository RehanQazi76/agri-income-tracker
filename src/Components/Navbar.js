import { Link, useNavigate } from 'react-router-dom';
import "../styles/navbar.css"
import toast from 'react-hot-toast';
function Navbar(){
    const navigate = useNavigate();
    const handleSignOut = () => {
    // Clear authentication token or any user data from local storage
    localStorage.removeItem('authToken');
    toast.success('Successfully signed out!' );// Adjust the path to your sign-in page
    // Navigate to the sign-in page
    navigate('/'); 
    
  };

return(
    <>
    <div className='nav' >
        <Link className='links' to='/dashboard'>Home</Link>
        <Link className='links' to='/income'>Income</Link>
        <Link className='links' to='/expenses'>Expense</Link>
        <Link className='links' to='/transactions'>Transactions</Link>
        <Link className='links'  to='/reports'>Reports</Link>
        <div
          className="links"
          onClick={handleSignOut} // Action for logout
        >
          
         <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span className="">Sign Out</span>
        </div>
    </div>
    </>
);
}
export default Navbar;

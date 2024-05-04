import { Link } from 'react-router-dom';
import "../styles/navbar.css"
function Navbar(){
return(
    <>
    <div className='nav' >
        <Link className='links' to='/dashboard'>Home</Link>
        <Link className='links' to='/income'>Income</Link>
        <Link className='links' to='/expenses'>Expense</Link>
        <Link className='links' to='/transactions'>Transactions</Link>
        <Link className='links'  to='/reports'>Reports</Link>
    </div>
    </>
);
}
export default Navbar;

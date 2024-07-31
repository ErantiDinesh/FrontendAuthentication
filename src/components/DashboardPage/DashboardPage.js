import './DashboardPage.css'
import withNavigate from '../SignupPage/withNavigate'

const DashboardPage = (props) => {
    const {navigate} = props
const getData = JSON.parse(localStorage.getItem("userData"))
console.log(getData)
const clickedLogout = () => {
    navigate('/login');
}

    return(
        <div className='dashboardContainer'>
            <h1 className='welcomeHeading'> Welcome {getData.user_firstname} </h1>
            <div className='detailsBox'>
            <p className='detailsPara'> Your Details: </p>
            <div className='DataItemBox'>
                <p className='userItemStyle'>Email: </p>
                <p className='userData'> {getData.user_email} </p>
            </div>

            <div className='DataItemBox'>
                <p className='userItemStyle'>Password: </p>
                <p className='userData'> {getData.user_password} </p>
            </div>

            <div className='DataItemBox'>
                <p className='userItemStyle'>Phone: </p>
                <p className='userData'> {getData.user_phone} </p>
            </div>

            <div className='DataItemBox'>
                <p className='userItemStyle'>City: </p>
                <p className='userData'> {getData.user_city} </p>
            </div>
            <div className='DataItemBox1'>
                <p className='userItemStyle'>Zip Code: </p>
                <p className='userData'> {getData.user_zipcode} </p>
            </div>
            </div>
            <button type = "button" className='logOutButton' onClick={clickedLogout}> Logout </button>
        </div>

    )
}

export default withNavigate(DashboardPage);
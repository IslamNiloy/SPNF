import React, { useEffect, useState}  from 'react';
import { userInfoByID,updateUserInfoByID } from "../../action/userAction";
import { useDispatch,useSelector } from "react-redux";
import './userProfile.css'


const UserProfileForm = () =>{
  const dispatch = useDispatch();
  const User = useSelector((state) => state.userInfo);
  const { loading, error, userInfo } = User;

  const updateUserInfo =  useSelector((state) => state.updateUserInfoByID);
  const { loading: updateUserLoading, 
    error: updateUserErr, 
    userInfo: newUserInfo } = updateUserInfo;

  const portalID = localStorage.getItem("I8PD56?#C|NXhSgZ0KE");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [accountType, setAccountType] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [companyCurrency, setCompanyCurrency] = useState('');
  const [uiDomain, setUIDomain] = useState('');
  const [dataHostingLocation, setDataHostingLocation] = useState('');
  useEffect(() => {
    if(!userInfo){
      dispatch(userInfoByID(portalID));
    }
   
    if(userInfo){
      setName(userInfo.name);
      setEmail(userInfo.email);
      localStorage.setItem("spPhk44lI519pJ",userInfo.email);
      setCompanyName(userInfo.companyName);
      setPhoneNumber(userInfo.phoneNumber);
      setCountryCode(userInfo.countryCode);
      setAccountType(userInfo.accountType);
      setTimeZone(userInfo.timeZone);
      setCompanyCurrency(userInfo.companyCurrency);
      setUIDomain(userInfo.uiDomain);
      setDataHostingLocation(userInfo.dataHostingLocation);
    }
    console.log("-------------userInfo--------------"+ loading? "loading" : error? "error": userInfo);
  }, [dispatch, userInfo, portalID]);


    const handleSubmitUserProfile = (e) => {
      e.preventDefault();
      setModalVisible(true);
      console.log(modalVisible);
      localStorage.setItem("spPhk44lI519pJ",email);
      dispatch(updateUserInfoByID(portalID,email,name,companyName, phoneNumber,countryCode));
      
    };

    const handleCloseModal = () => {
      setModalVisible(false);
  };

   
    return (
        <form className="user-profile-form" onSubmit={handleSubmitUserProfile}>
          <h3>User Profile:</h3>
          <div>
            <label>Email:</label>
            <p>{userInfo?email:""}</p>
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userInfo?name:""}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={userInfo?companyName:""}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={userInfo?phoneNumber:""}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label>Country Code:</label>
            <p>{userInfo?countryCode:""}</p>
          </div>
          <div>
            <label>Portal ID:</label>
            <p>{portalID}</p>
          </div>
        
          <div>
            <label>UI Domain:</label>
            <p>{userInfo?uiDomain:""}</p>
          </div>
          <button type="submit">Update Profile</button>
          {modalVisible ? (
            <div>
                <div>
                    <p>Information Updated</p>
                    <button type="submit" onClick={handleCloseModal}>Close</button>
                </div>
            </div>
        ) : ""}
      </form>
    )
}

export default UserProfileForm;
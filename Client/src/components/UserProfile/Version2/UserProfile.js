import React, { useEffect, useState}  from 'react';
import { userInfoByID,updateUserInfoByID } from "../../../action/userAction";
import { useDispatch,useSelector } from "react-redux";
import './UserProfile.css'; // CSS file for the styles

const UserProfile = () => {
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
  const [isEdit, setIsEdit] = useState(false);

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
      setModalVisible(true);
      console.log(modalVisible);
      localStorage.setItem("spPhk44lI519pJ",email);
      dispatch(updateUserInfoByID(portalID,email,name,companyName, phoneNumber,countryCode));
      
    };

    const handleCloseModal = () => {
      setModalVisible(false);
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit); // Toggles the state between true and false
  };

  return (
    <section className="user-profile-section">
      <form onSubmit={handleSubmitUserProfile}>
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="profile-title">
            User <span className="highlight">Profile</span> Information
          </h2>
          <div className="edit-icon" onClick={toggleEdit}>
            <i class="fas fa-edit"></i>
          </div>
        </div>
        
        <div className="profile-details">
          <div className="profile-item">
            <span className="item-title">Name</span>
            {isEdit?
            <span className='item-value'>
                <input
                type="text"
                name="name"
                value={userInfo?name:""}
                onChange={(e) => setName(e.target.value)}
              />
            </span>:
            <span className="item-value">{loading? "Loading..." : error ? "Something Went wrong": userInfo?name:""}</span>
            }
          
          </div>
          
          <div className="profile-item">
            <span className="item-title">Company Name</span>
            {isEdit?
            <span className='item-value'>
                <input
                  type="text"
                  name="companyName"
                  value={userInfo?companyName:""}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
            </span>
            :
            <span className="item-value">{userInfo?companyName:""}</span>
            }

          </div>
          
          <div className="profile-item split">
            <div>
              <span className="item-title">Phone Number </span>
              {isEdit?
                <span className='item-value'>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userInfo?phoneNumber:""}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </span>:
                <span className="item-value">{userInfo?phoneNumber:""}</span>
              }
             
            </div>
            <div>
              <span className="item-title">Country Code </span>
              <span className="item-value">{userInfo?countryCode:""}</span>
            </div>
          </div>
          
          <div className="profile-item">
            <span className="item-title">Email</span>
            <span className="item-value">{userInfo?email:""}</span>
          </div>
          {isEdit? 
            <>
              <button className="update-button" type="submit">Update Profile</button>
            </>
          :""}
        </div>
        
      </div>
      </form>
    </section>
  );
};

export default UserProfile;

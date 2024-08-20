
import { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/header/Header';
import PackageSelected from '../components/SelectedPackage/SelectedPackage';
import { useLocation } from 'react-router-dom'

const PaymentScreen = () => {
  const location = useLocation()
  const { selectedPackage } = location.state

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
 
    return(
        <div>
            <Header />
            <PackageSelected data={selectedPackage}/>
            <Footer/>
        </div>
    )
}

export default PaymentScreen;
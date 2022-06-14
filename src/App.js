import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './User/home/Home.js'
import Login from "./User/login/Login.js";
import Register from "./User/register/Register.js";
import Resetpassword from "./User/resetpassword/Resetpassword.js";
import Sendgmailresetpassword from "./User/sendgmailresetpassword/Sendgmailresetpassword.js";
import About from "./User/about/About.js"
import Cartuser from "./User/cartuser/Cartuser.js";
import Contact from "./User/contact/Contact.js";
import Bill from "./User/bill/Bill.js";
import Billdetail from "./User/billdetail/Billdetail.js";
import Listproduct from "./User/listproduct/Listproduct.js";
import Header from "./components/header/Header.js";
import Notfound from "./User/notfound/Notfound.js";
import Productdetail from "./User/productdetail/Productdetail.js";
import Profileuser from "./User/profileuser/Profileuser.js";
import Discount from "./User/discount/Discount.js";
import ConfirmPay from "./User/confirmPay/ConfirmPay.js";
function App() {
  return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/resetpassword" element={<Resetpassword />}/>
      <Route path="/sendgmailresetpassword" element={<Sendgmailresetpassword />}/>
      <Route path="/aboutus" element={<About/>}/>
      <Route path="/cartuser" element={<Cartuser/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/bill" element={<Bill/>}/>
      <Route path="/listproduct" element={<Listproduct/>}/>  
      <Route path="/notfonud" element={<Notfound/>}/> 
      <Route path="/productdetail" element={<Productdetail/>}/> 
      <Route path="/profileuser" element={<Profileuser/>}/> 
      <Route path="/discount" element={<Discount/>}/>
      <Route path="/confirmpay" element={<ConfirmPay/>}/>                        
    </Routes>
  </BrowserRouter>
  );
}

export default App;

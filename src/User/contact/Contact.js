import React from 'react'
import "./Contact.css"
export default function Contact() {
  return (
    <div  class="contact-section body-contact">
    <div class="contact-info">
      <div style={{color: "#5d5d5e"}} ><i class="fas fa-map-marker-alt"></i>Địa chỉ: 1 Đường số 1 Quận 1 TP. Hồ Chí Minh</div>
      <div style={{color: "#5d5d5e"}} ><i class="fas fa-envelope"></i>Email: CTSHOP@ctshop.com</div>
      <div style={{color: "#5d5d5e"}} ><i class="fas fa-phone"></i>  0999999999</div>
      <div style={{color: "#5d5d5e"}}><i class="fas fa-clock"></i> 13-10-2000</div>
    </div>
    <div class="contact-form">
      <h2 style={{color: "#5d5d5e"}}>Liên hệ với chúng tôi</h2>
      <form class="contact" action="" method="post">
        <input formControlName="name" type="name" name="name" class="text-box" placeholder="Tên của bạn" required/>
        <input formControlName="email" type="email" name="email" class="text-box" placeholder="Email của bạn" required/>
        <textarea style={{background: "#000"}}formControlName="body" ng-model="myTextarea"></textarea>
        <input type="submit" name="submit" class="send-btn" value="Send"/>
      </form>
    </div>
  </div>
  )
}

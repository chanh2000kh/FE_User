import React from 'react'
import "./About.css"

export default function About() {
  return (
    <div class="section">
        {/* style={{backgroundColor: "rgba(36, 41, 67, 0.25)"}} */}
		<div class="container-about">
			<div class="content-section">
				<div class="title">
					<h1>About Us</h1>
				</div>
				<div class="content">
					<h3>Công ty đồ gia dụng CT SHOP</h3>
                    <p><i class="fas fa-phone"/> Số điện thoại: 0975724427</p>  
                    <p><i class="fas fa-phone"/> Số Fax:        0999999999</p> 
                    <p>
						<i class="fas fa-envelope"/> Email: CTSHOP@ctshop.com
                    </p>
					<p> <i class="fas fa-map-marker-alt"></i> Địa chỉ : 1 Đường số 1 Quận 1 TP. Hồ Chí Minh</p>
                    <p>
                        LT Shop là một sàn giao dịch thương mại điện tử, cung cấp sản phẩm đồ gia dụng khác nhau khác nhau như quạt , tủ lạnh, tivi , đồ dùng nhà bếp,.. <br/>

						✪ Là mô hình market place – là trung gian trong quy trình mua bán online <br/>
						✪ Đại lý các sản phẩm của Sunhouse <br/>
						✪ Chăm sóc khách hàng từ đội ngũ chuyên nghiệp 24/7 <br/>
						✪ Tận dụng các công cụ đắc lực hỗ trợ cho việc bán hàng. <br/>
						✪ Quy trình bán hàng trên LT Shop đơn giản, thuận tiện
                    </p>           				
				</div>	
			</div>
			<div class="image-section">
				<img src="/assets/CTSHOP.png"/>
			</div>
		</div>
	</div>
  )
}

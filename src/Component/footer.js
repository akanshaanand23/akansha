import React from "react"
import Google from  "./google.png"
import App from  "./apple.png"
import "./footer.css"
export default function Footer(){
    return(
        
       <footer id="footer">
           <div className ="leftFooter">
               <h4>DOWNLOAD OUR APP</h4>
<p>DOWNLOAD App for Android and IOS mobile phone</p>
<img src={Google} />
<img src={App} />
           </div>
<div className="midFooter">
<h1>Walshopping</h1>
<p>High Quality is our first priority</p>
<p>Copyrights 2021 &copy; Walshopping pvt ltd.</p>
</div>
<div  className="rightFooter">
<h4>Follow Us</h4>
<a href = "">instagram</a>
<a href = " ">Youtube</a>
<a href = " ">Facebook</a>
</div>
       </footer>
        
    )
}
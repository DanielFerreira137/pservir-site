import React,{ useRef } from 'react';
import emailjs from '@emailjs/browser';

import bg1 from './../assets/images/background/bg1.jpg';

function NewsLetter({subscribeChange}){
    const form = useRef();
	const sendEmail = (e) => {
		e.preventDefault();
		//emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
		emailjs.sendForm('gmail', 'YOUR_TEMPLATE_ID', e.target, 'd9b2e0f5fc72cb94792110e8ff2028f3-us16')
		  .then((result) => {
			
		  }, (error) => {
			
		  });
		  e.target.reset()
	};	
    return(
        <>
            <section className={`py-5 newsletter-wrapper ${subscribeChange}`} style={{backgroundImage: 'url('+ bg1 +')', backgroundSize: 'cover' }}>
                <div className="container">
                    <div className="subscride-inner">
                        <div className="row style-1 justify-content-xl-between justify-content-lg-center align-items-center text-xl-start text-center">
                            <div className="col-xl-7 col-lg-12 ">
                                <div className="section-head mb-0">
                                    <h2 className="title text-white my-lg-3 mt-0">Subscreva a nossa newsletter para receber as últimas atualizações de livros</h2>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-6 " >
                                <form className="dzSubscribe style-1"  ref={form} onSubmit={sendEmail}>
                                    <div className="dzSubscribeMsg"></div>
                                    <div className="form-group">
                                        <div className="input-group mb-0">
                                            <input name="dzEmail" required="required" type="email" className="form-control bg-transparent text-white" placeholder="O seu endereço de Email" />
                                            <div className="input-group-addon">
                                                <button name="submit" value="Submit" type="submit" className="btn btn-primary btnhover">
                                                    <span>Subscreve</span>
                                                    <i className="fa-solid fa-paper-plane"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default NewsLetter;
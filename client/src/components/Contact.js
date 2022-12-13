import React, { useEffect, useState } from 'react';

const Contact = () => {

    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });
    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json"
                },

            });
            const data = await res.json();
            console.log(data);
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userContact();

    }, []);

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value });
    }
    const contactForm = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = userData;
        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });
        const data = await res.json();
        if (!data) {
            console.log("message not send");
        } else {
            alert("message send");
            setUserData({ ...userData, message: "" });
        }

    }

    return (
        <>
            <div className="container">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Email us
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Mail ID<code>tusharkantanayak713@gmail.com</code> </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                               call us
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">phone: <code>6372305866</code> </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                address
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">cuttuck,odisha ,<code>754027</code> </div>
                        </div>
                    </div>
                </div>
            </div>


            <form method="POST">


                <div className="row g-3">
                    <div className="col-sm-4">
                    {/* your name: */}
                        <input type="text" className="form-control" placeholder=" Your name"
                            name="name"

                            value={userData.name}
                            onChange={handleInputs}
                            required="true" aria-label="City" />
                    </div>
                    <div className="col-sm-4">
            
                        <input type="email" className="form-control" placeholder="your mail id"
                            name="email"
                            value={userData.email}
                            onChange={handleInputs}
                            aria-label="State" />
                    </div>
                    <div className="col-sm-4">
                  
                        <input type="number" className="form-control" placeholder="your phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputs}
                            aria-label="Zip" />
                    </div>
                </div>


                <div className="mb-3">
                {/* feedback: */}
                    <textarea className="form-control" placeholder=" feedback message"
                        name="message"
                        value={userData.message}
                        onChange={handleInputs}
                        id="exampleFormControlTextarea1" rows="5" col="3"></textarea>
                </div>


                <div className="d-grid gap-2 col-6 mx-auto">
                  
                    <button type="submit" className="btn btn-primary"
                        onClick={contactForm}
                    >send message</button>

                </div>
            </form>









        </>
    )
}

export default Contact;

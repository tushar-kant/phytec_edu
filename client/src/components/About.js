import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

const About = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});
    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"

            });
            const data = await res.json();
            console.log(data);
            setUserData(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            history.push('/login');
        }

    }


    useEffect(() => {
        callAboutPage();

    }, []);
    return (
        <>
            <form method="GET">

                <div className="container">

                    <div class="card text-center">
                        <div class="card-header">
                            ID-{userData._id}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{userData.email}</h5>
                            <h2 class="card-text">{userData.name}.</h2>

                        </div>
                        <div class="card-footer text-muted">
                            {userData.phone}
                        </div>
                    </div>
                </div>

            </form>
            {/* <div className="container">
                <div class="card">
                    <div class="card-body">
                        select something good for you..
                    </div>
                </div>
            </div>
            <div className="container">

                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div class="col">
                        <div class="card">
                            <img src="dog7.jpg" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">small dog</h5>
                                <p class="card-text">$4 per walk</p>
                                <h5 class="card-title">contact us</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="dog9.jpg" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">medium dog</h5>
                                <p class="card-text">$4 per walk</p>
                                <h5 class="card-title">contact us</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="dog10.jpg" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">big dog</h5>

                                <p class="card-text"> $4 per walk</p>
                                <h5 class="card-title">contact us</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="dogc1.jpg" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">cats</h5>
                                <p class="card-text"> $4 per walk</p>
                                <h5 class="card-title">contact us</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </>
    )
}

export default About;

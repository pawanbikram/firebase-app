import React, { useState } from 'react';

export default function Contact() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        message: ""
    });

    let name, value;

    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;
        setUser({ ...user, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();

        const { name, email, mobile, address, message } = user;

        if (name && email && mobile && address && message) {
            const res = await fetch("https://react-firebase-contact-us-default-rtdb.firebaseio.com/firebasecontactform.json", {
                method: "POST",
                headers: {
                    "Content-Tyep": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobile,
                    address,
                    message
                })
            });

            if (res) {
                setUser({
                    name: "",
                    email: "",
                    mobile: "",
                    address: "",
                    message: ""
                });
                alert("Form Submitted Successfully!");
            }
        }
        else {
            alert("Please fill all the field data!");
        }
    }

    return (
        <div className="container my-4">
            <h2>Contact Us</h2>
            <form className="row g-3" method="POST">
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" value={user.name} onChange={getUserData} autoComplete="off" required placeholder="Enter Your Name" className="form-control" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" value={user.email} onChange={getUserData} autoComplete="off" required placeholder="Enter Your Email" className="form-control" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="mobile" className="form-label">Mobile Number</label>
                    <input type="text" name="mobile" value={user.mobile} onChange={getUserData} autoComplete="off" required placeholder="Enter Your Mobile Number" className="form-control" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" name="address" value={user.address} onChange={getUserData} autoComplete="off" required placeholder="Enter Your Address" className="form-control" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea name="message" id="message" value={user.message} onChange={getUserData} placeholder="Enter Your Message" cols="30" rows="5" className="form-control"></textarea>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={postData}>Submit</button>
                </div>
            </form>
        </div>
    )
}

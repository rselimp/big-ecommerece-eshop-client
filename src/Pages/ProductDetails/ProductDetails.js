import React, { useRef, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MobileProduct3 from '../ProductCart/MobileProduct3';
import { useDispatch } from 'react-redux';
import { cartActions } from '../Redux/Slices/cartSlice';
import { toast } from 'react-hot-toast';


const ProductDetails = () => {
    const productdetails = useLoaderData()
    const { _id, imgUrl, productName, price, reviews, description, avgRating, shortDesc } = productdetails
    const [rating, setRating] = useState(null)
    const reviewUser = useRef('')
    const reviewMsg = useRef('')
    const dispatch = useDispatch()



    const submitHandler = event=>{
        event.preventDefault()
        const reviewUserName = reviewUser.current.value
        const reviewUserMsg = reviewMsg.current.value
        console.log(reviewUserName, reviewUserMsg)
        const reviewObj ={
            userName: reviewUserName,
            text: reviewUserMsg,
            rating,
        }
        console.log(reviewObj)
        toast.success('Review Submitted')
    }

    const addToCart =() =>{
        dispatch(cartActions.addItem({
            _id,
            imgUrl:imgUrl,
            productName,
            price
        })
        )
        toast.success('Product added successfully')
    }





    return (
        <section>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row gap-20">
                    <img src={imgUrl} className="max-w-sm rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{productName}</h1>
                        <div className='flex mb-2 text-orange-400"'>
                            <FaStar className='text-orange-600'></FaStar>
                            <FaStar className='text-orange-600'></FaStar>
                            <FaStar className='text-orange-600'></FaStar>
                            <FaStar className='text-orange-600'></FaStar>
                            <FaStarHalfAlt className='text-orange-600'></FaStarHalfAlt>
                        </div>
                        <h1 className="text-xl font-bold mb-2 ">( <span className='text-orange-400'>{avgRating} </span>ratings)</h1>
                        <h1 className="text-xl font-bold">${price}</h1>
                        <p className="py-6">{shortDesc}</p>
                        <button onClick={addToCart} className="btn btn-primary">Add to Cart</button>
                    </div>

                </div>
            </div>
            <div className='flex gap-6'>
                <Tabs>
                    <TabList>
                        <Tab>Description:</Tab>
                        <Tab>Reviews:({reviews.length})</Tab>
                    </TabList>

                    <TabPanel>
                        <h2 className='text-justify'>{description}</h2>
                    </TabPanel>
                    <TabPanel>
                        {reviews.map((review, index) => <p key={index}>
                            <h6>Md Ataur</h6>
                            {review.rating}(ratings) <br />
                            {review.text}

                        </p>)}

                        <div className='mt-6 lg:ml-40'>
                            <div>

                                <h1 className='mb-4'>Share your Experience</h1>
                                <form onSubmit={submitHandler}>
                                    <input type="text" placeholder="Your name" className="input input-bordered w-full mb-4" ref={reviewUser} required /> <br />
                                    <div className=' flex mb-2 items-center gap-4'>
                                      
                                        <FaStar title='1' onClick={() =>setRating(1)} className='text-orange-600'></FaStar>
                                        <FaStar title='2' onClick={() =>setRating(2)} className='text-orange-600'></FaStar>
                                        <FaStar title='3' onClick={() =>setRating(3)} className='text-orange-600'></FaStar>
                                        <FaStar title='4' onClick={() =>setRating(4)} className='text-orange-600'></FaStar>
                                        <FaStar title='5' onClick={() =>setRating(5)} className='text-orange-600'></FaStar>
                                       
                                     
                                     
                                    </div>
                                    <textarea ref={reviewMsg} className="textarea textarea-bordered w-full" placeholder="message" required></textarea>
                                    <input type="submit" className='btn btn-accent mb-4' value="Submit" />
                                </form>

                            </div>
                        </div>
                    </TabPanel>
                </Tabs>


            </div>

            <div>
                <h2 className='text-center'>You might also like</h2>
                alada kore map korta hobe
            </div>

        </section>
    );
};

export default ProductDetails;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';
import Clock from '../Clock/Clock';
import ProductCart from '../ProductCart/ProductCart';
import ProductCart2 from '../ProductCart/ProductCart2';
import image1 from '../../images/volta_slider.jpg';
import image2 from '../../images/cruiseteak-16.jpg';
import image3 from '../../images/cruisealu-11.jpg';
import MobileProduct3 from '../ProductCart/MobileProduct3';
import ShoeProducts4 from '../ProductCart/ShoeProducts4';


const Home = () => {
    const [data, setData] = useState([])
    const [bestSalesProducts, setBestSalesProducts] = useState([])
    const [mobileProducts, setMobileProducts] = useState([])
    const [shoeProducts, setShoeProducts] = useState([])
 

    useEffect(() => {
        fetch('https://big-esupershop-server.vercel.app/chairProducts')
            .then(res => res.json())
            .then(data => setData(data))

    }, [])


    useEffect(() => {
        fetch('https://big-esupershop-server.vercel.app/sofaProducts')
            .then(res => res.json())
            .then(data => setBestSalesProducts(data))
    }, [])

    useEffect(  () =>{
        fetch('https://big-esupershop-server.vercel.app/mobileProducts')
        .then(res=>res.json())
        .then(data =>setMobileProducts(data))
    },[])

    useEffect(()=>{
        fetch('https://big-esupershop-server.vercel.app/allProducts')
        .then(res =>res.json())
        .then(data =>setShoeProducts(data))
    },[])
    return (
        <div>
            <Banner></Banner>
            <section>
            <div>
                {/* <Services /> */}
            </div>
            <section>
                <div>
                    <h2 className='text-2xl text-center'>Treading Products</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {
                            data?.map(item => <ProductCart key={item._id} item={item}></ProductCart>)
                        }


                    </div>
                </div>
            </section>
            <section>
                <div>
                    <h2 className=' text-2xl text-center mb-8 mt-6'>Best Sales</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {
                            bestSalesProducts.map(bestsale => <ProductCart2 key={bestsale._id} bestsale={bestsale}></ProductCart2>)
                        }
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <footer className="footer p-10 bg-neutral text-neutral-content">
                        <div>
                            <p className='text-2xl'>Limited Offer, Quality Sofa<br /></p>
                            
                            <Clock/>
                            
                            <button className='btn btn-sm btn-accent mt-4'><Link to='/shop'>Visit Store</Link></button>
                           
                        </div>
                        <div>
                            <span className="footer-title">Social</span>
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                                <img className='h-40 w-80' src={image1} alt="" />
                                <img className='h-40 w-80' src={image2} alt="" />
                                <img className='h-40 w-80' src={image3} alt="" />
                            </div>
                        </div>
                    </footer>
                </div>
            </section>
            <section>
                <h1 className='text-center text-2xl mt-6 mb-6'>Available Markets</h1>
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4'>
                     {
                        mobileProducts.map(mobileProduct =><MobileProduct3 key={mobileProduct._id} mobileProduct={mobileProduct}/>)
                     }     
                </div>
            </section>
            <section>
                <h1 className='text-center text-2xl mt-8 mb-8'>Different Products</h1>
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4'>
                     {
                        shoeProducts.map(shoeProduct=><ShoeProducts4 key={shoeProduct._id} shoeProduct={shoeProduct}/>)
                     }
                </div>
            </section>
        </section>
    

        </div>
    );
};

export default Home;
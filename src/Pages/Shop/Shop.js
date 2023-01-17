import { async } from '@firebase/util';
import axios from 'axios';

import React, { useEffect, useMemo, useState } from 'react';
import FilterItem from '../FilterItem/FilterItem';
import SearchItem from '../FilterItem/SearchItem';

const Shop = () => {
    const[shopList, setShopList] = useState([])
    const[selectedCategory, setSelectedCategory] = useState();
    const[APIData, setAPIData] = useState([])
    const[fiteredResults, setFilteredResults] = useState([])
    const[searchInput, setSearchInput] = useState('');
    const[query,setQuery] = useState('')
    const [data, setData] = useState([])
   
    useEffect(  () =>{
        const fetchUsers = async () =>{
            const res = await axios.get('https://big-esupershop-server.vercel.app/products')
            setData(res.data)
        };
        fetchUsers()
    },[])


    // useEffect( () =>{
    //     axios.get(`https://big-esupershop-server.vercel.app/products`)
    //     .then((response) =>{
    //         setAPIData(response.data)
          
           

    //     })
       
    // },[])

    // const searchItems = (searchValue) =>{
    //     setSearchInput(searchValue)

    //     if(searchInput !== ''){
    //         const filteredData = APIData.filter((item) =>{
    //             return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
    //         })
    //         setFilteredResults(filteredData)
    //         console.log(fiteredResults)
    //     }
    //     else{
    //         setFilteredResults(APIData)
    //     }
    // }

    useEffect(() => {
        fetch('https://big-esupershop-server.vercel.app/products')
            .then(res => res.json())
            .then(data =>setShopList(data))
           
            
    }, [])

    function getFilteredList() {
        if(!selectedCategory){
            return shopList;
        }
        return shopList.filter((item) =>item.category === selectedCategory)
    }

    const filteredList = useMemo(getFilteredList,[selectedCategory,shopList]);

        
    function  handleChange(event){
        setSelectedCategory(event.target.value)
    }


    return (
       <div>
         <div className='flex justify-start gap-24 mt-40'>
            <div className=''>
                <select onChange={handleChange} className="select select-bordered w-96 max-w-xs">
                    <option selected>Filter By Category</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="chair">Chair</option>
                    <option value="mens sneaker">Men's Sneaker</option>
                    <option value="mens pants">Men's Pants</option>
                    <option value="mens boot">Men's Boot</option>
                    <option value="bag">Bag</option>
                    <option value="cap">Cap</option>
                    <option value="earphones">Earphones</option>
                    <option value="bottle">Bottle</option>

                </select>
                
            </div>
            <div>
            
                {/* <select className="select select-bordered w-96 max-w-xs">
                    <option>Sort By</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>


                </select> */}
            </div>
            <div>
                {/* <div className="form-control">
                    <input onChange={(e) =>setQuery(e.target.value)} type="text" placeholder="Search....." className="input input-bordered w-96" />
                   
                </div>
                 */}
            </div>
            
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
                {
                    filteredList.map((element, index) =><FilterItem key={index} element={element}/>)
                }
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4'>
                {  
               
               data?.map((item) => <SearchItem key={item._id} item={item}/>)
                
                }
            
                
            </div>
       </div>
    );
};

export default Shop;
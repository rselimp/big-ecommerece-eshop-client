import { async } from '@firebase/util';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const AddProducts = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const imageHostKey = '4c5bdcc7fbf0840581270237c8abaeb0';
    //console.log(imageHostKey)
    

    const handleAddProduct = (data) =>{
        const image=  data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url =`https://api.imgbb.com/1/upload?&key=${imageHostKey}`
        fetch(url,{
            method: 'POST',
            body: formData
        })
        .then(res =>res.json())
        .then(imgData =>{
            if(imgData.success){
                console.log(imgData.data.url)

                const products ={
                    productName:data.productName,
                    imgUrl: imgData.data.url,
                    category: data.category,
                    price:data.price,
                    shortDesc: data.shortDesc,
                    description:data.description,
                    reviews: data.reviews
                }
                console.log(products)
                fetch('https://big-esupershop-server.vercel.app/products',{
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(products)
                })
                .then(res =>res.json())
                .then(result =>{
                    console.log(result)
                    if(data.acknowledged){
                        toast.success(`${data.productName} is added successfully`)
                    }
                })
            }
           
        })  
        // .catch(error =>console.log(error))
    }

    return (
        <div className='w-1/2'>
            <form onSubmit={handleSubmit(handleAddProduct)} >
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product title</span>
                    </label>
                    <input  type="text" {...register("productName", { required: true  })} placeholder="product" className="input input-bordered" />
                    {errors.img && <p className='text-red-400'>{errors.img.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Short Description</span>
                    </label>
                    <input type="text" {...register("shortDesc", { required: true  })} placeholder="short desc"  className="input input-bordered" />
                    {errors.shortDesc && <p className='text-red-400'>{errors.shortDesc.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input required type="text" {...register("description", { required: true  })} placeholder="description" className="input input-bordered" />
                    {errors.desc && <p className='text-red-400'>{errors.desc.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input required type="text" {...register("price", { required: true  })} placeholder="price"  className="input input-bordered" />
                    {errors.price && <p className='text-red-400'>{errors.price.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">reviews</span>
                    </label>
                    <input required type="text" {...register("reviews", { required: true  })} placeholder="reviews"  className="input input-bordered" />
                    {errors.reviews && <p className='text-red-400'>{errors.reviews.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select  {...register("category", { required: true  })}  className="select select-bordered w-full"  >
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
                <div className="form-control">
                    <label className="label"><span className="label-text">Product Image</span></label>
                    <input type="file" 
                    {...register("image",{
                         required: "photo is required"  })} className="input input-bordered" />
                    {errors.image && <p className='text-red-400'>{errors.image.message}</p>}
                </div>
                <button className='btn btn-accent mt-4' type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default AddProducts;
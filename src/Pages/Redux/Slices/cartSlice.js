import { createSlice } from '@reduxjs/toolkit'

const items = localStorage.getItem('cartItems') !== null ? JSON.parse
(localStorage.getItem('cartItems')) : []
const totalAmount = localStorage.getItem('totalAmount') !== null ? JSON.parse
(localStorage.getItem('totalAmount')) : 0

const totalQuantity = localStorage.getItem('totalQuantity') !== null ? JSON.parse
(localStorage.getItem('totalQuantity')) : 0

const initialState = {

    cartItems:items,
    totalAmount:totalAmount,
    totalQuantity:totalQuantity


}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem:(state, action)=>{
        const newItem = action.payload
        const existingItem = state.cartItems.find(item =>item._id === newItem._id
                );
       
        state.totalQuantity++
        

        if(!existingItem){
            state.cartItems.push({
                _id:newItem._id,  
                productName:newItem.productName,
                imgUrl: newItem.imgUrl,
                price: newItem.price,
                quantity:1,
                totalPrice:newItem.price
                
                
            })
        }
        
        else{
            existingItem.quantity++
            existingItem.totalPrice = Number(existingItem.totalPrice) + Number
            (newItem.price)
            
        }
        
        state.totalAmount = state.cartItems.reduce((total, item) => total+
        Number(item.price) * Number(item.quantity),0
        )

        localStorage.setItem('cartItems',JSON.stringify(state.cartItems.map(item=>item)))
        localStorage.setItem('totalAmount',JSON.stringify(state.totalAmount))
        localStorage.setItem('totalQuantity',JSON.stringify(state.totalQuantity))
        // console.log(state.totalQuantity)
        // console.log(state.cartItems)
        // console.log(newItem)
       
    },
    deleteItem:(state,action) =>{
        const _id = action.payload;
        const existingItem = state.cartItems.find(item =>item._id ===_id)

        if(existingItem){
            state.cartItems = state.cartItems.filter(item =>item._id !==_id)
            state.totalQuantity = state.totalQuantity - existingItem.quantity
        }
        state.totalAmount = state.cartItems.reduce((total, item) => total+
        Number(item.price) * Number(item.quantity),0
        
        )

    }

  },
});

export const cartActions = cartSlice.actions

export default cartSlice.reducer
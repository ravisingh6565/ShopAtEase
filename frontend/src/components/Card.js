import React,{useEffect, useRef, useState} from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
    let [quantity, setQuantity] = useState(1);
     function increament(){
        //  setQty(quantity+1);
         setQuantity(quantity+1);
    }
    function decreament(){
        // setQty(quantity-1);
        setQuantity(quantity-1);
    }

    // add to cart functionality
    const data = useCart();
    const dispatch = useDispatchCart();

    const handleAddToCart = async ()=>{
        await dispatch({type:"ADD", id:props.shopItem._id, name: props.shopItem.name, price: (quantity*props.shopItem.price), qty: quantity});
        console.log("kk=>d",data);
        alert("Successfully Added To Cart");
        // localStorage.setItem('cart', JSON.stringify(data));
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(data));
      }, [data]);

    //options functionality
    // let options= props.options;
    // let priceOptions = Object.keys(options);
    // const [qty, setQty]= useState(1);
    // const [size, setSize]= useState('');

    // const priceRef = useRef();
    // let finalPrice = qty * parseInt(options[size]);
    // useEffect(()=>{
    //     setSize(priceRef.current.value);
    // },[])

    return (
        // <h1>card {console.log(props.shopItem)}</h1>
        <div  className='card m-3'>
            <div className="card" style={{ 'width': '18rem' }}>
                {/* <img src={props.shopItem.item_img} className="card-img-top" alt="..." style={{height:"150px", objectFit:"cover"}}/> */}
                {((props.shopItem?.images)?.length>0 ) && <img src={props.shopItem?.images[0].url} alt='shopItem' className="card-img-top" style={{height:"150px", objectFit:"cover"}} />}
                {/* <img src='https://www.lifebuoy.in/sk-eu/content/dam/brands/lifebuoy/india/36959432-8901030844706-01.png' className="card-img-top" alt="..." style={{height:"150px", objectFit:"cover"}}/> */}
                <div className="card-body">
                    <h5 className="card-title">{props.shopItem.name}</h5>
                    <p className="card-text">{props.shopItem.description}</p>

                    <div className='quantity'>
                        {(quantity>1)&&
                        <button className='decreament-btn' onClick={decreament} >-</button>}
                        {quantity}
                        
                        <button className='increament-btn' onClick={increament} >+</button>
                    </div>
                    <div className='options'>
                        {/* <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
                             {
                                props.shopItem.options.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })
                             }
                        </select> */}
                        <div className='d-inline h-100 fs-5'>
                        ₹{quantity*props.shopItem.price}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart} >Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

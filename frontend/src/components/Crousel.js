import React from 'react';

export default function Crousel(props) {
    // const [searchKey, setSearchKey]= useState('');

    // const changeHandler = (event)=>{
    //     setSearchKey(event.target.value);
    // }
    // const submitHandler = (event) => {
    //     event.preventDefault();
    //     props.onSearch(searchKey);
    //   };
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
            <div className="carousel-inner" id="carousel">

                <div className="carousel-item active">
                    <img src="https://shopiclix.com/adminpanel/upload/slider/1679574169494.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/900x700?grocery" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        
    )
}

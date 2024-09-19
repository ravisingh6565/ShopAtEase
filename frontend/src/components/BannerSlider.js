import React from 'react'
import Slider from 'react-slick'
// import './BannerSlider.css'

export default function BannerSlider() {
    const data = [
        {
            id: 1,
            image: 'https://shopiclix.com/adminpanel/upload/slider/1679574169494.png',
            title: 'Fruits, Veggies, Eggs or Cereals...',
            description:  'Order any thing you want from your local seller',
            button: '#'
        },
        {
            id: 2,
            image: 'https://img.foodlogistics.com/files/base/acbm/fl/image/2020/03/GettyImages_953800868_grocery_delivery.5e8241a6d1c17.png?auto=format%2Ccompress&fit=crop&h=288&q=70&w=512',
            title: 'Groceries at your doorstep',
            description:  'Order and get it delivered',
            button: '#'
        },
        {
            id: 3,
            image:  'https://images.jdmagicbox.com/comp/varanasi/f9/0542px542.x542.090321112530.x5f9/catalogue/sadhana-general-stores-sigra-road-varanasi-general-stores-bccx3qxa0u.jpg?clr=',
            title: 'Choose your desired Shop',
            description:  'Support local seller',
            button: '#'
        }
    ]

    /*** setting copied from:  https://www.npmjs.com/package/react-slick ***/
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <div className='bannerslider'>
    <Slider className='bannerslider' {...settings}>
        {
            data.map(item => {
                return(
                    <div className='imagecont' key={item.id}>
                        <img src={item.image} alt='noimg'/>
                        <div className='content'>
                            <h1>{item.title}</h1>
                            <span>{item.description}</span>
                            <button>Shop Now</button>
                        </div>
                    </div>
                )
            })
        }
    </Slider>
</div>
  )
}

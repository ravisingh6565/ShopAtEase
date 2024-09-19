import React, { useEffect, useState } from 'react'
import SingleBanner from '../../src/components/SingleBanner'
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import './Extrapages.css'

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const [activesection, setactivesection] = useState(0)


  const faq = [
    {
      id: 1,
      question: 'What is Shop at Ease?',
      answer: 'Shop at ease is a multi-vendor grocery shopping website where local sellers can register their shop and the nearby customers can shop from local sellers online.'
    },
    {
      id: 2,
      question: 'What is the purpose for this project?',
      answer: '➢ To provide the ease of online shopping to the customers without causing loss to the local vendors.➢ Provide online platform to local shop owners where they can list and sell their products.➢ Provide facility to customers where they can compare products from different shops and buys what suits them.➢ Provide facility to customers where they can order items from their regular/desired shop online.➢ Increase the outreach of local vendors thus providing them more customers.'
    },
    {
      id: 3,
      question: 'What is the problem in existing system?',
      answer: 'Although, existing online platforms like Blinkit, Big Basket, Flipkart Grocery do provide grocery shopping but they deliver the products from warehouses due to which the local vendors suffer because their old customers now prefer to save time and do online shopping.'
    },
    {
      id: 4,
      question: 'How does it solves the problem?',
      answer: 'Our website will provide a platform to local vendors to sell their products online. This will retain their existing customers who prefer to shop online as well as increase their shops reach throughout the locality and attract more customers. Our website will let the customer choose from which shop they want to order and since it will deliver the items same day that too from their nearby shops so the customers will no longer have to compromise on the freshness and quality of the products.'
    }
  ]

  return (
    <div className='extrapage'>
      <Navbar />
      <SingleBanner
        heading="FAQs"
        bannerimage='https://images.unsplash.com/photo-1665789318391-6057c533005e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
      />


      <div className='faqcontainer'>
       
        {
          faq.map((item, index) => {
            return (
              // eslint-disable-next-line eqeqeq
              activesection == item.id ?
                <div className='faq'>
                  <div className='faqhead'>
                    <h1>
                      {item.question}
                    </h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                      onClick={() => setactivesection(0)}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className='faqbody'>
                    <p>
                      {item.answer}
                    </p>
                  </div>
                </div>
                :
                <div className='faq'>
                  <div className='faqhead'>
                    <h1>{item.question}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                      onClick={() => setactivesection(item.id)}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>

                  </div>
                </div>
            )
          })
        }


      </div>


      <Footer/>
      
    </div>
  )
}

export default FAQ
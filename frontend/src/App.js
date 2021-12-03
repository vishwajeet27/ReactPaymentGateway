import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


function loadScript(src)  {
  return new Promise((resolve) => {

 
   const script = document.createElement('script')
   script.src = src
   script.onload = () => {
     resolve(true)
   }
   script.onerror = () => {
     resolve(false)
   }
   document.body.appendChild(script)

  })

}

const __DEV__ = document.domain === 'localhost'




function App() {

  const [name, setName] = useState('vishwajeet')


   async function displayRazorpay(){


    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if(!res){
      alert('Razorpay sdk failed to load . are you online')
      return
    }


    const data = await  fetch('http://localhost:1337/razorpay', {method: 'POST'}).then((t) =>
    t.json()
    )

    console.log(data)





    const  options = {
      "key": __DEV__ ? 'rzp_test_xfWbD1IRm1hPXb' : 'PRODUCTION_KEY', 
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      "name": "Acme Corp",
      "description": "Test Transaction",
      image: 'http://localhost:1337/logo.svg',
      "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      "prefill": {
          name
      },
      
  };
  const paymentObject  = new window.Razorpay(options);
  paymentObject.open();
  }

  



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick = {displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay here
        </a>
      </header>
    </div>
  );
}

export default App;

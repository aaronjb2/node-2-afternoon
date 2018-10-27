import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      userInputID: '',
      userInputName: '',
      userInputImageURL: '',
      userInputPrice: '',
      userInputDescription: '',
      products: []
    }
  }

  getProducts() {
    let promise = axios.get('/api/products');
    promise.then(res=> {
      console.log(res);
      this.setState({
        products: res.data
      })
    })
  }

  addProduct() {
    let myImageURL = this.state.userInputImageURL;
    console.log('myImageURL is', myImageURL)
    let promise = axios.post('/api/products', {name:this.state.userInputName,description:this.state.userInputDescription,price:this.state.userInputPrice,image_url:myImageURL});
    promise.then(res=> {
      console.log(res);
      this.setState({
        products: res.data
      })
    })
  }

  editProduct() {
    let promise = axios.put(`/api/products/${this.state.userInputID}`,{name:this.state.userInputName,image_url:this.state.userInputImageURL,price:this.state.userInputPrice,description:this.state.userInputDescription});
    promise.then(res => {
      this.setState({
        products: res.data
      })
    })
  }

  deleteProduct() {
    let promise = axios.delete(`/api/products/${this.state.userInputID}`);
    promise.then(res=> {
      this.setState({
        products: res.data
      })
    })
  }
updateUserInputID(val){
  this.setState({
    userInputID: val
  })
}

updateUserInputName(val){
this.setState({
  userInputName: val
})
}

updateUserInputImageURL(val){
  this.setState({
    userInputImageURL: val
  })
}

updateUserInputPrice(val){
  this.setState({
    userInputPrice: val
  })
}

updateUserInputDescription(val){
  this.setState({
    userInputDescription: val
  })
}

displayProducts(myProducts){
  console.log('myProducts is', myProducts)
return myProducts.map((element,index,arr)=>{
  return <div>
    <div>Product Name: {element.name}</div>
    <img src = {element.image_url}/>
    <div>Product Description: {element.description}</div>
    <div>Product Price: ${element.price}</div>
  </div>
  })
}

  render() {
    return (
      <div className="App">
        <input onChange = {e=>this.updateUserInputID(e.target.value)}></input>
        <input onChange = {e=>this.updateUserInputName(e.target.value)}/>
        <input onChange = {e=>this.updateUserInputImageURL(e.target.value)}/>
        <input onChange = {e=>this.updateUserInputPrice(e.target.value)}/>
        <input onChange = {e=>this.updateUserInputDescription(e.target.value)}/>
        <button onClick = {()=>this.getProducts()}>show</button>
        <button onClick = {()=>this.addProduct()}>add</button>
        <button onClick = {()=>this.editProduct()}>edit</button>
        <button onClick = {()=>this.deleteProduct()}>delete</button>
        {/* {this.displayProducts(this.state.products)} */}
        {console.log(this.state.products)}
      </div>
    );
  }
}

export default App;

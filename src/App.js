import React, {Component} from 'react';
import './App.css';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      title: 'React CRUD Sample',
      action: 0,
      index: '',
      datas: []
    }
  }
  
  componentDidMount(){
    this.refs.name.focus();
  }

  functionSubmit = (e) => {
    e.preventDefault();
    console.log('test');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    
    if(this.state.action === 0){ // new record insert
    
      let data = {
        name, address
      }
      datas.push(data);
      
    }else{  //  for update record
    
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;

    }
    this.setState({
      datas: datas,
      action: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();

  }

  functionRemove = (i) =>{
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas:datas
    })
    
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  functionEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;

    this.setState({
      action: 1,
      index: i
    });

    this.refs.name.focus();
  }

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
          <h2>{this.state.title}</h2>
          <form ref="myForm" className="myForm">
              <input type="text" ref="name" placeholder="your name" className="formfield"/>
              <input type="text" ref="address" placeholder="your address" className="formfield"/>
              <button onClick={(e)=>this.functionSubmit(e)} className="myButton">submit</button>
          </form>
          <pre>
            {datas.map((data, i) => 
              <li key={i} className="myList">
                {i+1}. {data.name}, {data.address}
                <button onClick={()=>this.functionRemove(i)} className="myButton">Remove</button>
                <button onClick={()=>this.functionEdit(i)} className="myButton">Edit</button>
              </li>  
            )}
          </pre>
      </div>
    )
  }
}

export default App;
import React, { Component } from 'react';

class  extends Component {
    state = { 
        products: [
            {id:1 name:"product 1"},
            {id:2 name:"product 2"},
            {id:3 name:"product 3"}
        ]
     }
    render() { 
        return (  
            <div>
                <h1>Products</h1>
                <ul>
                    {this.state.products.map((product) =>
                     <li></li>
                    )}
                </ul>
            </div>
        );
    }
}
 
export default ;
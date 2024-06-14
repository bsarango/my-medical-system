import React, { useEffect,useState } from 'react'
import OrderForm from '../components/OrderForm'
import Order from '../components/Order'

function Orders(){

    const [orders, setOrders] = useState([])

    useEffect(()=>{ 
      fetch("/api/orders")
      .then(r =>{
        if (r.ok){
          r.json().then(orders=>{
            setOrders(orders)
        });
        };
      });
    },[]);

    const ordersToDisplay = orders.map(order=>{
        return <Order order={order} onDelete={removeOrder} onUpdate={updateOrderList}/>
    })

    function updateOrderList(updatedOrder){
        const newOrderList= orders.map(order=>{
            if(order.id === updatedOrder.id){
                return updatedOrder
            }
            return order
        })
        setAppointments(newOrderList)
    }

    function removeOrder(deletedOrder){
        const newOrderList = orders.filter(order=>order.id!==deletedOrder.id)
        setAppointments(newOrderList)
    }

    function addOrderToList(newOrder){
        const newOrderList = [...orders,newOrder]
        setOrders(newOrderList)
    }

    if(!loggedIn){
        return(
            <div>
                <p>Please Log in to Use our Services</p>
                <Link to = "/login">
                    <button className="bg-transparent hover:bg-blue-900 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded">Login</button>
                </Link>
            </div>
        )
    }

    return(
        <div>
            <h3>Enter information to make a new order</h3>
            <OrderForm onAddOrder={addOrderToList} patients={patients}/>
            <br></br>
            <h2>Your current orders</h2>
            {ordersToDisplay}
        </div>
    )
}

export default Orders
import React, { useEffect,useState } from 'react'

function Order({order, onUpdate, onDelete}){

    const[updateOrder, setUpdateOrder] = useState(false)

    const[category, setCategory] = useState("")
    const[complete, setComplete] = useState(false)
    const[details, setDetails] = useState("")

    function handleSubmit(e){
        e.preventDefault()

        const formValues={
            category:category,
            complete:complete,
            details:details
        }

        fetch(`/api/orders/${order.id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(formValues),
        })
        .then(r=>{if(r.ok){
            r.json().then(updatedOrder=>onUpdate(updatedOrder))
        }})

    }

    function deleteOrder(e){
        console.log("in delete order")
        fetch(`/api/orders/${order.id}`,
        {
            method:"DELETE",
        })
        .then(r=>{if(r.ok){r.json()
            .then(()=>onDelete(order))
        }})
    }

    if(updateOrder){
        return(
            <div>
                <form className = "userForm" onSubmit = {handleSubmit}>
                    <label> Enter the type of Order</label>
                    <select onChange={(e)=>{setCategory(e.target.value)}}>
                        <option  
                            value={'medication'}
                            name={'medication'}
                        >
                            Medication
                        </option>
                        <option
                            value={'therapy'}
                            name={'therapy'}
                        >
                            Therapy
                        </option>
                        <option
                            value={'scan'}
                            name={'scan'}
                        >
                            Scan
                        </option>
                        <option
                            value={'test'}
                            name={'test'}
                        >
                            Test
                        </option>
                        <option
                            value={'other'}
                            name={'other'}
                        >
                            Other
                        </option>
                        <option
                            value={'labs'}
                            name={'labs'}
                        >
                            Labs
                        </option>
                        <option
                            value={'discontinue'}
                            name={'discontinue'}
                        >
                            Discontinue
                        </option>
                    </select>
                    <br></br>
                    <input
                        className="border-solid border-2 border-green-600 py-1 space-y-1"
                        type = "text"
                        name = "details"
                        value = {details}
                        onChange = {(e)=>{setDetails(e.target.value)}}
                    />
                    <br></br>
                    <label>Is the Order completed?</label>
                    <button onClick={e=>{setComplete(false)}}></button>
                    <br></br>
                    <button type="Submit" className="bg-green-200 hover:bg-emerald-900 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-300 hover:border-transparent rounded">Update Order</button>
                </form>
                <br></br>
                <button onClick={e=>{setUpdateOrder(false)}}>Cancel Update on Order</button>
                <button onClick={(e)=>deleteOrder}>Delete Order</button>
            </div>  
        )
    } 

    return(
        <div>
            <h2>{order.category}</h2>
            <p>{order.details}</p>
            <p>{order.timeStamp}</p>
            <br></br>
            <button onClick={(e)=>{setUpdateOrder(true)}}>Update Order</button>
            <button onClick={(e)=>{deleteOrder}}>Delete Order</button>
        </div>
    )
}

export default Order
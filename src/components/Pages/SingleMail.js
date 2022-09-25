import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const SingleMail = (props) => {
    const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);
    const endpoint = props.data.ID;
    // console.log(endpoint,'............')

    useEffect(() =>{
        fetch(`https://mail-box-121cf-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox/${endpoint}.json`,
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                isRead:true,
            })
            .then((res)=>{
                console.log(res,'.......res')
            }).then((data)=>{
                console.log(data,'......singlsdata')
            })
        })
    },[cleanUserEmail])
  return (
    <div>
    <button>Close</button>
    <h3>{props.data.email.from}</h3>
    <hr/>
    <h3>{props.data.email.heading}</h3>
    <hr/>
    <div dangerouslySetInnerHTML={{ __html: props.email.body}}/>
      
    </div>
  )
}

export default SingleMail

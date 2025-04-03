import React from 'react'

const LocationSearchPanel = (props) => {
    if(props.locations.length>0){
  return (
    <div>
        {   
            props.locations.map((ele,idx)=>{
                return(
                    <div key={idx} className="flex items-center justify-start gap-4 rounded-2xl p-3  my-4 border-3 border-gray-400 active:border-black" onClick={()=>{
                            
                props.setinput((res)=>{
                    if(props.activeInput){
                        return {...res,["pickup"]:ele}
                    }
                    else{
                        return {...res,["drop"]:ele}
                    }
                })
                        
                    }}>
            <h4 className="bg-[#eee] rounded">
            <i className="ri-map-pin-line"></i>
            </h4>
            <h2 className="text-base">{ele}</h2>
        </div>
                )
            })
}
    </div>
  )
}
else return <>
</>
}

export default LocationSearchPanel
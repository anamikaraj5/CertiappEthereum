import React from "react"
import { Link, useNavigate } from "react-router-dom"


const Nav = () => {
   
    return (
     
            <div className="flex justify-end gap-7 mr-[10px] text-3xl text-purple-950 pt-[20px]">
                    <Link to={'/home'} className="mt-1 mr-1 hover:bg-blue-400">View Certificate</Link>
                    <Link to={'/issue'} className="mt-1 mr-1 hover:bg-blue-400">Issue Certificate</Link>
                </div>


    )
}

export default Nav
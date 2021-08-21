import React from 'react'
import login from 'src/pages/Login';

function Lockout() {
    localStorage.clear();
    return (
        <div>
            <login />
        </div>
    )
}

export default Lockout

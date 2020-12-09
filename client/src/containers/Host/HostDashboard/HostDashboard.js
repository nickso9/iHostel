import React, { useContext } from 'react'
import HostContext from '../../../contexts/HostContext'

const HostDashboard = () => {
    const { host } = useContext(HostContext)
    console.log(host)
    return (
        <div>hihihi</div>
    )


}

export default HostDashboard
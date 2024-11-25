import './Notification.css'

function Notification(){
    return(
        <>
            <div className="notification-title"> Notifications  </div>

            {/* <ol className="notifications">
                <li className="notification_item">  5 More days until deadline for Microsoft </li>
                <li className="notification_item">  7 More days until deadline for Google </li>
                <li className="notification_item">  10 More days until deadline for Nvidia </li>
            </ol> */}

            <div className='notification-table-container'>
                <table>
                    <thead>
                        <tr>
                            <th> Message </th>
                            <th> Sent Notification </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> 
                            <td> 5 More days until deadline for Microsoft </td>
                            <td> 2 days ago </td>
                        </tr>
                        <tr> 
                            <td> 5 More days until deadline for Microsoft </td>
                            <td> 2 days ago </td>
                        </tr>
                        <tr> 
                            <td> 5 More days until deadline for Microsoft </td>
                            <td> 2 days ago </td>
                        </tr>
                    
                    </tbody>
                </table>
                

            </div>
        </>
    )

}

export default Notification
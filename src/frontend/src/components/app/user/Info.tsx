import React, {useEffect, useState} from "react";
import axios from "axios";


type userData = {
    id: number,
    name: string,
    email: string,
}


// export function UserUpdate() {
//     return (
//         <>
//             <div>
//                 User Update Page
//             </div>
//         </>
//     )
// }
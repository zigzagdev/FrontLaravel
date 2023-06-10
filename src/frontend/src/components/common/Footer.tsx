import React from 'react';
import {Link} from 'react-router-dom'

export default function Footer() {
    return(
        <>
            <div className="my-10 xxs:flex-col xxs:justify-center xxs:items-center flex justify-end px-10">
                <Link to='/Contact' className='text-black-500 xxs:text-gray-500 xxs:py-3'>
                    Contact
                </Link>
                <Link to='/Instagram' className='text-black-500 px-12 xxs:text-gray-500 xxs:py-3'>
                    Instagram
                </Link>
                <Link to='/' className='text-black-500 xxs:text-gray-500 xxs:py-3'>
                    TopPage
                </Link>
            </div>
        </>
    )
}
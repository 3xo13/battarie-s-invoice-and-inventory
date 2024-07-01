import React from 'react'
import Image from 'next/image'

const Loading = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Image
                src={"/img/icons/time.png"}
                width={50}
                height={50}
                alt='loading'
								className='w-14 h-14 object-center animate-spin'/>
        </div>
    )
}

export default Loading
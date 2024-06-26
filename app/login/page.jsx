'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const router = useRouter()
    const [password, setPassword] = useState('');
		const handleLogin = async () => {
			const data = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({password})
            });

            const result = await data.json();
            if (result.success) {
                router.push("/sales")
            }else{
                console.log(result.fetching_error);
            }
			
		}
    return (
        <div
            className='min-w-screen min-h-screen flex flex-col items-center px-32 py-10'>
            <div className=''>
                <Image
                    src={"/img/Invoice-and-Inventory-logos_white.png"}
                    width={200}
                    height={200}
                    alt='logo'
                    className=''/>
            </div>
            <div className='w-72 flex flex-col gap-5'>
                    <input
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='text-black'/>
                    <button className="btn bg-green-400" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default LoginPage
import React from 'react'
import logo6 from '../../assets/logo6.png'


const Footer = () => {
  return (
    <footer className='w-full bg-violet-700 px-4 text-white pt-8 flex flex-col md:flex-row flex-wrap justify-between md:px-12'>
        <div>
            <img className='w-40 h-40 flex' src={logo6} alt="" />
        </div>
        <div>
            <h2 className='font-bold text-xl mt-4'>QUICK LINKS</h2>
            <div className='w-32 h-1 border-b-2 border-yellow-400 rounded-2xl my-2'></div>
            <div>
            <p>University Website wbut.ac.in</p>
            <p>University Website makautexam.net</p>
            <p>CSEMOODLE: csemoodle.tint.edu.in</p>
            <p>Grievance Redressal Portal</p>
            <p>Official Facebook Page</p>
            </div>
        </div>

        <div>
            <h2 className='font-bold text-xl mt-4'>CONTACT</h2>
            <div className='w-32 h-1 border-b-2 border-yellow-400 rounded-2xl my-2'></div>
            <div>
            <p>Techno International New Town</p>
            <p>Block - DG 1/1, Action Area 1</p>
            <p>New Town, Rajarhat, Kolkata - 700156</p>
            <p>Phone: +91-33-23242050/2091</p>
            <p>e-mail: info@tict.edu.in</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
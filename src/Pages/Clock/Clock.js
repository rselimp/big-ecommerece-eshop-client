import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()
    let interval;
    const countDown = () =>{
        const destination = new Date('November 8 ,2023').getTime()
        interval = setInterval (() =>{
            const now = new Date().getTime()
            const different = destination - now;
            const days = Math.floor(different / (1000 *60*60*24))
            const hours = Math.floor(different % (1000*60*60*24) /(1000*60*60))
            const minutes = Math.floor(different %(1000*60*60)/(1000*60))
            const seconds = Math.floor(different %(1000*60)/(1000))
            if(destination<0 ) clearInterval(interval.current)
            else{
                setDays(days)
                setHours(hours)
                setMinutes(minutes)
                setSeconds(seconds)
            }

        })
    }

    useEffect( ()=>{
        countDown()
    })

    return (
        <div className='flex text-xl'>
          
          <div className='flex gap-5 items-center'>
          <div className='text-center'>
                <h1>{days}</h1>
                <h5>Days</h5>
            </div>
            <span>:</span>
          </div>
            
            <div className='flex gap-5 items-center'>
            <div className='ml-4 text-center'>
                <h1>{hours}</h1>
                <h5>Hours</h5>
            </div>
            <span>:</span>
            </div>
            <div className='flex gap-5 items-center'>
            <div className='ml-4 text-center'>
                <h1>{minutes}</h1>
                <h5>Minute</h5>
            </div>
            <span>:</span>
            </div>
            <div className='ml-4 text-center'>
                <h1>{seconds}</h1>
                <h5>Seconds</h5>
            </div>
          
        </div>
    );
};

export default Clock;
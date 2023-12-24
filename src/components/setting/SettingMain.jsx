import React from 'react'

const SettingMain = () => {
    return (
        <div className='main-setting lg:w-[370px] m-auto'>
            <h2 className='text-[#FF6900] mb-10 max-md:mb-8 max-lg:text-center'>Setting</h2>
            <div className='flex flex-col space-y-5'>
                <div className="flex">
                    <div className="div">
                        <h4>Auto Start</h4>
                        <p>Automatically start next focus or break after previous one ends.</p>
                    </div>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="flex">
                    <div className="div">
                        <h4>Focus (min)</h4>
                        <p>Duration of the focus period in minutes</p>
                    </div>
                    <span>25</span>
                </div>
                <div className="flex">
                    <div className="div">
                        <h4>Short Break (min)</h4>
                        <p>Duration of the short break between pomodoros in minutes</p>
                    </div>
                    <span>5</span>
                </div>
                <div className="flex">
                    <div className="div">
                        <h4>Long Break</h4>
                        <p>Duration of the long break between cycles in minutes</p>
                    </div>
                    <span>15</span>
                </div>
                <div className="flex">
                    <div className="div">
                        <h4>Cycle Count</h4>
                        <p>Number of cycles to work before long break</p>
                    </div>
                    <span>4</span>
                </div>

                <button className='text-white font-semibold'>Save Changes</button>
            </div>
        </div>
    )
}

export default SettingMain

import GoBackBtn from '@/components/button/GoBackBtn'
import Link from 'next/link'
import React from 'react'
import { Urbanist } from 'next/font/google'

const urban = Urbanist({ subsets: ['latin'] })

const EditAddTask = ({ method }) => {

    return (
        <section className='task-edit'>
            <div className="addconatiner 2xl:px-5 lg:px-14 md:px-10 sm:px-6 max-sm:px-3">
                <div className="back-button">
                    <Link href={'/home'} className='text-[30px] font-bold'>
                        <GoBackBtn />
                    </Link>
                </div>
                <div className="task-edit-inner mt-[-40px]">
                    <h2>
                        {method === 'edit' ? 'Edit Task' : ''}
                        {method === 'add' ? 'New Task' : ''}
                    </h2>
                    <form className={urban.className} action="#" method='post'>
                        <h4>Task Name</h4>
                        <input type="text" placeholder='WorkOut' />
                        <p>Task Priority</p>
                        <div className="task-lvl-btn">
                            <button>Hign</button>
                            <button>Medium</button>
                            <button>Low</button>
                        </div>
                        <h4>Task Description</h4>
                        <textarea className='h-[152px]' name="" id="" rows="10" placeholder='Add Task Description'></textarea>

                        <button className='submit-btn'>
                            {method === 'edit' ? 'Update Task' : ''}
                            {method === 'add' ? 'Add New Task' : ''}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditAddTask

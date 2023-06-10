import React from 'react'

export default function Landing() {
  return (
    <div className="bg-dark h-full w-full z-0">
    
      <nav class="bg-dark w-full z-20 top-0 left-0 text-white">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center">
              <img src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/r8cwveuu3z-8%3A9?alt=media&token=1bf4f878-9242-4cf5-a61f-576db78653a3" class="h-8 mr-3" alt="Flowbite Logo">
              </img>
              <span class="self-center text-2xl font-semibold whitespace-nowrap font-syne">Just Sing</span>
          </a>
          <div class="flex md:order-2">
              <button type="button" class="text-white bg-blight hover:bg-blurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Get started</button>
              <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-dark md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white rounded md:text-blight md:p-0" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray rounded md:hover:text-blurple md:p-0">About</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray rounded md:hover:text-blurple md:p-0">Services</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray rounded md:hover:text-blurple md:p-0">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='header' class='bg-dark'>
        <img src='https://media.discordapp.net/attachments/1114923085540364339/1116944695143178270/black-microphone-clipart-xl.png?width=872&height=1054' class='fixed left-1/2'>
        </img>
        <div>
          <div class="h-screen flex items-center justify-center">
            <div class="mx-2 text-center">
              <h1 className="title" class='text-white font-extrabold text-4xl xs:text-5xl md:text-6xl'>Just Sing</h1>
              <h2 className="subtitle" class='text-white font-regular text-1xl xs:text-2xl md:text-3xl leading-tight flex w-1/2 mx-1/2'>
                Improve your vocal abilities and English speaking through song
              </h2>
            </div>
          </div>
        
        </div>

      </div>
    </div>
  )
}



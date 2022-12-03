import {Link} from 'react-router-dom'
function NotFound() {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center md:divide-x-2">
            <p className="mr-auto md:mr-0 text-indigo-700 font-bold text-3xl md:text-4xl lg:text-5xl">404</p>
            <div className="md:p-4">
            <h1 className="text-ld font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Page not Found</h1>
            <p className="pt-2 text-gray-400 dark:text-gray-200">Sorry,we couldn't find the page you're looking for.</p>
            </div>
        </div>
        <Link
        to="/"
        className="bttn-4 bttn-secondary mt-8"
        >
        Back Home
        </Link>
    </div>
  )
}

export default NotFound
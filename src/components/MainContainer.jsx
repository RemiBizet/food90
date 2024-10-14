import ImageSlider from "./ImageSlider";
import { Link } from 'react-router-dom';

// Main Container below the Header
export default function MainContainer(props) {

    return (

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Text and Button on the left */}
        <div className="flex flex-col ml-14">
            <p className="text-7xl font-bold mb-4 w-1/2">All the best food of your city in a few clicks !</p>
            
           
            <Link to="/Dishes">
                <button
                    className="mt-4 w-64 bg-black text-white px-6 py-4 text-xl rounded-lg"
                >
                    Order Now!
            </button>
            </Link>

        </div>

            {/* Image Slider on the right */}
            <div className="mt-6 md:mt-0 mr-14 rounded-lg">
                <ImageSlider />
            </div>
        </div>
    )

}
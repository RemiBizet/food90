import ImageSlider from "./ImageSlider";

export default function MainContainer(props) {
    return (
    <div>
    <p className="text-lg font-bold mb-2">All the delicious Food in your City, <u>in a few clicks</u>!</p>
    <ImageSlider className="relative right"></ImageSlider>
    </div>
    )
}
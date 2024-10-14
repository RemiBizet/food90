import { useStateValue} from "../context/StateProvider";

// Component displaying the products
export default function ProductsContainer({products}){

  const [{ user }, dispatch] = useStateValue();

  // Adding an item to the cart using username and the wanted item
  const addItemToCart = async (item, username) => {
    try {
        const response = await fetch(`http://localhost:5000/api/cart/add`, {
            method: 'POST',
            body: JSON.stringify({ username, item }),
        });

        const data = await response.json();

        dispatch({
          type: 'SET_CART_ITEMS',
          payload: data.cart
        });

        console.log('Item added to cart:', item);

    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};

  return (
      <div className="grid grid-cols-3 gap-4">
          {products.map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">

                  <img
                      src={product.image}
                      alt={`Product ${index}`}
                      className="object-cover w-full h-48 mb-4"
                  />

                  <div className="mb-4">
                      <p className="text-gray-600">{product.title}</p>
                      <p className="text-gray-600">{product.price} Euros</p>
                  </div>

                  {/* Add to cart button */}
                  <button
                      className="bg-black text-white px-4 py-2 rounded"
                      onClick={() => addItemToCart(product, user.username)}
                  >
                      Add to Cart
                  </button>
              </div>
          ))}
      </div>
  );

}
export default function ProductsContainer({products}){
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
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      );
}
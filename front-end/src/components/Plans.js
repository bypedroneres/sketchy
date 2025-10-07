import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import "./Plans.css";

function Plans() {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('active', '==', true));
      const querySnapshot = await getDocs(q);

      const productsData = {};
      for (const productDoc of querySnapshot.docs) {
        productsData[productDoc.id] = productDoc.data();

        const pricesRef = collection(productDoc.ref, 'prices');
        const priceSnap = await getDocs(pricesRef);

        priceSnap.forEach((price) => {
          productsData[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      }

      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <div className='Plans'>
      {Object.entries(products).map(([productId, product]) => (
        <div key={productId} className="plan">
          <h3>{product.name}</h3>
          {product.description && <p>{product.description}</p>}
          {product.prices && (
            <p>
              Price: {product.prices.priceData.unit_amount / 100}{" "}
              {product.prices.priceData.currency.toUpperCase()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Plans;

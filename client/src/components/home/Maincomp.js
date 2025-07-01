import { Divider } from '@mui/material';
import React, { useEffect } from 'react';
import Banner from './Banner';
import Slide from './Slide';
import './home.css';
import { getProducts } from '../redux/actions/action';
import { useSelector, useDispatch } from 'react-redux';

const Maincomp = () => {
  const { products } = useSelector((state) => state.getproductsdata);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const isProductsAvailable = Array.isArray(products) && products.length > 0;

  return (
    <>
      <div className="home_section">
        {/* Banner */}
        <div className="banner_part">
          <Banner />
        </div>

        {/* Top Deals Section */}
        <div className="slide_part">
          <div className="left_slide">
            {isProductsAvailable && (
              <Slide title="Deal Of The Day" products={products} />
            )}
          </div>
          <div className="right_slide">
            <h4>Festive latest launches</h4>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg"
              alt="Festive Launches"
            />
            <a href="#">See more</a>
          </div>
        </div>

        {/* Other Slide Rows */}
        {isProductsAvailable && (
          <>
            <Slide title="Today's Deal" products={products} />
            <div className="center_img">
              <img
                src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
                alt="Center Offer"
              />
            </div>
            <Slide title="Best Seller" products={products} />
            <Slide title="Upto 80% off" products={products} />
          </>
        )}
      </div>

      <Divider />
    </>
  );
};

export default Maincomp;

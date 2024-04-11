import React from "react";
import "./Offers.css";
const Offers = () => {
  return (
    <>
      <div className="flex-container">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h3 className="refer">Order for More than &#8377;3000</h3>
              <p>&</p>
              <h4 className="refer">Get instant 60% Discount</h4>
              <h4 className="refer">
                Coupon Code: <span style={{ color: "green" }}>ENJOY60</span>
              </h4>
              <button className="ordernow_btn ordernow_btn1">Refer Now</button>
            </div>
            <div className="flip-card-back">
              {/* <img src="https://png.pngitem.com/pimgs/s/580-5808480_clip-art-hd-png-download.png" alt="Avatar" style={{width:"200px",height:"200px"}}/> */}
              <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/110cdeba-5d07-4fe8-bc0d-91f2001e110f/decdgm2-ecc9b0c0-c8f1-4c30-b1ff-1d31e6dcf94c.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzExMGNkZWJhLTVkMDctNGZlOC1iYzBkLTkxZjIwMDFlMTEwZlwvZGVjZGdtMi1lY2M5YjBjMC1jOGYxLTRjMzAtYjFmZi0xZDMxZTZkY2Y5NGMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.aJfS2IOjJjjYv9iSctlbLOdqvjhcllGsSzLdbUqnGqI"
                alt="Avatar"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src="https://www.pngitem.com/pimgs/m/123-1232870_30-discount-0-hd-png-download.png"
                alt="Avatar"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <div className="flip-card-back">
              <img
                src="https://png.pngtree.com/png-clipart/20220102/original/pngtree-happy-hour-specials-lettering-png-image_6989362.png"
                alt="Avatar"
                style={{ width: "200px", height: "200px" }}
              />
              <button className="ordernow_btn">Order Now</button>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner mt-5">
            <div className="flip-card-front">
              <img
                src="./offer.png"
                alt="Avatar"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <div className="flip-card-back">
              <img
                src="https://png.pngtree.com/png-clipart/20220510/original/pngtree-special-offer-50-off-sale-and-discount-banner-png-image_7694958.png"
                alt="Avatar"
                style={{ width: "200px", height: "200px" }}
              />
              <button className="ordernow_btn">Order Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Offers;

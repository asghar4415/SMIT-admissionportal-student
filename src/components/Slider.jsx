import "./Slider.css";

const imgs = [
 
  "https://framerusercontent.com/images/WzRaxWDACs4qY8sMp2YKuWvuOc.jpeg",
  "https://framerusercontent.com/images/mQhnn4Bboa0CI4CCFgnqYv62QA.jpeg",
  "https://framerusercontent.com/images/DK0JHY64ld5iroWptIW0LPbL5sQ.jpeg",
  "https://framerusercontent.com/images/yWMyRINcJBnMUfOegNYcMEaWkMs.jpeg",
  "https://framerusercontent.com/images/NIaYJxjns3DgmzIHQ1ZB6d1P20Y.jpg",
  "https://framerusercontent.com/images/WzRaxWDACs4qY8sMp2YKuWvuOc.jpeg",
  "https://framerusercontent.com/images/mQhnn4Bboa0CI4CCFgnqYv62QA.jpeg",
  "https://framerusercontent.com/images/DK0JHY64ld5iroWptIW0LPbL5sQ.jpeg",
  "https://framerusercontent.com/images/yWMyRINcJBnMUfOegNYcMEaWkMs.jpeg",
  "https://framerusercontent.com/images/NIaYJxjns3DgmzIHQ1ZB6d1P20Y.jpg",
  "https://framerusercontent.com/images/WzRaxWDACs4qY8sMp2YKuWvuOc.jpeg",
  "https://framerusercontent.com/images/mQhnn4Bboa0CI4CCFgnqYv62QA.jpeg",
  "https://framerusercontent.com/images/yWMyRINcJBnMUfOegNYcMEaWkMs.jpeg",
  "https://framerusercontent.com/images/NIaYJxjns3DgmzIHQ1ZB6d1P20Y.jpg",
  "https://framerusercontent.com/images/WzRaxWDACs4qY8sMp2YKuWvuOc.jpeg",
  "https://framerusercontent.com/images/mQhnn4Bboa0CI4CCFgnqYv62QA.jpeg",
  "https://framerusercontent.com/images/yWMyRINcJBnMUfOegNYcMEaWkMs.jpeg",
  "https://framerusercontent.com/images/NIaYJxjns3DgmzIHQ1ZB6d1P20Y.jpg",
  "https://framerusercontent.com/images/WzRaxWDACs4qY8sMp2YKuWvuOc.jpeg",
  "https://framerusercontent.com/images/mQhnn4Bboa0CI4CCFgnqYv62QA.jpeg",
];

const Slider = () => {
  return (
    <section className="slide-option">
      <div id="infinite" className="highway-slider">
        <div className="container highway-barrier">
          <ul className="highway-lane gap-x-3">
            {imgs.map((img, index) => {
              return (
                <li
                  key={index}
                  className="rounded-2xl highway-car lg:h-[10rem] xl:h-[12rem] overflow-hidden"
                >
                  <span className="relative block w-full h-full">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-0 left-0 w-full h-full bg-blue-500 bg-opacity-40"></span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Slider;

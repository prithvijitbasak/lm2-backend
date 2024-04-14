export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Landing page</p>
              <h1>Welcome to the fullstack landing page</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus,
                praesentium nam aspernatur corrupti eligendi perspiciatis.
                Laborum tempora, necessitatibus quas eum eius minima, architecto
                quos pariatur aspernatur beatae molestias modi ab!
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">Connect Now</button>
                </a>
                <a href="/service">
                  <button className="btn secondary-btn">Learn More</button>
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/reg1.png"
                alt="coding altogether"
                width={500}
                height={500}
              />
            </div>
          </div>
        </section>
      </main>
      <section className="section-analytics">
        <div className="container grid grid-four-cols">
          <div className="div1">
            <h2>50+</h2>
            <p>Registered Companies</p>
          </div>
          <div className="div2">
            <h2>50+</h2>
            <p>Registered Companies</p>
          </div>
          <div className="div3">
            <h2>50+</h2>
            <p>Registered Companies</p>
          </div>
          <div className="div4">
            <h2>50+</h2>
            <p>Registered Companies</p>
          </div>
        </div>
      </section>
    </>
  );
};

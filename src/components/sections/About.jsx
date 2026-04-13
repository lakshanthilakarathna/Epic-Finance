import Image from "next/image";
import Link from "next/link";
import Content from "../../data/sections/about.json";

const AboutSection = () => {
    return (
      <section className="mil-about mil-p-120-60">
        <div className="mil-deco" style={{ top: 0, right: "10%" }} />
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-5 col-xl-5">
              <div className="mil-about-illustration mil-mb-60">
                <div className="mil-image-frame mil-about-main-photo">
                  <Image
                    src={Content.image}
                    alt={Content.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="mil-about-fill-image"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div className="mil-window">
                  <ul className="mil-speakers">
                    {Content.speakers.map((item, key) => (
                    <li className="mil-speaker" key={`speaker-${key}`}>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="50px"
                        className="mil-about-speaker-image"
                        style={{ objectFit: "cover" }}
                      />
                    </li>
                    ))}
                  </ul>
                  <div className="mil-window-bottom">
                    <h3>{Content.rating.value}</h3>
                    <div>
                      <ul className="mil-stars">
                        <li>
                          <i className="fas fa-star" />
                        </li>
                        <li>
                          <i className="fas fa-star" />
                        </li>
                        <li>
                          <i className="fas fa-star" />
                        </li>
                        <li>
                          <i className="fas fa-star" />
                        </li>
                        <li className="mil-empty">
                          <i className="fas fa-star" />
                        </li>
                      </ul>
                      <p className="mil-text-sm">{Content.rating.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-6">
              <span className="mil-suptitle mil-suptitle-2 mil-mb-30">
                {Content.subtitle}
              </span>
              <h2 className="mil-mb-30">{Content.title}</h2>
              <p className="mil-mb-30">
                {Content.text}
              </p>
              {Content.text2 && (
                <p className="mil-mb-30">
                  {Content.text2}
                </p>
              )}
              {Content.list?.length > 0 && (
                <ul className="mil-simple-list mil-mb-60">
                  {Content.list.map((item, key) => (
                  <li key={`about-list-${key}`}>{item.value}</li>
                  ))}
                </ul>
              )}
              <Link href="/about" className="mil-button mil-accent-bg">
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>        
    );
};

export default AboutSection;
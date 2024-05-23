import React from "react";

const togglerSize = "40px";
const togglerColor = "white";
const togglerTransition = "transform 0.5s, top 0.5s";

const itemCount = 6;
const itemSize = `${parseInt(togglerSize) * 2}px`;

const Menu = () => {
  // 링크 주소와 아이콘 클래스를 매핑한 객체
  const links = {
    facebook: "https://www.facebook.com/",
    google: "https://www.google.com/",
    dribbble: "https://dribbble.com/",
    codepen: "https://codepen.io/",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
  };

  return (
    <div
      style={{
        overflow: "hidden",
        background: "linear-gradient(to right, #fc354c, #0abfbc)",
      }}
    >
      <nav className="menu">
        <input
          id="menu-toggler"
          className="menu-toggler"
          type="checkbox"
          defaultChecked
        />
        <label htmlFor="menu-toggler"></label>
        <ul>
          {Object.entries(links)
            .slice(0, itemCount)
            .map(([name, url], index) => (
              <li key={index} className="menu-item">
                <a
                  className={`fa fa-${name}`}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener" // 보안을 위해 추가
                  style={{
                    color: togglerColor, // togglerColor 변수를 직접 사용하도록 수정
                    transition: togglerTransition, // togglerTransition 변수를 직접 사용하도록 수정
                    fontSize: itemSize, // itemSize 변수를 직접 사용하도록 수정
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
                  {/* 첫 문자 대문자로 변환 */}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;

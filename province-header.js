
(function () {
  "use strict";

  const config = {
    home: "index.html",
    regions: "regions.html",
    gallery3d: "gallery-3d.html",
    exhibitionPhotos: "hezar-rang-cinematic-entry-final.html"
  };

  const provinces = [
    { name: "قزوین", en: "Qazvin", url: "qazvin.html" },
    { name: "گیلان", en: "Gilan", url: "gilan.html" },
    { name: "مازندران", en: "Mazandaran", url: "mazandaran.html" },
    { name: "گلستان", en: "Golestan", url: "golestan.html" },
    { name: "سمنان", en: "Semnan", url: "semnan.html" },
    { name: "خراسان شمالی", en: "North Khorasan", url: "north-khorasan.html" },
    { name: "خراسان جنوبی", en: "South Khorasan", url: "south-khorasan.html" },
    { name: "سیستان و بلوچستان", en: "Sistan and Baluchestan", url: "sistan-baluchestan.html" },
    { name: "هرمزگان", en: "Hormozgan", url: "hormozgan.html" },
    { name: "کرمان", en: "Kerman", url: "kerman.html" },
    { name: "یزد", en: "Yazd", url: "yazd.html" },
    { name: "اصفهان", en: "Isfahan", url: "isfahan.html" },
    { name: "فارس", en: "Fars", url: "fars.html" },
    { name: "بوشهر", en: "Bushehr", url: "bushehr.html" },
    { name: "کهگیلویه و بویراحمد", en: "Kohgiluyeh and Boyer-Ahmad", url: "kohgiluyeh.html" },
    { name: "چهارمحال و بختیاری", en: "Chaharmahal and Bakhtiari", url: "chaharmahal.html" },
    { name: "خوزستان", en: "Khuzestan", url: "khuzestan.html" },
    { name: "ایلام", en: "Ilam", url: "ilam.html" },
    { name: "لرستان", en: "Lorestan", url: "lorestan.html" },
    { name: "اراک", en: "Arak", url: "arak.html" },
    { name: "کاشان", en: "Kashan", url: "kashan.html" },
    { name: "همدان", en: "Hamedan", url: "hamedan.html" },
    { name: "کرمانشاه", en: "Kermanshah", url: "kermanshah.html" },
    { name: "کردستان", en: "Kurdistan", url: "kurdistan.html" },
    { name: "ارومیه", en: "Urmia", url: "urmia.html" },
    { name: "تبریز", en: "Tabriz", url: "tabriz.html" },
    { name: "اردبیل", en: "Ardabil", url: "ardabil.html" },
    { name: "زنجان", en: "Zanjan", url: "zanjan.html" },
    { name: "تهران", en: "Tehran", url: "tehran.html" }
  ];

  const currentFile = location.pathname.split("/").pop().toLowerCase();
  const index = provinces.findIndex(p => p.url === currentFile);

  if (index < 0) return;

  const current = provinces[index];
  const previous = provinces[(index - 1 + provinces.length) % provinces.length];
  const next = provinces[(index + 1) % provinces.length];

  const style = document.createElement("style");
  style.textContent = `
    .ir-header {
      position: sticky;
      top: 0;
      z-index: 999;
      background: #fffaf0;
      border-bottom: 1px solid #dfd2b9;
      box-shadow: 0 5px 20px #49351a12;
      font-family: Tahoma, Arial, sans-serif;
    }
    .ir-header *, .ir-header *::before, .ir-header *::after {
      box-sizing: border-box;
    }
    .ir-header .ir-topline {
      height: 5px;
      background: linear-gradient(90deg,#245b60,#b08b48,#b94e27);
    }
    .ir-header .ir-main {
      max-width: 1240px;
      margin: auto;
      padding: 12px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .ir-header .ir-brand {
      color: #245b60;
      font-size: 19px;
      font-weight: bold;
      text-decoration: none;
      white-space: nowrap;
    }
    .ir-header .ir-menu {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 18px;
    }
    .ir-header a {
      color: #292b25;
      text-decoration: none;
      font-size: 13px;
    }
    .ir-header a:hover {
      color: #b94e27;
    }
    .ir-header .ir-dropdown {
      position: relative;
    }
    .ir-header .ir-dropbtn,
    .ir-header .ir-language {
      border: 1px solid #b08b48;
      border-radius: 22px;
      padding: 7px 13px;
      background: #fffaf0;
      color: #245b60;
      cursor: pointer;
      font: inherit;
      font-size: 13px;
    }
    .ir-header .ir-dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      right: 0;
      min-width: 210px;
      padding: 8px;
      background: #fffaf0;
      border: 1px solid #dfd2b9;
      border-radius: 12px;
      box-shadow: 0 10px 25px #0002;
    }
    .ir-header .ir-dropdown.open .ir-dropdown-menu {
      display: block;
    }
    .ir-header .ir-dropdown-menu a {
      display: block;
      padding: 9px;
      border-radius: 7px;
    }
    .ir-header .ir-dropdown-menu a:hover {
      background: #efe4d0;
    }
    .ir-header .ir-province-nav {
      background: #245b60;
      color: white;
      padding: 9px 12px;
    }
    .ir-header .ir-province-inner {
      max-width: 1240px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .ir-header .ir-province-inner a,
    .ir-header .ir-province-inner span {
      color: white;
      border: 1px solid #ffffff55;
      border-radius: 20px;
      padding: 5px 11px;
      white-space: nowrap;
      font-size: 12px;
    }
    .ir-header .ir-fa,
    .ir-header .ir-en {
      display: none;
    }
    .ir-header[data-lang="fa"] .ir-fa {
      display: inline;
    }
    .ir-header[data-lang="en"] .ir-en {
      display: inline;
    }
    .ir-header[data-lang="en"] .ir-main,
    .ir-header[data-lang="en"] .ir-menu,
    .ir-header[data-lang="en"] .ir-province-inner {
      direction: ltr;
    }
    .ir-header[data-lang="en"] .ir-dropdown-menu {
      right: auto;
      left: 0;
    }
    @media(max-width:800px) {
      .ir-header .ir-main {
        flex-wrap: wrap;
        justify-content: center;
        padding: 10px 12px;
        gap: 10px;
      }
      .ir-header .ir-menu {
        width: 100%;
        gap: 12px;
      }
      .ir-header .ir-brand {
        font-size: 16px;
      }
    }
    @media(max-width:520px) {
      .ir-header .ir-menu {
        overflow-x: auto;
        flex-wrap: nowrap;
        justify-content: flex-start;
        padding: 5px 0;
      }
      .ir-header .ir-province-inner {
        overflow-x: auto;
        flex-wrap: nowrap;
        justify-content: flex-start;
      }
    }
  `;
  document.head.appendChild(style);

  const header = document.createElement("div");
  header.className = "ir-header";
  header.dataset.lang = "fa";

  header.innerHTML = `
    <div class="ir-topline"></div>
    <div class="ir-main">
      <a class="ir-brand" href="${config.home}">
        <span class="ir-fa">✺ ایران، هزار رنگ</span>
        <span class="ir-en">✺ Iran, a Thousand Colors</span>
      </a>

      <nav class="ir-menu">
        <div class="ir-dropdown">
          <button class="ir-dropbtn" type="button">
            <span class="ir-fa">صفحه اصلی⌄</span>
            <span class="ir-en">Home⌄</span>
          </button>
          <div class="ir-dropdown-menu">
            <a href="${config.regions}">
              <span class="ir-fa">معرفی مناطق</span>
              <span class="ir-en">Explore Regions</span>
            </a>
            <a href="${config.gallery3d}">
              <span class="ir-fa">گالری سه‌بعدی</span>
              <span class="ir-en">3D Gallery</span>
            </a>
            <a href="${config.exhibitionPhotos}">
              <span class="ir-fa">تصاویر نمایشگاه حضوری</span>
              <span class="ir-en">Exhibition Photos</span>
            </a>
          </div>
        </div>

        <a href="#" data-pending="about">
          <span class="ir-fa">درباره نمایشگاه</span>
          <span class="ir-en">About</span>
        </a>
        <a href="#" data-pending="team">
          <span class="ir-fa">عوامل پروژه</span>
          <span class="ir-en">Project Team</span>
        </a>
        <a href="#" data-pending="contact">
          <span class="ir-fa">تماس با ما</span>
          <span class="ir-en">Contact</span>
        </a>
      </nav>

      <button class="ir-language" type="button">EN</button>
    </div>

    <nav class="ir-province-nav">
      <div class="ir-province-inner">
        <a href="${previous.url}">
          <span class="ir-fa">← شهر قبلی: ${previous.name}</span>
          <span class="ir-en">← Previous: ${previous.en}</span>
        </a>
        <span>
          <span class="ir-fa">${index + 1} از ۲۹ | ${current.name}</span>
          <span class="ir-en">${index + 1} of 29 | ${current.en}</span>
        </span>
        <a href="${next.url}">
          <span class="ir-fa">شهر بعدی: ${next.name} →</span>
          <span class="ir-en">Next: ${next.en} →</span>
        </a>
      </div>
    </nav>
  `;

  document.body.insertBefore(header, document.body.firstChild);

  const languageButton = header.querySelector(".ir-language");
  const dropdown = header.querySelector(".ir-dropdown");

  languageButton.addEventListener("click", function () {
    const english = header.dataset.lang !== "en";
    header.dataset.lang = english ? "en" : "fa";
    languageButton.textContent = english ? "فارسی" : "EN";
  });

  dropdown.querySelector(".ir-dropbtn").addEventListener("click", function () {
    dropdown.classList.toggle("open");
  });

  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
    }
  });
})();

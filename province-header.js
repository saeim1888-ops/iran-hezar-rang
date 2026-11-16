
(() => {
  "use strict";

  if (document.querySelector(".ir-shared-header")) return;

  const currentPage = location.pathname.split("/").pop() || "index.html";

  const isEnglish = () =>
    (document.documentElement.lang || "").toLowerCase().startsWith("en") ||
    document.documentElement.dir === "ltr";

  const links = [
    {
      fa: "صفحه اصلی",
      en: "Home",
      href: "index.html",
      children: [
        { fa: "صفحه مناطق | استان‌ها", en: "Regions | Provinces", href: "regions.html" },
        { fa: "گالری سه‌بعدی", en: "3D Gallery", href: "gallery-3d.html" },
        { fa: "گالری حضوری", en: "Physical Exhibition", href: "hezar-rang-cinematic-entry-final.html" }
      ]
    },
    { fa: "درباره نمایشگاه", en: "About the Exhibition", href: "regions.html#about" },
    { fa: "عوامل پروژه", en: "Project Team", href: "regions.html#team" },
    { fa: "تماس با ما", en: "Contact Us", href: "regions.html#contact" }
  ];

  const style = document.createElement("style");
  style.textContent = `
    .ir-shared-header {
      position: relative;
      z-index: 1000;
      width: 100%;
      min-height: 72px;
      padding: 10px clamp(16px, 4vw, 55px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 22px;
      direction: rtl;
      background: #ead4b0;
      border-bottom: 3px solid #963c25;
      box-shadow: 0 4px 16px rgba(57,46,36,.10);
      font-family: Vazirmatn, Tahoma, sans-serif;
      box-sizing: border-box;
    }

    .ir-shared-header *,
    .ir-shared-header *::before,
    .ir-shared-header *::after {
      box-sizing: border-box;
    }

    .ir-header-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #153f3b;
      text-decoration: none;
      font-size: 16px;
      font-weight: 800;
      white-space: nowrap;
      flex: 0 0 auto;
    }

    .ir-header-mark {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: #fff4df;
      background: #963c25;
      border: 2px solid #c79a4a;
      font-size: 21px;
    }

    .ir-header-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(12px, 1.8vw, 25px);
      flex: 1 1 auto;
      min-width: 0;
    }

    .ir-header-nav a {
      color: #153f3b;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
      transition: color .2s ease, background .2s ease;
    }

    .ir-header-nav a:hover {
      color: #963c25;
    }

    .ir-header-home {
      position: relative;
    }

    .ir-header-home > a {
      display: block;
      padding: 12px 3px;
    }

    .ir-header-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      min-width: 220px;
      display: none;
      flex-direction: column;
      padding: 8px;
      background: #fff8eb;
      border: 1px solid #c79a4a;
      border-radius: 11px;
      box-shadow: 0 10px 25px rgba(57,46,36,.17);
    }

    .ir-header-home:hover .ir-header-dropdown,
    .ir-header-home:focus-within .ir-header-dropdown {
      display: flex;
    }

    .ir-header-dropdown a {
      padding: 11px;
      border-radius: 7px;
    }

    .ir-header-dropdown a:hover {
      background: #f0dfc1;
    }

    .ir-header-nav a.ir-header-contact {
      padding: 10px 17px;
      border-radius: 22px;
      background: #c18d3d;
      color: #153f3b;
      border: 1px solid #a9782f;
    }

    .ir-header-nav a.ir-header-contact:hover {
      background: #b47b2c;
      color: #fff8eb;
    }

    .ir-header-language {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      margin-inline-start: 4px;
    }

    .ir-header-language .language,
    .ir-header-language #langToggle,
    .ir-header-language #langBtn,
    .ir-header-language #langSwitch,
    .ir-header-language #languageToggle {
      position: static !important;
      inset: auto !important;
      margin: 0 !important;
      transform: none !important;
    }

    .ir-header-menu-button {
      display: none;
      width: 42px;
      height: 40px;
      padding: 7px;
      border: 1px solid #c79a4a;
      border-radius: 9px;
      background: #fff4df;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      cursor: pointer;
    }

    .ir-header-menu-button span {
      display: block;
      width: 21px;
      height: 2px;
      border-radius: 3px;
      background: #153f3b;
    }

    .ir-province-strip {
      width: 100%;
      min-height: 42px;
      padding: 7px 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      direction: rtl;
      background: #153f3b;
      color: #fff4df;
      font-family: Vazirmatn, Tahoma, sans-serif;
      font-size: 12px;
    }

    .ir-province-strip a {
      color: #f4d79d;
      text-decoration: none;
    }

    .ir-province-strip a:hover {
      color: #fff;
    }

    .ir-province-strip strong {
      color: #fff4df;
      font-weight: 700;
    }

    html[dir="ltr"] .ir-shared-header {
      direction: ltr;
    }

    html[dir="ltr"] .ir-header-dropdown {
      right: auto;
      left: 0;
    }

    html[dir="ltr"] .ir-province-strip {
      direction: ltr;
    }

    @media(max-width:850px) {
      .ir-shared-header {
        min-height: 65px;
        padding: 9px 14px;
        flex-wrap: wrap;
        gap: 10px;
      }

      .ir-header-brand {
        font-size: 14px;
      }

      .ir-header-mark {
        width: 34px;
        height: 34px;
        font-size: 18px;
      }

      .ir-header-menu-button {
        display: flex;
      }

      .ir-header-nav {
        display: none;
        width: 100%;
        flex: 1 0 100%;
        flex-direction: column;
        align-items: stretch;
        gap: 2px;
        padding: 9px 0 4px;
        border-top: 1px solid rgba(168,121,56,.3);
      }

      .ir-header-nav.is-open {
        display: flex;
      }

      .ir-header-nav a {
        display: block;
        width: 100%;
        padding: 12px;
        white-space: normal;
        text-align: right;
        border-radius: 7px;
      }

      html[dir="ltr"] .ir-header-nav a {
        text-align: left;
      }

      .ir-header-nav a.ir-header-contact {
        text-align: center;
      }

      .ir-header-dropdown {
        position: static;
        display: none;
        min-width: 0;
        margin: 0 10px 7px;
        padding: 5px;
        box-shadow: none;
        background: rgba(199,154,74,.12);
      }

      .ir-header-home.dropdown-open .ir-header-dropdown {
        display: flex;
      }

      .ir-header-home:hover .ir-header-dropdown {
        display: none;
      }

      .ir-header-home.dropdown-open:hover .ir-header-dropdown {
        display: flex;
      }

      .ir-header-language {
        padding: 8px 12px;
      }

      .ir-province-strip {
        gap: 10px;
        font-size: 11px;
        flex-wrap: wrap;
      }
    }

    @media(max-width:380px) {
      .ir-header-brand {
        font-size: 12px;
      }

      .ir-province-strip {
        gap: 7px;
        font-size: 10px;
      }
    }
  `;

  document.head.appendChild(style);

  const header = document.createElement("header");
  header.className = "ir-shared-header";

  const brand = document.createElement("a");
  brand.className = "ir-header-brand";
  brand.href = "index.html";

  const mark = document.createElement("span");
  mark.className = "ir-header-mark";
  mark.textContent = "ه";

  const brandText = document.createElement("span");
  brandText.className = "ir-header-brand-text";
  brandText.dataset.fa = "ایران، هزار رنگ";
  brandText.dataset.en = "Iran, a Thousand Colors";

  brand.append(mark, brandText);

  const menuButton = document.createElement("button");
  menuButton.className = "ir-header-menu-button";
  menuButton.type = "button";
  menuButton.setAttribute("aria-label", "Open menu");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "<span></span><span></span><span></span>";

  const nav = document.createElement("nav");
  nav.className = "ir-header-nav";

  const languageSlot = document.createElement("div");
  languageSlot.className = "ir-header-language";

  links.forEach(item => {
    const wrapper = document.createElement("div");

    if (item.children) {
      wrapper.className = "ir-header-home";

      const mainLink = document.createElement("a");
      mainLink.href = item.href;
      mainLink.dataset.fa = item.fa;
      mainLink.dataset.en = item.en;
      wrapper.appendChild(mainLink);

      const dropdown = document.createElement("div");
      dropdown.className = "ir-header-dropdown";

      item.children.forEach(child => {
        const a = document.createElement("a");
        a.href = child.href;
        a.dataset.fa = child.fa;
        a.dataset.en = child.en;
        dropdown.appendChild(a);
      });

      wrapper.appendChild(dropdown);

      mainLink.addEventListener("click", event => {
        if (
          window.matchMedia("(max-width:850px)").matches &&
          !wrapper.classList.contains("dropdown-open")
        ) {
          event.preventDefault();
          wrapper.classList.add("dropdown-open");
        }
      });
    } else {
      const a = document.createElement("a");
      a.href = item.href;
      a.dataset.fa = item.fa;
      a.dataset.en = item.en;

      if (item.href.includes("#contact")) {
        a.className = "ir-header-contact";
      }

      wrapper.appendChild(a);
    }

    nav.appendChild(wrapper);
  });

  const existingLanguageButton = document.querySelector(
    "#languageToggle, #langToggle, #langBtn, #langSwitch, .language"
  );

  if (existingLanguageButton) {
    languageSlot.appendChild(existingLanguageButton);
  }

  nav.appendChild(languageSlot);

  header.append(brand, menuButton, nav);

  // Place header before all page content.
  const firstBodyElement = document.body.firstElementChild;

  if (firstBodyElement) {
    document.body.insertBefore(header, firstBodyElement);
  } else {
    document.body.appendChild(header);
  }

  menuButton.addEventListener("click", () => {
    const opened = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(opened));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (
        window.matchMedia("(max-width:850px)").matches &&
        !link.closest(".ir-header-home")
      ) {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  const provinces = [
    ["قزوین", "Qazvin", "qazvin.html"],
    ["گیلان", "Gilan", "gilan.html"],
    ["مازندران", "Mazandaran", "mazandaran.html"],
    ["گلستان", "Golestan", "golestan.html"],
    ["سمنان", "Semnan", "semnan.html"],
    ["خراسان شمالی", "North Khorasan", "north-khorasan.html"],
    ["خراسان جنوبی", "South Khorasan", "south-khorasan.html"],
    ["سیستان و بلوچستان", "Sistan and Baluchestan", "sistan-baluchestan.html"],
    ["هرمزگان", "Hormozgan", "hormozgan.html"],
    ["کرمان", "Kerman", "kerman.html"],
    ["یزد", "Yazd", "yazd.html"],
    ["اصفهان", "Isfahan", "isfahan.html"],
    ["فارس", "Fars", "fars.html"],
    ["بوشهر", "Bushehr", "bushehr.html"],
    ["کهگیلویه و بویراحمد", "Kohgiluyeh and Boyer-Ahmad", "kohgiluyeh.html"],
    ["چهارمحال و بختیاری", "Chaharmahal and Bakhtiari", "chaharmahal.html"],
    ["خوزستان", "Khuzestan", "khuzestan.html"],
    ["ایلام", "Ilam", "ilam.html"],
    ["لرستان", "Lorestan", "lorestan.html"],
    ["مرکزی", "Markazi", "arak.html"],
    ["همدان", "Hamadan", "hamedan.html"],
    ["کرمانشاه", "Kermanshah", "kermanshah.html"],
    ["کردستان", "Kurdistan", "kurdistan.html"],
    ["آذربایجان غربی", "West Azerbaijan", "urmia.html"],
    ["آذربایجان شرقی", "East Azerbaijan", "tabriz.html"],
    ["اردبیل", "Ardabil", "ardabil.html"],
    ["زنجان", "Zanjan", "zanjan.html"],
    ["تهران", "Tehran", "tehran.html"]
  ];

  const provinceIndex = provinces.findIndex(
    province => province[2] === currentPage
  );

  if (provinceIndex !== -1) {
    const previous =
      provinces[(provinceIndex - 1 + provinces.length) % provinces.length];

    const current = provinces[provinceIndex];

    const next = provinces[(provinceIndex + 1) % provinces.length];

    const strip = document.createElement("div");
    strip.className = "ir-province-strip";

    const prevLink = document.createElement("a");
    prevLink.href = previous[2];
    prevLink.dataset.fa = `← ${previous[0]}`;
    prevLink.dataset.en = `← ${previous[1]}`;

    const currentLabel = document.createElement("strong");
    currentLabel.dataset.fa =
      `${String(provinceIndex + 1).padStart(2, "0")} | ${current[0]}`;
    currentLabel.dataset.en =
      `${String(provinceIndex + 1).padStart(2, "0")} | ${current[1]}`;

    const nextLink = document.createElement("a");
    nextLink.href = next[2];
    nextLink.dataset.fa = `${next[0]} →`;
    nextLink.dataset.en = `${next[1]} →`;

    strip.append(prevLink, currentLabel, nextLink);
    header.insertAdjacentElement("afterend", strip);
  }

  const translateHeader = () => {
    const english = isEnglish();

    header.querySelectorAll("[data-fa][data-en]").forEach(element => {
      element.textContent = english
        ? element.dataset.en
        : element.dataset.fa;
    });

    menuButton.setAttribute(
      "aria-label",
      english ? "Open menu" : "باز کردن منو"
    );
  };

  translateHeader();

  const languageObserver = new MutationObserver(translateHeader);

  languageObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang", "dir"]
  });
})();


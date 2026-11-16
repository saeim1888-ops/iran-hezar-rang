
(() => {
  "use strict";

  if (document.querySelector(".ir-shared-header")) return;

  const currentPage = location.pathname.split("/").pop() || "index.html";

  const links = [
    {
      text: "صفحه اصلی",
      en: "Home",
      href: "index.html",
      children: [
        { text: "صفحه مناطق | استان‌ها", en: "Regions | Provinces", href: "regions.html" },
        { text: "گالری سه‌بعدی", en: "3D Gallery", href: "gallery-3d.html" },
        { text: "گالری حضوری", en: "Physical Exhibition", href: "hezar-rang-cinematic-entry-final.html" }
      ]
    },
    { text: "درباره نمایشگاه", en: "About the Exhibition", href: "regions.html#about" },
    { text: "عوامل پروژه", en: "Project Team", href: "regions.html#team" },
    { text: "تماس با ما", en: "Contact Us", href: "regions.html#contact" }
  ];

  const style = document.createElement("style");
  style.textContent = `
    .ir-shared-header {
      position: relative;
      z-index: 1000;
      width: 100%;
      min-height: 72px;
      padding: 10px 4%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      direction: rtl;
      background: rgba(244,234,216,.98);
      border-bottom: 1px solid rgba(168,121,56,.55);
      box-shadow: 0 4px 18px rgba(57,46,36,.10);
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
      font-size: 17px;
      font-weight: 800;
      white-space: nowrap;
    }

    .ir-header-mark {
      width: 38px;
      height: 38px;
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
      justify-content: flex-end;
      gap: clamp(12px, 2vw, 27px);
    }

    .ir-header-nav a {
      color: #153f3b;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
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
      min-width: 205px;
      display: none;
      flex-direction: column;
      padding: 8px;
      background: #fff4df;
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

    .ir-header-language {
      display: flex;
      align-items: center;
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
      transition: .2s ease;
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

      .ir-header-nav a:hover {
        background: rgba(199,154,74,.15);
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
  brand.innerHTML = `
    <span class="ir-header-mark">ه</span>
    <span>ایران، هزار رنگ</span>
  `;

  const menuButton = document.createElement("button");
  menuButton.className = "ir-header-menu-button";
  menuButton.type = "button";
  menuButton.setAttribute("aria-label", "باز کردن منو");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "<span></span><span></span><span></span>";

  const nav = document.createElement("nav");
  nav.className = "ir-header-nav";

  links.forEach((item, index) => {
    const wrapper = document.createElement("div");

    if (item.children) {
      wrapper.className = "ir-header-home";

      const mainLink = document.createElement("a");
      mainLink.href = item.href;
      mainLink.textContent = item.text;
      wrapper.appendChild(mainLink);

      const dropdown = document.createElement("div");
      dropdown.className = "ir-header-dropdown";

      item.children.forEach(child => {
        const a = document.createElement("a");
        a.href = child.href;
        a.textContent = child.text;
        dropdown.appendChild(a);
      });

      wrapper.appendChild(dropdown);

      mainLink.addEventListener("click", event => {
        if (window.matchMedia("(max-width:850px)").matches &&
            !wrapper.classList.contains("dropdown-open")) {
          event.preventDefault();
          wrapper.classList.add("dropdown-open");
        }
      });
    } else {
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.text;
      wrapper.appendChild(a);
    }

    nav.appendChild(wrapper);
  });

  const languageSlot = document.createElement("div");
  languageSlot.className = "ir-header-language";

  const existingLanguageButton =
    document.querySelector(
      "#languageToggle, #langToggle, #langBtn, #langSwitch, .language"
    );

  if (existingLanguageButton) {
    languageSlot.appendChild(existingLanguageButton);
  }

  nav.appendChild(languageSlot);

  header.appendChild(brand);
  header.appendChild(menuButton);
  header.appendChild(nav);

  const firstPageElement =
    document.querySelector("main") ||
    document.querySelector(".stage") ||
    document.body.firstElementChild;

  document.body.insertBefore(header, firstPageElement);

  menuButton.addEventListener("click", () => {
    const opened = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(opened));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width:850px)").matches) {
        if (!link.closest(".ir-header-home")) {
          nav.classList.remove("is-open");
          menuButton.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // نوار استان قبلی و بعدی فقط در صفحات استان‌ها
  const provinces = [
    ["قزوین", "qazvin.html"],
    ["گیلان", "gilan.html"],
    ["مازندران", "mazandaran.html"],
    ["گلستان", "golestan.html"],
    ["سمنان", "semnan.html"],
    ["خراسان شمالی", "north-khorasan.html"],
    ["خراسان جنوبی", "south-khorasan.html"],
    ["سیستان و بلوچستان", "sistan-baluchestan.html"],
    ["هرمزگان", "hormozgan.html"],
    ["کرمان", "kerman.html"],
    ["یزد", "yazd.html"],
    ["اصفهان", "isfahan.html"],
    ["فارس", "fars.html"],
    ["بوشهر", "bushehr.html"],
    ["کهگیلویه و بویراحمد", "kohgiluyeh.html"],
    ["چهارمحال و بختیاری", "chaharmahal.html"],
    ["خوزستان", "khuzestan.html"],
    ["ایلام", "ilam.html"],
    ["لرستان", "lorestan.html"],
    ["مرکزی", "arak.html"],
    ["همدان", "hamedan.html"],
    ["کرمانشاه", "kermanshah.html"],
    ["کردستان", "kurdistan.html"],
    ["آذربایجان غربی", "urmia.html"],
    ["آذربایجان شرقی", "tabriz.html"],
    ["اردبیل", "ardabil.html"],
    ["زنجان", "zanjan.html"],
    ["تهران", "tehran.html"]
  ];

  const provinceIndex = provinces.findIndex(
    province => province[1] === currentPage
  );

  if (provinceIndex !== -1) {
    const previous = provinces[
      (provinceIndex - 1 + provinces.length) % provinces.length
    ];

    const current = provinces[provinceIndex];

    const next = provinces[
      (provinceIndex + 1) % provinces.length
    ];

    const strip = document.createElement("div");
    strip.className = "ir-province-strip";

    strip.innerHTML = `
      <a href="${previous[1]}">← ${previous[0]}</a>
      <strong>${String(provinceIndex + 1).padStart(2, "0")} | ${current[0]}</strong>
      <a href="${next[1]}">${next[0]} →</a>
    `;

    header.insertAdjacentElement("afterend", strip);
  }
})();


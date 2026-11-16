
/* province-header.js
   هدر مشترک سایت «ایران، هزار رنگ»
*/

(() => {
  "use strict";

  // مسیر صفحات را در صورت تغییر نام فایل‌ها، فقط از این قسمت اصلاح کن.
  const pages = {
    home: "index.html",
    regions: "regions.html",
    gallery3d: "gallery-3d.html",
    inPerson: "hezar-rang-cinematic-entry-final.html",

    // این سه مسیر باید با نام واقعی فایل‌ها تطبیق داده شوند.
    about: "about.html",
    team: "team.html",
    contact: "contact.html"
  };

  // فهرست موقت استان‌ها؛ ترتیب نهایی باید با نقشه گالری تطبیق داده شود.
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
    ["کاشان", "kashan.html"],
    ["همدان", "hamedan.html"],
    ["کرمانشاه", "kermanshah.html"],
    ["کردستان", "kurdistan.html"],
    ["ارومیه", "urmia.html"],
    ["تبریز", "tabriz.html"],
    ["اردبیل", "ardabil.html"],
    ["زنجان", "zanjan.html"],
    ["تهران", "tehran.html"]
  ];

  const currentFile =
    decodeURIComponent(location.pathname.split("/").pop() || "index.html");

  // اگر هدر قبلاً ساخته شده، دوباره آن را اضافه نکن.
  if (document.querySelector(".ir-header")) return;

  const currentIndex = provinces.findIndex(
    province => province[1] === currentFile
  );

  const isProvincePage = currentIndex !== -1;

  const translations = {
    fa: {
      home: "صفحه اصلی",
      about: "درباره نمایشگاه",
      team: "عوامل پروژه",
      contact: "تماس با ما",
      regions: "صفحه مناطق",
      regionsSub: "استان‌ها",
      gallery3d: "صفحه گالری سه‌بعدی",
      inPerson: "صفحه گالری حضوری",
      previous: "استان قبلی",
      current: "استان",
      next: "استان بعدی",
      language: "English"
    },
    en: {
      home: "Home",
      about: "About the Exhibition",
      team: "Project Team",
      contact: "Contact Us",
      regions: "Regions",
      regionsSub: "Provinces",
      gallery3d: "3D Gallery",
      inPerson: "In-person Gallery",
      previous: "Previous Province",
      current: "Province",
      next: "Next Province",
      language: "فارسی"
    }
  };

  const style = document.createElement("style");
  style.textContent = `
    .ir-header, .ir-header * {
      box-sizing: border-box;
    }

    .ir-header {
      position: relative;
      z-index: 1000;
      width: 100%;
      direction: rtl;
      color: #f4ead8;
      background: #153f3b;
      font-family: inherit;
      box-shadow: 0 3px 14px rgba(0,0,0,.13);
    }

    .ir-header-main {
      min-height: 76px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 12px clamp(16px, 4vw, 55px);
    }

    .ir-header-brand {
      color: #f4ead8;
      text-decoration: none;
      font-size: 19px;
      font-weight: 800;
      white-space: nowrap;
    }

    .ir-header-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(12px, 2.2vw, 30px);
      flex-wrap: wrap;
    }

    .ir-header a,
    .ir-header button {
      font: inherit;
    }

    .ir-header-link,
    .ir-header-menu-button {
      color: #f4ead8;
      text-decoration: none;
      border: 0;
      background: transparent;
      padding: 9px 4px;
      cursor: pointer;
      font-size: 14px;
      transition: color .2s ease;
    }

    .ir-header-link:hover,
    .ir-header-menu-button:hover {
      color: #e5bd72;
    }

    .ir-header-dropdown {
      position: relative;
    }

    .ir-header-dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      right: 0;
      min-width: 220px;
      padding: 9px;
      background: #f4ead8;
      border: 1px solid rgba(168,62,29,.22);
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,.18);
    }

    .ir-header-dropdown.open .ir-header-dropdown-menu {
      display: block;
    }

    .ir-header-dropdown-menu a {
      display: block;
      padding: 10px 12px;
      color: #153f3b;
      text-decoration: none;
      border-radius: 6px;
      font-size: 14px;
    }

    .ir-header-dropdown-menu a:hover {
      background: #e9dcc4;
      color: #a83e1d;
    }

    .ir-header-dropdown-menu .ir-header-subtitle {
      display: block;
      margin-top: 3px;
      color: #77705f;
      font-size: 11px;
    }

    .ir-header-language {
      flex-shrink: 0;
      padding: 8px 13px !important;
      border: 1px solid #c9a45d !important;
      border-radius: 20px !important;
      color: #f4ead8 !important;
      background: transparent !important;
      cursor: pointer;
      font-size: 13px;
    }

    .ir-header-provinces {
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(14px, 4vw, 48px);
      padding: 9px 16px;
      background: #a83e1d;
      color: #fff5e8;
      font-size: 13px;
    }

    .ir-header-provinces a {
      color: inherit;
      text-decoration: none;
      white-space: nowrap;
    }

    .ir-header-provinces a:hover {
      color: #f1d18c;
    }

    .ir-header-current {
      text-align: center;
      font-weight: 800;
      white-space: nowrap;
    }

    .ir-header-current small {
      display: block;
      margin-bottom: 2px;
      font-size: 10px;
      font-weight: 400;
      opacity: .85;
    }

    @media (max-width: 760px) {
      .ir-header-main {
        flex-wrap: wrap;
        justify-content: center;
        gap: 9px;
        padding: 12px;
      }

      .ir-header-brand {
        width: 100%;
        text-align: center;
      }

      .ir-header-nav {
        gap: 10px 16px;
      }

      .ir-header-link,
      .ir-header-menu-button {
        font-size: 12px;
      }

      .ir-header-provinces {
        gap: 12px;
        font-size: 11px;
      }
    }

    @media (max-width: 390px) {
      .ir-header-provinces {
        gap: 8px;
        font-size: 10px;
      }
    }
  `;
  document.head.appendChild(style);

  const header = document.createElement("header");
  header.className = "ir-header";

  header.innerHTML = `
    <div class="ir-header-main">
      <a class="ir-header-brand" href="${pages.home}">
        ایران، هزار رنگ
      </a>

      <nav class="ir-header-nav" aria-label="منوی اصلی">
        <div class="ir-header-dropdown">
          <button class="ir-header-menu-button"
                  type="button"
                  aria-expanded="false">
            <span data-fa="صفحه اصلی" data-en="Home">صفحه اصلی</span>
            <span aria-hidden="true">⌄</span>
          </button>

          <div class="ir-header-dropdown-menu">
            <a href="${pages.regions}">
              <span data-fa="صفحه مناطق" data-en="Regions">صفحه مناطق</span>
              <span class="ir-header-subtitle"
                    data-fa="استان‌ها"
                    data-en="Provinces">استان‌ها</span>
            </a>
            <a href="${pages.gallery3d}"
               data-fa="صفحه گالری سه‌بعدی"
               data-en="3D Gallery">صفحه گالری سه‌بعدی</a>
            <a href="${pages.inPerson}"
               data-fa="صفحه گالری حضوری"
               data-en="In-person Gallery">صفحه گالری حضوری</a>
          </div>
        </div>

        <a class="ir-header-link"
           href="${pages.about}"
           data-fa="درباره نمایشگاه"
           data-en="About the Exhibition">درباره نمایشگاه</a>

        <a class="ir-header-link"
           href="${pages.team}"
           data-fa="عوامل پروژه"
           data-en="Project Team">عوامل پروژه</a>

        <a class="ir-header-link"
           href="${pages.contact}"
           data-fa="تماس با ما"
           data-en="Contact Us">تماس با ما</a>
      </nav>

      <div class="ir-header-language-slot"></div>
    </div>

    <div class="ir-header-provinces" hidden></div>
  `;

  document.body.prepend(header);

  // منوی کشویی صفحه اصلی
  const dropdown = header.querySelector(".ir-header-dropdown");
  const dropdownButton = dropdown.querySelector("button");

  dropdownButton.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("open");
    dropdownButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", event => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
      dropdownButton.setAttribute("aria-expanded", "false");
    }
  });

  // نوار استان‌ها فقط در صفحات استان نمایش داده می‌شود.
  if (isProvincePage) {
    const previousIndex =
      (currentIndex - 1 + provinces.length) % provinces.length;
    const nextIndex =
      (currentIndex + 1) % provinces.length;

    const previous = provinces[previousIndex];
    const current = provinces[currentIndex];
    const next = provinces[nextIndex];

    const provinceBar = header.querySelector(".ir-header-provinces");
    provinceBar.hidden = false;

    provinceBar.innerHTML = `
      <a href="${previous[1]}">
        <span data-fa="← استان قبلی: " data-en="← Previous: ">← استان قبلی: </span>
        ${previous[0]}
      </a>

      <div class="ir-header-current">
        <small data-fa="استان ${currentIndex + 1} از ${provinces.length}"
               data-en="Province ${currentIndex + 1} of ${provinces.length}">
          استان ${currentIndex + 1} از ${provinces.length}
        </small>
        ${current[0]}
      </div>

      <a href="${next[1]}">
        ${next[0]}
        <span data-fa=" :استان بعدی →" data-en=" :Next →"> :استان بعدی →</span>
      </a>
    `;
  }

  // دکمه زبان فعلی صفحه را به هدر منتقل می‌کنیم تا
  // رویداد تغییر زبان خود صفحه حفظ شود و دکمه تکراری نسازیم.
  const existingLanguageButton =
    document.getElementById("langSwitch") ||
    document.getElementById("langBtn");

  const languageSlot = header.querySelector(".ir-header-language-slot");

  if (existingLanguageButton) {
    existingLanguageButton.classList.add("ir-header-language");
    languageSlot.appendChild(existingLanguageButton);
  } else {
    // این دکمه فقط جهت صفحه و کلاس زبان را تغییر می‌دهد.
    // ترجمه محتوای صفحه نیازمند سیستم ترجمه همان صفحه است.
    const languageButton = document.createElement("button");
    languageButton.type = "button";
    languageButton.className = "ir-header-language";
    languageButton.textContent = "English";

    languageButton.addEventListener("click", () => {
      const isEnglish = document.body.classList.toggle("english");
      document.documentElement.lang = isEnglish ? "en" : "fa";
      document.documentElement.dir = isEnglish ? "ltr" : "rtl";
      languageButton.textContent = isEnglish ? "فارسی" : "English";
      updateHeaderLanguage(isEnglish);
    });

    languageSlot.appendChild(languageButton);
  }

  function updateHeaderLanguage(isEnglish) {
    header.querySelectorAll("[data-fa][data-en]").forEach(element => {
      element.textContent = isEnglish
        ? element.dataset.en
        : element.dataset.fa;
    });

    header.dir = isEnglish ? "ltr" : "rtl";
    header.querySelector(".ir-header-dropdown-menu").style.right =
      isEnglish ? "auto" : "0";
    header.querySelector(".ir-header-dropdown-menu").style.left =
      isEnglish ? "0" : "auto";
  }

  // هماهنگی اولیه با زبان فعلی صفحه
  const initiallyEnglish =
    document.documentElement.lang === "en" ||
    document.body.classList.contains("english");

  updateHeaderLanguage(initiallyEnglish);

  // هماهنگی متن هدر پس از استفاده از دکمه زبان موجود صفحه
  if (existingLanguageButton) {
    existingLanguageButton.addEventListener("click", () => {
      requestAnimationFrame(() => {
        const isEnglish =
          document.documentElement.lang === "en" ||
          document.body.classList.contains("english");

        updateHeaderLanguage(isEnglish);
      });
    });
  }
})();


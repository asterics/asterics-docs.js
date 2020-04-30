import "./index.styl";

export default ({ Vue, router }) => {
  router.options.scrollBehavior = (to, from, savedPosition) => {
    // if (savedPosition) {
    //   if (to.hash) {
    //     const targetElement = document.querySelector(to.hash);
    //     if (targetElement) {
    //       const wElements = document.getElementsByClassName("ps");
    //       const wElement = Array.from(wElements).find((elem) => elem.contains(targetElement));
    //       if (wElement) {
    //         return wElement.scrollTo({
    //           top: savedPosition.y,
    //           behavior: "smooth",
    //         });
    //       }
    //     }
    //   }
    //   return false;
    if (savedPosition) {
      return window.scrollTo({
        top: savedPosition.y,
        behavior: "smooth",
      });
    } else if (to.hash && to.hash !== "#") {
      if (Vue.$vuepress.$get("disableScrollBehavior")) {
        return false;
      }
      const targetElement = document.querySelector(to.hash);
      if (targetElement) {
        const wElements = document.getElementsByClassName("ps");
        const wElement = Array.from(wElements).find((elem) => elem.contains(targetElement));
        if (wElement) {
          const top = wElement.scrollTop + targetElement.getBoundingClientRect().y;
          return wElement.scrollTo({ top, behavior: "smooth" });
        }
      }
      return false;
    } else {
      const wElement = document.querySelector("main.page.ps");
      if (wElement) {
        return wElement.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      return false;
    }
  };
};

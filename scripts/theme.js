function setTheme(theme, save=false) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
    document.documentElement.classList.remove("light")
    if (save) localStorage.setItem("theme", theme)
  } else if (theme === "light") {
    document.documentElement.classList.add("light")
    document.documentElement.classList.remove("dark")
    if (save) localStorage.setItem("theme", theme)
  } else if (theme === "auto") {
    document.documentElement.classList.add("auto")
    document.documentElement.classList.remove("light")
    document.documentElement.classList.remove("dark")
    localStorage.removeItem("theme")
    setTheme(q.matches ? "dark" : "light", false)
  } else return
  try {
    document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "dark" ? "#18191A" : "#F8F9FA")
  }
  catch {}
}

const q = window.matchMedia("(prefers-color-scheme: dark)")
const initialTheme = localStorage.getItem("theme") || "auto"
setTheme(initialTheme, true)

window.onload = function(){
  q.addEventListener("change", function(){
    if (!("theme" in localStorage)) setTheme(q.matches ? "dark" : "light", false)
  });
};

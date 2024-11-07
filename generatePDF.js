function generatePDF() {
  const loading = document.getElementById("loading");
  const button = document.querySelector(".pdf-button");
  loading.style.display = "inline-block";
  button.disabled = true;
  const currentScroll = window.scrollY;
  window.scrollTo(0, 0);

  // Add CSS to prevent text splitting across pages
  const style = document.createElement("style");
  style.textContent = `
      /* Prevent paragraph splits */
      p, div, li {
        page-break-inside: avoid !important;
      }
      /* Prevent row splits in tables */
      tr {
        page-break-inside: avoid !important;
      }
      /* Prevent breaks after headings */
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid !important;
      }
    `;
  document.head.appendChild(style);

  setTimeout(() => {
    const element = document.body;
    const opt = {
      margin: [2, 10, 10, 10],
      filename: "OleksandrPrudnikov-CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: -window.scrollY,
        windowHeight: document.documentElement.offsetHeight,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
        avoid: ["p", "div", "li", "tr", "h1", "h2", "h3", "h4", "h5", "h6"],
      },
    };

    button.classList.add("no-print");

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        loading.style.display = "none";
        button.disabled = false;
        button.classList.remove("no-print");
        window.scrollTo(0, currentScroll);
        // Remove the temporary style
        document.head.removeChild(style);
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
        loading.style.display = "none";
        button.disabled = false;
        button.classList.remove("no-print");
        alert("Error generating PDF. Please try again.");
        window.scrollTo(0, currentScroll);
        // Remove the temporary style
        document.head.removeChild(style);
      });
  }, 100);
}

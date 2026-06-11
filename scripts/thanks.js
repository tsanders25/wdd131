if (window.location.pathname.includes("thanks.html")) {
    let reviewCount = localStorage.getItem("reviewCount") || 0;
    reviewCount = Number(reviewCount) + 1;
    localStorage.setItem("reviewCount", reviewCount);
}


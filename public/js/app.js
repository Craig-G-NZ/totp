(function () {
  const form = document.getElementById("totpForm");
  const secretInput = document.getElementById("secret");
  const generateBtn = document.getElementById("generateBtn");
  const errorEl = document.getElementById("error");
  const placeholder = document.getElementById("placeholder");
  const loading = document.getElementById("loading");
  const qrResult = document.getElementById("qrResult");
  const qrcodeEl = document.getElementById("qrcode");
  const secretDisplay = document.getElementById("secretDisplay");
  const uriDisplay = document.getElementById("uriDisplay");

  let qrLibraryLoaded = false;

  window.addEventListener("load", function () {
    if (typeof qrcode !== "undefined") {
      qrLibraryLoaded = true;
    } else {
      showError("QR code library failed to load. Please refresh the page.");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const secret = secretInput.value.trim().replace(/\s/g, "");
    const account =
      document.getElementById("account").value.trim() || "user@example.com";
    const issuer =
      document.getElementById("issuer").value.trim() || "MyApp";

    if (!secret) {
      showError("Please enter a TOTP secret.");
      return;
    }

    if (!/^[A-Z2-7]+=*$/i.test(secret)) {
      showError(
        "Invalid secret format. Use a Base32 string (letters A–Z and digits 2–7)."
      );
      return;
    }

    if (!qrLibraryLoaded) {
      showError("QR code library not loaded. Refresh the page and try again.");
      return;
    }

    setLoading(true);
    hideError();
    hideResult();
    hidePlaceholder();

    try {
      const uri =
        "otpauth://totp/" +
        encodeURIComponent(issuer) +
        ":" +
        encodeURIComponent(account) +
        "?secret=" +
        secret.toUpperCase() +
        "&issuer=" +
        encodeURIComponent(issuer);

      const qr = qrcode(0, "M");
      qr.addData(uri);
      qr.make();

      qrcodeEl.innerHTML = qr.createSvgTag({
        cellSize: 4,
        margin: 4,
        scalable: true,
      });

      const svg = qrcodeEl.querySelector("svg");
      if (svg) {
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", "TOTP QR code");
      }

      const secretUpper = secret.toUpperCase();
      secretDisplay.textContent = secretUpper;
      secretDisplay.dataset.copy = secretUpper;
      uriDisplay.textContent = uri;
      uriDisplay.dataset.copy = uri;

      showResult();
    } catch (err) {
      showError("Failed to generate QR code: " + err.message);
      showPlaceholder();
    } finally {
      setLoading(false);
    }
  });

  secretInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\s/g, "").toUpperCase();
    value = value.replace(/(.{4})/g, "$1 ").trim();
    e.target.value = value;
  });

  document.addEventListener("click", function (e) {
    const valueEl = e.target.closest(".detail-card__value");
    if (!valueEl || !valueEl.dataset.copy) return;

    const original = valueEl.dataset.copy;
    navigator.clipboard.writeText(original).then(function () {
      valueEl.textContent = "Copied!";
      valueEl.classList.add("is-copied");
      setTimeout(function () {
        valueEl.textContent = original;
        valueEl.classList.remove("is-copied");
      }, 1200);
    });
  });

  function setLoading(show) {
    loading.hidden = !show;
    generateBtn.disabled = show;
    generateBtn.textContent = show ? "Generating…" : "Generate QR code";
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    setTimeout(function () {
      errorEl.hidden = true;
    }, 6000);
  }

  function hideError() {
    errorEl.hidden = true;
  }

  function showResult() {
    qrResult.hidden = false;
    qrResult.classList.add("show");
  }

  function hideResult() {
    qrResult.hidden = true;
    qrResult.classList.remove("show");
  }

  function showPlaceholder() {
    placeholder.hidden = false;
  }

  function hidePlaceholder() {
    placeholder.hidden = true;
  }
})();

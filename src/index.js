"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var loader = document.getElementById('loader');
  if (!loader) return;

  function hideLoader() {
    if (!loader || loader.classList.contains('is-hidden')) return;
    loader.classList.add('is-hidden');
    loader.setAttribute('aria-busy', 'false');
    setTimeout(function () { loader.style.display = 'none'; }, 300);
  }

  function onWindowLoad() {
    var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    fontsReady.then(hideLoader);
  }

  if (document.readyState === 'complete') {
    onWindowLoad();
  } else {
    window.addEventListener('load', onWindowLoad, { once: true });
  }

  // Safety timeout so the loader never blocks indefinitely
  setTimeout(hideLoader, 15000);
});

const disallowedDomains = [
  "ankit.qzz.io",
  "127.0.0.1",
  "localhost"
]

class CustomConsole {
  type(method, message) {
    if (disallowedDomains.includes(window.location.hostname)) {
      return;
    }

    if (typeof console[method] === "function") {
      console[method](message);
    }
    else {
      throw new Error(`Console method ${method} is not supported.`);
    }
  }

  log(message) {
    this.type("log", message);
  }

  warn(message) {
    this.type("warn", message);
  }

  error(message) {
    this.type("error", message);
  }

  info(message) {
    this.type("info", message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const _console = new CustomConsole();
  _console.log("✅ Script loaded and DOMContentLoaded fired");

  const _openShare = document.getElementById("openShare");
  const _closeShare = document.getElementById("closeShare");
  const _shareModal = document.getElementById("share_modal");
  const _shareModalParent = document.getElementById("share_social");
  const _copyBtn = document.getElementById("share-copy");
  const _displayURLInput = document.getElementById("displayURL");
  const _twitterShare = document.getElementById("twitterShare");
  const _facebookShare = document.getElementById("facebookShare");
  const _emailShare = document.getElementById("emailShare");
  const _shareBackdrop = document.getElementById("shareBackdrop");
  const _location = window.location.href;

  _console.log("🔍 Element references:", {
    _openShare: !!_openShare,
    _closeShare: !!_closeShare,
    _shareModal: !!_shareModal,
    _shareModalParent: !!_shareModalParent,
    _copyBtn: !!_copyBtn,
    _displayURLInput: !!_displayURLInput,
    _twitterShare: !!_twitterShare,
    _shareBackdrop: !!_shareBackdrop
  });

  function closeShareAction() {
    _console.log("🔴 closeShareAction invoked");
    if (!_shareModal || !_shareModalParent) {
      _console.warn("⚠️ #share_modal not found");
      _console.warn("⚠️ #share_social not found");
      return;
    }

    if (_shareModal.classList.contains("active-modal")) {
      _shareModal.classList.remove("active-modal");
      _shareModalParent.classList.add("hidden");
      _console.log("✅ active-modal removed from #share_modal");
      _console.log("✅ #share_social hidden by adding hidden class");
    } else {
      _console.log("ℹ️ closeShareAction ignored because modal is not active");
    }
  }

  if (_openShare) {
    _openShare.addEventListener("click", function () {
      _console.log("🟢 #openShare clicked - opening share modal");
      if (_shareModal) {
        _shareModal.classList.add("active-modal");
        _shareModalParent.classList.remove("hidden");
        _console.log("✅ active-modal added to #share_modal");
        _console.log("✅ #share_social made visible by removing hidden class");
      } else {
        _console.warn("⚠️ #share_modal not found");
        _console.warn("⚠️ #share_social not found");
      }
    }, { passive: true });
  } else {
    _console.warn("⚠️ #openShare not found");
  }

  if (_closeShare) {
    _closeShare.addEventListener("click", function () {
      if (_shareModal && _shareModal.classList.contains("active-modal")) {
        _console.log("🔴 #closeShare clicked - closing share modal");
        closeShareAction();
      }
    }, { passive: true });
  } else {
    _console.warn("⚠️ #closeShare not found");
  }

  if (_shareBackdrop) {
    _shareBackdrop.addEventListener("click", function () {
      if (_shareModal && _shareModal.classList.contains("active-modal")) {
        _console.log("🔴 Backdrop clicked - closing share modal");
        closeShareAction();
      }
    }, { passive: true });
  } else {
    _console.warn("⚠️ #shareBackdrop not found");
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      if (_shareModal && _shareModal.classList.contains("active-modal")) {
        _console.log("🔴 Escape pressed - closing share modal");
        closeShareAction();
      }
    }
  });

  if (_copyBtn) {
    _copyBtn.addEventListener("click", function () {
      _console.log("📋 #copyBtn clicked");
      const _url = _location;
      _console.log("🔗 Copying URL:", _url);
      navigator.clipboard.writeText(_url).then(() => {
        const _originalText = _copyBtn.textContent; // read once
        const _originalBg = getComputedStyle(_copyBtn).backgroundColor; // safer read
        _console.log("✅ URL copied to clipboard");

        // update the button text and background color
        requestAnimationFrame(() => {
          _copyBtn.textContent = "Copied!";
          _copyBtn.style.backgroundColor = "#4caf50";
        });

        setTimeout(() => {
          requestAnimationFrame(() => {
            _copyBtn.textContent = _originalText;
            _copyBtn.style.backgroundColor = _originalBg;
          });
        }, 2000);

        _console.log("🔄 Button reset after 2s");

      }).catch((_err) => {
        _console.error("❌ Clipboard error:", _err);
      });
    }, { passive: true });
  } else {
    _console.warn("⚠️ #copyBtn not found");
  }

  if (_displayURLInput) {
    _displayURLInput.value = _location;
    _console.log("✅ #displayURLInput set to current URL:", _location);
  }
  else {
    _console.warn("⚠️ #displayURLInput not found");
  }

  if (_twitterShare) {
    const _tweetText = encodeURIComponent("Check out Ankit Pandey (@iankitpandey)'s portfolio! \n\n");
    const _tweetURL = encodeURIComponent(_location);
    const _twitterIntentURL = "https://x.com/intent/tweet?text=" + _tweetText + "&url=" + _tweetURL;
    _twitterShare.href = _twitterIntentURL;
    _console.log("✅ #twitterShare href set to:", _twitterIntentURL);
  } else {
    _console.warn("⚠️ #twitterShare not found");
  }

  if (_facebookShare) {
    const _facebookText = encodeURIComponent("Check out Ankit Pandey (@iankitpandey)'s portfolio!");
    const _facebookURL = encodeURIComponent(_location);
    const _facebookShareURL = "https://www.facebook.com/sharer/sharer.php?u=" + _facebookURL + "&quote=" + _facebookText;
    _facebookShare.setAttribute("href", _facebookShareURL);
    _console.log("✅ #facebookShare href set to:", _facebookShareURL);
  } else {
    _console.warn("⚠️ #facebookShare not found");
  }

  if (_emailShare) {
    const _emailSubject = encodeURIComponent("Check out this Portfolio!");
    const _emailBody = encodeURIComponent("Check out Ankit Pandey (@iankitpandey)'s portfolio! - " + _location);
    const _emailHref = "mailto:?subject=" + _emailSubject + "&body=" + _emailBody;
    _emailShare.href = _emailHref;
    _console.log("✅ #emailShare href set to:", _emailHref);
  } else {
    _console.warn("⚠️ #emailShare not found");
  }
});
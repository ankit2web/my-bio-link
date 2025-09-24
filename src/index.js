"use strict";

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
  const _location = window.location.href;

  _console.log("🔍 Element references:", {
    _openShare: !!_openShare,
    _closeShare: !!_closeShare,
    _shareModal: !!_shareModal,
    _shareModalParent: !!_shareModalParent,
    _copyBtn: !!_copyBtn,
    _displayURLInput: !!_displayURLInput,
    _twitterShare: !!_twitterShare
  });

  if (_openShare) {
    _openShare.addEventListener("click", function () {
      _console.log("🟢 #openShare clicked");
      if (_shareModal) {
        _shareModal.classList.add("active-modal");
        _shareModalParent.classList.remove("hidden");
        _console.log("✅ active-modal added to #share_modal");
        _console.log("✅ #share_social made visible by removing hidden class");
      } else {
        _console.warn("⚠️ #share_modal not found");
        _console.warn("⚠️ #share_social not found");
      }
    });
  } else {
    _console.warn("⚠️ #openShare not found");
  }

  if (_closeShare) {
    _closeShare.addEventListener("click", function () {
      _console.log("🔴 #closeShare clicked");
      if (_shareModal) {
        _shareModal.classList.remove("active-modal");
        _shareModalParent.classList.add("hidden");
        _console.log("✅ active-modal removed from #share_modal");
        _console.log("✅ #share_social hidden by adding hidden class");
      } else {
        _console.warn("⚠️ #share_modal not found");
        _console.warn("⚠️ #share_social not found");
      }
    });
  } else {
    _console.warn("⚠️ #closeShare not found");
  }

  if (_copyBtn) {
    _copyBtn.addEventListener("click", function () {
      _console.log("📋 #copyBtn clicked");
      const _url = _location;
      _console.log("🔗 Copying URL:", _url);
      navigator.clipboard.writeText(_url).then(function () {
        const _originalText = _copyBtn.textContent;
        const _originalBg = _copyBtn.style.backgroundColor;
        _console.log("✅ URL copied to clipboard");
        _copyBtn.textContent = "Copied!";
        _copyBtn.style.backgroundColor = "#4caf50";
        setTimeout(function () {
          _copyBtn.textContent = _originalText;
          _copyBtn.style.backgroundColor = _originalBg;
          _console.log("🔄 Button reset after 2s");
        }, 2000);
      }).catch(function (_err) {
        _console.error("❌ Clipboard error:", _err);
      });
    });
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
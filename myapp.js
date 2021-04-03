const templateIframeId = 'templateIframe';
const modalTitle = 'Personal Snippets';

let userOptions = {
  preferredDisplay: 'mole',
  runningLocally: false,
};

function fetchPreferences() {
  chrome.storage.sync.get({
    preferredDisplay: 'mole',
    runningLocally: false
  }, function(items) {
    userOptions.preferredDisplay = items.preferredDisplay;
    userOptions.runningLocally = items.runningLocally;
  });
}

const buildAppUrlFrom = (preferences = {}) => {
  if (preferences.runningLocally) return "http://localhost:3000"

  return "https://hardcore-tesla-72d935.netlify.app";
};

const buildWidget = (sdk, options) => {
  return {
    mole: function() { return sdk.Widgets.showMoleView(options) },
    drawer: function() { return sdk.Widgets.showDrawerView(options) },
    modal: function() { return sdk.Widgets.showModalView(options) },
  }
};

InboxSDK.load(2, 'sdk_helpmetype_65569f585b').then(sdk => {
  fetchPreferences();

  sdk.Compose.registerComposeViewHandler((composeView) => {
    window.addEventListener('message', (e) => {
      if (e.origin !== buildAppUrlFrom(userOptions)) return

      composeView.insertTextIntoBodyAtCursor(e.data);
    });

    composeView.addButton({
      title: "Load from template",
      iconUrl: 'https://static.thenounproject.com/png/365779-200.png',
      onClick: event => {
        const el = document.createElement("iframe");
        el.setAttribute("src", buildAppUrlFrom(userOptions));
        el.id = templateIframeId;
        el.style.width = "250px";
        el.style.height = "480px";
        el.style.border = "none";

        let widgetOptions = {
          el: el,
          showCloseButton: true,
          title: modalTitle,
        }

        buildWidget(sdk, widgetOptions)[userOptions.preferredDisplay]();
      },
    });
  });
});


InboxSDK.loadScript("https://unpkg.com/react@17/umd/react.development.js"),
InboxSDK.loadScript("https://unpkg.com/react-dom@17/umd/react-dom.development.js"),
InboxSDK.loadScript("https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js")

const templateIframeId = 'templateIframe';

InboxSDK.load(2, 'sdk_helpmetype_65569f585b').then(sdk => {
  sdk.Compose.registerComposeViewHandler((composeView) => {
      window.addEventListener('message', (e) => {
        if (e.origin !== 'http://localhost:3000') return

        console.log(`Received message: ${e.data}`);
        composeView.insertTextIntoBodyAtCursor(e.data);
        document.getElementsByClassName('inboxsdk__modal_content_no_buttons')[0].remove();
        document.getElementsByClassName('inboxsdk__modal_overlay')[0].remove();
      });
    composeView.addButton({
      title: "Load from template",
      iconUrl: 'https://static.thenounproject.com/png/365779-200.png',
      onClick: event => {
        const el = document.createElement("iframe");
        el.setAttribute("src", "http://localhost:3000");
        el.id = templateIframeId;
        el.style.width = "250px";
        el.style.height = "480px";
        el.style.border = "none";

        sdk.Widgets.showModalView({
          el: el,
          showCloseButton: true,
          title: 'Personal Snippets',
        })
      },
    });
  });
});
